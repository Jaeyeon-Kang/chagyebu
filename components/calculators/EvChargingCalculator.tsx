"use client";

import { useState } from "react";
import type { EvChargingInput, EvChargingResult } from "@/types";
import { calcEvCharging } from "@/lib/calc-ev-charging";
import { EV_EFFICIENCY } from "@/data/ev-rates";
import { AssumptionsAccordion } from "@/components/ui/AssumptionsAccordion";

const fmt = (n: number) => n.toLocaleString("ko-KR");

const EV_MODELS = ["아이오닉5", "아이오닉6", "EV6", "기타"];

export function EvChargingCalculator() {
  const [selectedModel, setSelectedModel] = useState("아이오닉5");
  const [monthlyMileage, setMonthlyMileage] = useState(1200);
  const [homeRatio, setHomeRatio] = useState(60);      // %
  const [fastRatio, setFastRatio] = useState(20);      // %
  const [result, setResult] = useState<EvChargingResult | null>(null);
  const [error, setError] = useState("");

  const slowRatio = Math.max(0, 100 - homeRatio - fastRatio);

  function handleCalc() {
    if (homeRatio + fastRatio > 100) {
      setError("집충전 + 급속충전 비율 합계가 100%를 초과할 수 없습니다.");
      return;
    }
    setError("");
    const input: EvChargingInput = {
      monthlyMileageKm: monthlyMileage,
      efficiency: EV_EFFICIENCY[selectedModel] ?? EV_EFFICIENCY["기타"],
      homeChargeRatio: homeRatio / 100,
      fastChargeRatio: fastRatio / 100,
      slowChargeAtPublicRatio: slowRatio / 100,
    };
    setResult(calcEvCharging(input));
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-5">
        {/* 차종 */}
        <div className="space-y-2">
          <label className="text-sm text-slate-300">차종</label>
          <div className="flex flex-wrap gap-2">
            {EV_MODELS.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedModel(m)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  selectedModel === m
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            공인 효율: {EV_EFFICIENCY[selectedModel] ?? EV_EFFICIENCY["기타"]} km/kWh
          </p>
        </div>

        {/* 월 주행거리 */}
        <div className="space-y-2">
          <label className="flex justify-between text-sm text-slate-300">
            <span>월 주행거리</span>
            <span className="font-semibold text-blue-400 tabular-nums">
              {monthlyMileage.toLocaleString()} km
            </span>
          </label>
          <input
            type="range"
            min={300}
            max={5000}
            step={100}
            value={monthlyMileage}
            onChange={(e) => setMonthlyMileage(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        {/* 집충전 비율 */}
        <div className="space-y-2">
          <label className="flex justify-between text-sm text-slate-300">
            <span>집충전 비율 (완속)</span>
            <span className="font-semibold text-blue-400">{homeRatio}%</span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={homeRatio}
            onChange={(e) => setHomeRatio(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        {/* 급속충전 비율 */}
        <div className="space-y-2">
          <label className="flex justify-between text-sm text-slate-300">
            <span>급속충전 비율</span>
            <span className="font-semibold text-blue-400">{fastRatio}%</span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={fastRatio}
            onChange={(e) => setFastRatio(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        {/* 공용 완속 자동 계산 */}
        <div className="bg-slate-700/50 rounded-lg px-4 py-2">
          <p className="text-xs text-slate-400">
            공용 완속 충전:{" "}
            <span className="text-slate-300 font-semibold">{slowRatio}%</span>{" "}
            (자동 계산)
          </p>
        </div>

        {error && (
          <p className="text-xs text-red-400 bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          onClick={handleCalc}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors"
        >
          충전비 계산하기
        </button>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
            <h3 className="text-base font-semibold text-slate-200 mb-4">
              월 충전비 vs 휘발유
            </h3>
            <div className="space-y-3">
              <div className="bg-blue-950/30 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">월 충전비 예상</p>
                <p className="text-2xl font-bold text-blue-300 tabular-nums">
                  {fmt(result.monthlyChargeCost.min)} ~{" "}
                  {fmt(result.monthlyChargeCost.max)}
                  <span className="text-sm font-normal text-slate-400 ml-1">원/월</span>
                </p>
              </div>

              <div className="bg-slate-700/40 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">
                  같은 거리 휘발유 대비 절감액
                </p>
                <p
                  className={`text-xl font-semibold tabular-nums ${
                    result.vsGasoline.min > 0
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {result.vsGasoline.min > 0 ? "+" : ""}
                  {fmt(result.vsGasoline.min)} ~{" "}
                  {result.vsGasoline.max > 0 ? "+" : ""}
                  {fmt(result.vsGasoline.max)}
                  <span className="text-sm font-normal text-slate-400 ml-1">원/월</span>
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              마지막 업데이트: {result.updatedAt} · 환경부·한국전력 공시 요금 기준
            </p>
          </div>

          <AssumptionsAccordion assumptions={result.assumptions} />
        </div>
      )}
    </div>
  );
}
