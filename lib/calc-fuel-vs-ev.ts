import fuelDefaults from "@/data/fuel-price-defaults.json";

export const FUEL_EFFICIENCY = { gasoline: 12.5, hybrid: 18.0, ev: 4.5 } as const;

export interface FuelCompareRow {
  label: string;
  monthlyMin: number;
  monthlyMax: number;
  barColor: string;
  textColor: string;
}

export function calcFuelVsEv(monthlyMileage: number, homeChargeRatio: number): FuelCompareRow[] {
  const safeDiv = (m: number, eff: number) => eff > 0 ? m / eff : 0;
  const gasMin = Math.round(safeDiv(monthlyMileage, FUEL_EFFICIENCY.gasoline * 1.1) * fuelDefaults.gasoline);
  const gasMax = Math.round(safeDiv(monthlyMileage, FUEL_EFFICIENCY.gasoline * 0.9) * fuelDefaults.gasoline);
  const hybMin = Math.round(safeDiv(monthlyMileage, FUEL_EFFICIENCY.hybrid * 1.1) * fuelDefaults.gasoline);
  const hybMax = Math.round(safeDiv(monthlyMileage, FUEL_EFFICIENCY.hybrid * 0.9) * fuelDefaults.gasoline);
  const kwh = safeDiv(monthlyMileage, FUEL_EFFICIENCY.ev);
  const homeR = homeChargeRatio / 100;
  const publicR = 1 - homeR;
  const evMin = Math.round(kwh * (homeR * fuelDefaults.ev_home_slow_night + publicR * fuelDefaults.ev_public_slow));
  const evMax = Math.round(kwh * (homeR * fuelDefaults.ev_home_slow + publicR * fuelDefaults.ev_public_fast_50kw));
  return [
    { label: "가솔린", monthlyMin: gasMin, monthlyMax: gasMax, barColor: "bg-orange-400", textColor: "text-orange-600" },
    { label: "하이브리드", monthlyMin: hybMin, monthlyMax: hybMax, barColor: "bg-amber-400", textColor: "text-amber-600" },
    { label: "전기차(EV)", monthlyMin: evMin, monthlyMax: evMax, barColor: "bg-blue-500", textColor: "text-blue-600" },
  ];
}
