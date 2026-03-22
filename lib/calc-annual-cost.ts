import type { AnnualCostInput, AnnualCostBreakdown, CostRange } from "@/types";

// ─── 연료비 기준값 (2026년 3월 기준) ──────────────────────────────────────────
const FUEL_PRICE = {
  gasoline: 1680, // 원/L
  diesel: 1520,
  hybrid: 1680,   // 휘발유 가격 기준 (연비는 다름)
  ev: 120,        // 원/kWh (집충전 기준)
  lpg: 1020,
} as const;

// 연비 기본값 (km/L 또는 km/kWh)
const DEFAULT_EFFICIENCY = {
  gasoline: 12.5,
  diesel: 15.0,
  hybrid: 18.0,
  ev: 4.5,
  lpg: 10.0,
} as const;

// ─── 보험료 추정 기준 ─────────────────────────────────────────────────────────
// 차령·지역·가입 이력에 따라 크게 달라짐 → 범위로만 제시
const INSURANCE_BY_YEAR: Record<string, CostRange> = {
  "0-3":  { min: 600000,  max: 1200000, unit: "원/년" },
  "4-7":  { min: 450000,  max: 900000,  unit: "원/년" },
  "8-12": { min: 350000,  max: 700000,  unit: "원/년" },
  "13+":  { min: 280000,  max: 550000,  unit: "원/년" },
};

function getInsuranceRange(vehicleYear: number): CostRange {
  const age = new Date().getFullYear() - vehicleYear;
  if (age <= 3)  return INSURANCE_BY_YEAR["0-3"];
  if (age <= 7)  return INSURANCE_BY_YEAR["4-7"];
  if (age <= 12) return INSURANCE_BY_YEAR["8-12"];
  return INSURANCE_BY_YEAR["13+"];
}

// ─── 자동차세 (배기량 기준 1,600cc 기준값으로 단순화) ─────────────────────────
// 실제: 배기량 × cc당 세율 × (3년 이상 5% 감면 최대 50%)
function getTaxRange(vehicleYear: number): CostRange {
  const age = new Date().getFullYear() - vehicleYear;
  const reduction = Math.min(age * 0.05, 0.50); // 최대 50% 감면
  const baseTax = 290000; // 1,600cc 기준 연간 (cc × 세율 합산)
  const amount = Math.round(baseTax * (1 - reduction));
  return {
    min: Math.round(amount * 0.7),
    max: Math.round(amount * 1.5),
    unit: "원/년",
  };
}

// ─── 소모품 연간 비용 추정 ────────────────────────────────────────────────────
// 연간 주행거리 기반으로 소모품 교체 비용 배분
function getConsumablesRange(annualMileageKm: number): CostRange {
  // 기본 소모품: 엔진오일 + 에어필터 + 에어컨필터 등
  // km당 환산으로 연간 비용 추정
  const perKm = { min: 15, max: 35 }; // 원/km (소모품 종합)
  return {
    min: Math.round(perKm.min * annualMileageKm),
    max: Math.round(perKm.max * annualMileageKm),
    unit: "원/년",
  };
}

// ─── 연료비 계산 ──────────────────────────────────────────────────────────────
function getFuelCostRange(
  annualMileageKm: number,
  fuelType: AnnualCostInput["fuelType"],
  fuelPricePerUnit?: number,
  fuelEfficiency?: number
): CostRange {
  const price = fuelPricePerUnit ?? FUEL_PRICE[fuelType];
  const efficiency = fuelEfficiency ?? DEFAULT_EFFICIENCY[fuelType];

  // 연비 편차 ±15% 반영
  const minEfficiency = efficiency * 1.10; // 연비 좋을 때
  const maxEfficiency = efficiency * 0.90; // 연비 나쁠 때

  const minCost = Math.round((annualMileageKm / minEfficiency) * price);
  const maxCost = Math.round((annualMileageKm / maxEfficiency) * price);

  return { min: minCost, max: maxCost, unit: "원/년" };
}

// ─── 메인 계산 함수 ────────────────────────────────────────────────────────────
export function calcAnnualCost(input: AnnualCostInput): AnnualCostBreakdown {
  const fuel = getFuelCostRange(
    input.annualMileageKm,
    input.fuelType,
    input.fuelPricePerLiter,
    input.fuelEfficiency
  );
  const insurance = getInsuranceRange(input.vehicleYear);
  const tax = getTaxRange(input.vehicleYear);
  const consumables = getConsumablesRange(input.annualMileageKm);

  const totalMin = fuel.min + insurance.min + tax.min + consumables.min;
  const totalMax = fuel.max + insurance.max + tax.max + consumables.max;

  const total: CostRange = { min: totalMin, max: totalMax, unit: "원/년" };
  const perMonth: CostRange = {
    min: Math.round(totalMin / 12),
    max: Math.round(totalMax / 12),
    unit: "원/월",
  };

  const fuelLabel = {
    gasoline: "휘발유",
    diesel: "경유",
    hybrid: "하이브리드(휘발유)",
    ev: "전기",
    lpg: "LPG",
  }[input.fuelType];

  return {
    fuel,
    insurance,
    tax,
    consumables,
    total,
    perMonth,
    assumptions: [
      `연료: ${fuelLabel} ${FUEL_PRICE[input.fuelType]}원/${input.fuelType === "ev" ? "kWh" : "L"} 기준 (2026년 3월)`,
      `연비: ${DEFAULT_EFFICIENCY[input.fuelType]} km/${input.fuelType === "ev" ? "kWh" : "L"} 기준 (±10% 범위 반영)`,
      `보험료: 차령 기준 일반 범위 (가입 이력·특약에 따라 다름)`,
      `자동차세: 1,600cc 기준 추정. 실제 배기량·감면율에 따라 다름`,
      `소모품: km당 15~35원 추정 (엔진오일, 필터류, 와이퍼 등 연간 배분)`,
    ],
    updatedAt: "2026-03-22",
  };
}
