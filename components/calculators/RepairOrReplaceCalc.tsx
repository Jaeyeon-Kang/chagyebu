"use client";

import { useState } from "react";
import type { RepairOrReplaceInput, RepairOrReplaceResult } from "@/types";
import { calcRepairOrReplace } from "@/lib/calc-repair-replace";

const fmt = (n: number) => n.toLocaleString("ko-KR");

const decisionStyle: Record<string, string> = {
  "수리 권장": "text-emerald-400 border-emerald-700 bg-emerald-950/30",
  "교체 고려": "text-red-400 border-red-700 bg-red-950/30",
  "검토 필요": "text-amber-400 border-amber-700 bg-amber-950/30",
};

export function RepairOrReplaceCalc() {
  const [input, setInput] = useState<RepairOrReplaceInput>({
    repairCost: 1500000,
    vehicleCurrentValue: 8000000,
    expectedCostNext12Months: 500000,
    vehicleAge: 6,
  });
  const [result, setResult] = useState<RepairOrReplaceResult | null>(null);

  const set = (key: keyof RepairOrReplaceInput) => (val: number) =>
    setInput((prev) => ({ ...prev, [key]: val }));

  function handleCalc() {
    setResult(calcRepairOrReplace(input));
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-5">
        {/* 현재 수리비 */}
        <div className="space-y-1.5">
          <label className="text-sm text-slate-300">현재 수리 견적</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={input.repairCost}
              onChange={(e) => set("repairCost")(Number(e.target.value))}
              min={0}
              step={10000}
              className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-500 shrink-0">원</span>
          </div>
        </div>

        {/* 차량 현재가치 */}
        <div className="space-y-1.5">
          <label className="text-sm text-slate-300">차량 현재 시장 가치</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={input.vehicleCurrentValue}
              onChange={(e) => set("vehicleCurrentValue")(Number(e.target.value))}
              min={0}
              step={100000}
              className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-500 shrink-0">원</span>
          </div>
          <p className="text-xs text-slate-500">
            중고차 시세 참고 사이트에서 확인 후 입력하세요.
          </p>
        </div>

        {/* 향후 12개월 예상 추가 비용 */}
        <div className="space-y-1.5">
          <label className="text-sm text-slate-300">
            향후 12개월 예상 추가 수리·정비 비용
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={input.expectedCostNext12Months}
              onChange={(e) =>
                set("expectedCostNext12Months")(Number(e.target.value))
              }
              min={0}
              step={10000}
              className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-500 shrink-0">원</span>
          </div>
        </div>

        {/* 차령 */}
        <div className="space-y-2">
          <label className="flex justify-between text-sm text-slate-300">
            <span>차령</span>
            <span className="font-semibold text-blue-400">{input.vehicleAge}년</span>
          </label>
          <input
            type="range"
            min={1}
            max={20}
            step={1}
            value={input.vehicleAge}
            onChange={(e) => set("vehicleAge")(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        <button
          onClick={handleCalc}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors"
        >
          판단 보기
        </button>
      </div>

      {result && (
        <div className="space-y-4">
          {/* 판단 결과 */}
          <div
            className={`border rounded-2xl p-5 ${
              decisionStyle[result.decision]
            }`}
          >
            <p className="text-xs text-slate-400 mb-1">판단 결과</p>
            <p className="text-2xl font-bold">{result.decision}</p>
            <p className="text-sm mt-1 text-slate-400">
              수리비 / 차량가치 비율:{" "}
              <span className="font-semibold">
                {Math.round(result.repairRatio * 100)}%
              </span>
            </p>
          </div>

          {/* 근거 */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">
              판단 근거
            </h3>
            <ul className="space-y-2">
              {result.reasons.map((r, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-400">
                  <span className="text-slate-600 shrink-0 mt-0.5">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              마지막 업데이트: {result.updatedAt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
