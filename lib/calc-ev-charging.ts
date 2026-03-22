import type { EvChargingInput, EvChargingResult } from "@/types";
import { EV_CHARGE_RATES, GASOLINE_REFERENCE } from "@/data/ev-rates";

export function calcEvCharging(input: EvChargingInput): EvChargingResult {
  const {
    monthlyMileageKm,
    efficiency,
    homeChargeRatio,
    fastChargeRatio,
    slowChargeAtPublicRatio,
  } = input;

  // 월 총 소비 전력량 (kWh)
  const monthlyKwh = monthlyMileageKm / efficiency;

  // 충전 방식별 비용 계산
  const homeCost =
    monthlyKwh * homeChargeRatio * EV_CHARGE_RATES.homeSlowKwh;
  const homeNightCost =
    monthlyKwh * homeChargeRatio * EV_CHARGE_RATES.homeSlowNightKwh;
  const publicSlowCost =
    monthlyKwh * slowChargeAtPublicRatio * EV_CHARGE_RATES.publicSlowKwh;
  const fastCost =
    monthlyKwh * fastChargeRatio * EV_CHARGE_RATES.publicFastKwh;

  // 범위: 집충전 심야 할인 적용(최저) ~ 미적용(최고)
  const minTotal = Math.round(homeNightCost + publicSlowCost + fastCost);
  const maxTotal = Math.round(homeCost + publicSlowCost + fastCost);

  // 동일 주행거리 휘발유 비용
  const gasMonthlyL =
    monthlyMileageKm / GASOLINE_REFERENCE.efficiencyKmPerLiter;
  const gasMonthlyCost = Math.round(
    gasMonthlyL * GASOLINE_REFERENCE.pricePerLiter
  );

  const savingsMin = gasMonthlyCost - maxTotal;
  const savingsMax = gasMonthlyCost - minTotal;

  const chargeRatioTotal = homeChargeRatio + slowChargeAtPublicRatio + fastChargeRatio;
  const homePercent = Math.round(homeChargeRatio * 100);
  const slowPercent = Math.round(slowChargeAtPublicRatio * 100);
  const fastPercent = Math.round(fastChargeRatio * 100);

  return {
    monthlyChargeCost: {
      min: minTotal,
      max: maxTotal,
      unit: "원/월",
    },
    vsGasoline: {
      min: savingsMin,
      max: savingsMax,
      unit: "원/월",
    },
    assumptions: [
      `월 주행거리 ${monthlyMileageKm.toLocaleString()}km, 효율 ${efficiency}km/kWh 기준`,
      `집충전 ${homePercent}% (완속, 일반 ${EV_CHARGE_RATES.homeSlowKwh}원/kWh · 심야 ${EV_CHARGE_RATES.homeSlowNightKwh}원/kWh)`,
      `공용 완속 ${slowPercent}% (${EV_CHARGE_RATES.publicSlowKwh}원/kWh)`,
      `급속충전 ${fastPercent}% (환경부 기준 ${EV_CHARGE_RATES.publicFastKwh}원/kWh)`,
      `비교 기준 휘발유: ${GASOLINE_REFERENCE.pricePerLiter}원/L, 연비 ${GASOLINE_REFERENCE.efficiencyKmPerLiter}km/L`,
      chargeRatioTotal !== 1
        ? `⚠ 충전 비율 합계가 100%가 아닙니다. 입력을 확인하세요.`
        : "",
    ].filter(Boolean),
    updatedAt: EV_CHARGE_RATES.updatedAt,
  };
}
