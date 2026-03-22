"use client";

import { useState } from "react";
import type { AnnualCostInput, AnnualCostBreakdown } from "@/types";
import { calcAnnualCost } from "@/lib/calc-annual-cost";
import { CostBreakdownCard } from "@/components/ui/CostBreakdownCard";
import { AssumptionsAccordion } from "@/components/ui/AssumptionsAccordion";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 15 }, (_, i) => CURRENT_YEAR - i);

const fuelOptions: { value: AnnualCostInput["fuelType"]; label: string }[] = [
  { value: "gasoline", label: "휘발유" },
  { value: "diesel", label: "경유" },
  { value: "hybrid", label: "하이브리드" },
  { value: "ev", label: "전기차(EV)" },
  { value: "lpg", label: "LPG" },
];

export function AnnualCostCalculator() {
  const [input, setInput] = useState<AnnualCostInput>({
    annualMileageKm: 15000,
    fuelType: "gasoline",
    vehicleYear: CURRENT_YEAR - 3,
    region: "서울",
  });
  const [result, setResult] = useState<AnnualCostBreakdown | null>(null);

  function handleCalc() {
    setResult(calcAnnualCost(input));
  }

  return (
    <div className="space-y-6">
      {/* ─── 입력 폼 ─── */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-5">
        {/* 연간 주행거리 */}
        <div className="space-y-2">
          <label className="flex justify-between text-sm text-slate-300">
            <span>연간 주행거리</span>
            <span className="font-semibold text-blue-400 tabular-nums">
              {input.annualMileageKm.toLocaleString()} km
            </span>
          </label>
          <input
            type="range"
            min={3000}
            max={50000}
            step={1000}
            value={input.annualMileageKm}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                annualMileageKm: Number(e.target.value),
              }))
            }
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-xs text-slate-600">
            <span>3,000km</span>
            <span>50,000km</span>
          </div>
        </div>

        {/* 연료 타입 */}
        <div className="space-y-2">
          <label className="text-sm text-slate-300">연료 타입</label>
          <div className="flex flex-wrap gap-2">
            {fuelOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() =>
                  setInput((prev) => ({ ...prev, fuelType: opt.value }))
                }
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  input.fuelType === opt.value
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 차량 연식 */}
        <div className="space-y-2">
          <label className="text-sm text-slate-300">차량 연식</label>
          <select
            value={input.vehicleYear}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                vehicleYear: Number(e.target.value),
              }))
            }
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}년식
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCalc}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors"
        >
          유지비 계산하기
        </button>
      </div>

      {/* ─── 결과 ─── */}
      {result && (
        <div className="space-y-4">
          <CostBreakdownCard
            title="연간 유지비 breakdown"
            updatedAt={result.updatedAt}
            items={[
              { label: "월 예상 비용", cost: result.perMonth, highlight: true },
              { label: "연료비", cost: result.fuel },
              { label: "보험료", cost: result.insurance },
              { label: "자동차세", cost: result.tax },
              { label: "소모품", cost: result.consumables },
              { label: "연간 합계", cost: result.total },
            ]}
          />
          <AssumptionsAccordion assumptions={result.assumptions} />
        </div>
      )}
    </div>
  );
}
