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
  acquisitionTax: number;    // 취득세 (단일값 — 법정 세율)
  registrationFee: number;   // 등록세
  firstYearInsurance: CostRange;
  annualFuel: CostRange;
  annualConsumables: CostRange;
  monthlyParking: CostRange;
  firstYearTotal: CostRange;
  monthlyTotal: CostRange;
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

function getFuelUnitPrice(fuelType: FuelType): number {
  const m = fuelDefaults as unknown as Record<string, number>;
  const map: Record<FuelType, string> = {
    gasoline: "gasoline",
    diesel: "diesel",
    hybrid: "gasoline",
    ev: "ev_home_slow",
    lpg: "lpg",
  };
  return m[map[fuelType]];
}

export function calcFirstCarBudget(input: FirstCarBudgetInput): FirstCarBudgetResult {
  const { carPrice, fuelType, monthlyMileageKm, hasParking } = input;

  // 취득세
  const taxRate =
    fuelType === "ev"
      ? 0
      : (taxRules.acquisition_tax as { non_commercial: number }).non_commercial;
  const acquisitionTax = Math.round(carPrice * taxRate);

  // 등록세
  const registrationFee = Math.round(
    carPrice * (taxRules.registration_fee_rate as number)
  );

  // 첫해 보험 추정 (신규 면허 기준 범위)
  const firstYearInsurance: CostRange = {
    min: 700000,
    max: 1400000,
    unit: "원/년",
  };

  // 연간 연료비
  const annualMileage = monthlyMileageKm * 12;
  const unitPrice = getFuelUnitPrice(fuelType);
  const efficiency = DEFAULT_EFFICIENCY[fuelType];
  const fuelMin = Math.round((annualMileage / (efficiency * 1.1)) * unitPrice);
  const fuelMax = Math.round((annualMileage / (efficiency * 0.9)) * unitPrice);
  const annualFuel: CostRange = { min: fuelMin, max: fuelMax, unit: "원/년" };

  // 연간 소모품 (km당 15~35원)
  const annualConsumables: CostRange = {
    min: Math.round(annualMileage * 15),
    max: Math.round(annualMileage * 35),
    unit: "원/년",
  };

  // 월 주차비 (자가주차 없을 경우)
  const monthlyParking: CostRange = hasParking
    ? { min: 0, max: 0, unit: "원/월" }
    : { min: 80000, max: 200000, unit: "원/월" };

  const annualParking = monthlyParking.min * 12;
  const annualParkingMax = monthlyParking.max * 12;

  // 첫해 총비용
  const fixedCosts = acquisitionTax + registrationFee;
  const totalMin =
    fixedCosts + firstYearInsurance.min + annualFuel.min + annualConsumables.min + annualParking;
  const totalMax =
    fixedCosts + firstYearInsurance.max + annualFuel.max + annualConsumables.max + annualParkingMax;

  const firstYearTotal: CostRange = { min: totalMin, max: totalMax, unit: "원/년" };
  const monthlyTotal: CostRange = {
    min: Math.round(totalMin / 12),
    max: Math.round(totalMax / 12),
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
      fuelType === "ev" ? "EV 취득세 면제 기준 적용 (정책 변경 시 달라질 수 있음)" : `취득세 ${(taxRate * 100).toFixed(0)}% 적용 (비영업용 기준)`,
      "보험료: 신규 면허 기준 범위 (가입 이력·특약에 따라 크게 달라짐)",
      "소모품: km당 15~35원 추정 (엔진오일, 필터류, 와이퍼 등)",
      hasParking ? "자가 주차 기준 (주차비 미포함)" : "월 주차비 8~20만원 범위 포함",
    ],
    updatedAt: "2026-03-22",
  };
}
