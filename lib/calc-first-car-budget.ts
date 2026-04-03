import type { FuelType, CostRange } from "@/types";
import fuelDefaults from "@/data/fuel-price-defaults.json";
import taxRules from "@/data/tax-rules.json";

export interface FirstCarBudgetInput {
  carPrice: number;          // 차량 구매가 (원)
  fuelType: FuelType;
  monthlyMileageKm: number;
  hasParking: boolean;       // 자가 주차 여부 (false면 월 주차비 추가)
}

export interface FirstCarBudgetResult {
  acquisitionTax: number;    // 취득세
  registrationFee: number;   // 공채 실질 비용 (추정)
  firstYearInsurance: CostRange;
  annualFuel: CostRange;
  annualConsumables: CostRange;
  monthlyParking: CostRange;
  firstYearTotal: CostRange;
  monthlyTotal: CostRange;   // 취득세·공채 제외한 월 실 운행비
  assumptions: string[];
  updatedAt: string;
}

const DEFAULT_EFFICIENCY: Record<FuelType, number> = {
  gasoline: 12.5,
  diesel: 15.0,
  hybrid: 18.0,
  ev: 4.5,
  lpg: 10.0,
};

// EV는 집충전 70% + 외부완속 30% 혼합 단가
function getFuelUnitPrice(fuelType: FuelType): number {
  if (fuelType === "ev") {
    return Math.round(fuelDefaults.ev_home_slow * 0.7 + fuelDefaults.ev_public_slow * 0.3);
  }
  const priceByFuel: Record<Exclude<FuelType, "ev">, number> = {
    gasoline: fuelDefaults.gasoline,
    diesel: fuelDefaults.diesel,
    hybrid: fuelDefaults.gasoline,
    lpg: fuelDefaults.lpg,
  };
  return priceByFuel[fuelType as Exclude<FuelType, "ev">];
}

export function calcFirstCarBudget(input: FirstCarBudgetInput): FirstCarBudgetResult {
  const carPrice = Math.max(0, input.carPrice);
  const fuelType = input.fuelType;
  const monthlyMileageKm = Math.max(0, input.monthlyMileageKm);
  const hasParking = input.hasParking;

  // EV 취득세 — 최대 감면 한도를 JSON에서 읽음
  const acqTax = taxRules.acquisition_tax;
  const baseRate = acqTax.non_commercial;
  const evReductionCap = acqTax.ev_reduction_cap;
  const acquisitionTax =
    fuelType === "ev"
      ? Math.max(0, Math.round(carPrice * baseRate) - evReductionCap)
      : Math.round(carPrice * baseRate);

  // 공채 실질 비용 — 취득세와 통합된 등록세가 아니라 등록 채권(도시철도채권·지역개발채권) 할인 손실
  // 배기량·지역에 따라 0.5~2% 범위. 여기서는 rough average로 0.8% 적용 (registration_fee_rate)
  const registrationFee = Math.round(
    carPrice * taxRules.registration_fee_rate
  );

  // 첫해 보험 추정
  const firstYearInsurance: CostRange = {
    min: 700000,
    max: 1400000,
    unit: "원/년",
  };

  // 연간 연료비
  const annualMileage = monthlyMileageKm * 12;
  const unitPrice = getFuelUnitPrice(fuelType);
  const efficiency = DEFAULT_EFFICIENCY[fuelType];
  const fuelMin = efficiency > 0 ? Math.round((annualMileage / (efficiency * 1.1)) * unitPrice) : 0;
  const fuelMax = efficiency > 0 ? Math.round((annualMileage / (efficiency * 0.9)) * unitPrice) : 0;
  const annualFuel: CostRange = { min: fuelMin, max: fuelMax, unit: "원/년" };

  // 연간 소모품 (km당 15~35원)
  const annualConsumables: CostRange = {
    min: Math.round(annualMileage * 15),
    max: Math.round(annualMileage * 35),
    unit: "원/년",
  };

  // 월 주차비
  const monthlyParking: CostRange = hasParking
    ? { min: 0, max: 0, unit: "원/월" }
    : { min: 80000, max: 200000, unit: "원/월" };

  const annualParking    = monthlyParking.min * 12;
  const annualParkingMax = monthlyParking.max * 12;

  // 첫해 총비용 (취득세·공채 포함)
  const fixedCosts = acquisitionTax + registrationFee;
  const firstYearTotal: CostRange = {
    min: fixedCosts + firstYearInsurance.min + annualFuel.min + annualConsumables.min + annualParking,
    max: fixedCosts + firstYearInsurance.max + annualFuel.max + annualConsumables.max + annualParkingMax,
    unit: "원/년",
  };

  // Fix #2: 월 환산 — 일회성 취득세·공채 제외, 반복 운행비만 12등분
  const runningMin = firstYearInsurance.min + annualFuel.min + annualConsumables.min + annualParking;
  const runningMax = firstYearInsurance.max + annualFuel.max + annualConsumables.max + annualParkingMax;
  const monthlyTotal: CostRange = {
    min: Math.round(runningMin / 12),
    max: Math.round(runningMax / 12),
    unit: "원/월",
  };

  const fuelLabel: Record<FuelType, string> = {
    gasoline: "휘발유",
    diesel: "경유",
    hybrid: "하이브리드",
    ev: "전기차(EV)",
    lpg: "LPG",
  };

  return {
    acquisitionTax,
    registrationFee,
    firstYearInsurance,
    annualFuel,
    annualConsumables,
    monthlyParking,
    firstYearTotal,
    monthlyTotal,
    assumptions: [
      `차량 구매가 ${carPrice.toLocaleString()}원 기준`,
      `연료: ${fuelLabel[fuelType]}, 연비 ${efficiency}km/${fuelType === "ev" ? "kWh" : "L"} (±10% 반영)`,
      fuelType === "ev"
        ? "EV 취득세: 7% 기준 최대 140만원 감면 적용 (2026년 기준, 정책 변경 시 달라질 수 있음)"
        : `취득세 ${(baseRate * 100).toFixed(0)}% 적용 (비영업용 기준)`,
      fuelType === "ev" ? "EV 충전: 집충전 70% + 외부완속 30% 혼합 기준" : "",
      "보험료: 가입 이력·특약에 따라 크게 달라짐 (70~140만원 범위 추정)",
      "소모품: km당 15~35원 추정 (엔진오일, 필터류, 와이퍼 등)",
      "월 환산비 = 보험+연료+소모품+주차 (취득세·공채 제외한 반복 비용)",
      hasParking ? "자가 주차 기준 (주차비 미포함)" : "월 주차비 8~20만원 범위 포함",
    ].filter(Boolean),
    updatedAt: "2026-04-03",
  };
}
