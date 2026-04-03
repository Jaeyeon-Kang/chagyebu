"use client";

import { useState, useEffect } from "react";
import { calcNewVsUsed, type NewVsUsedResult } from "@/lib/calc-new-vs-used";
import { AssumptionsAccordion } from "@/components/ui/AssumptionsAccordion";
import { useCountUp } from "@/hooks/useCountUp";

const fmt = (n: number) => n.toLocaleString("ko-KR");

export function NewVsUsedCalc() {
  const [newPrice, setNewPrice] = useState(35000000);
  const [usedPrice, setUsedPrice] = useState(20000000);
  const [usedAge, setUsedAge] = useState(3);
  const [holdYears, setHoldYears] = useState(5);

  const [result, setResult] = useState<NewVsUsedResult>(() => calcNewVsUsed(newPrice, usedPrice, usedAge, holdYears));

  useEffect(() => {
    const id = setTimeout(() => {
      setResult(calcNewVsUsed(newPrice, usedPrice, usedAge, holdYears));
    }, 150);
    return () => clearTimeout(id);
  }, [newPrice, usedPrice, usedAge, holdYears]);

  const newTotal  = useCountUp(result.newTotalCost);
  const usedTotal = useCountUp(result.usedTotalCost);
  const diffVal   = useCountUp(result.diff);

  const winnerStyle: Record<string, string> = {
    "신차":   "text-blue-700 border-blue-200 bg-blue-50",
    "중고차": "text-emerald-700 border-emerald-200 bg-emerald-50",
    "비슷함": "text-amber-700 border-amber-200 bg-amber-50",
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">

        <div className="space-y-2">
          <label className="flex justify-between text-sm text-slate-600">
            <span>신차 가격</span>
            <span className="font-semibold text-blue-600 tabular-nums">{fmt(newPrice)}원</span>
          </label>
          <input type="range" min={10000000} max={80000000} step={1000000}
            value={newPrice} onChange={(e) => setNewPrice(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>1,000만원</span><span>8,000만원</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex justify-between text-sm text-slate-600">
            <span>중고차 가격</span>
            <span className="font-semibold text-emerald-600 tabular-nums">{fmt(usedPrice)}원</span>
          </label>
          <input type="range" min={3000000} max={50000000} step={500000}
            value={usedPrice} onChange={(e) => setUsedPrice(Number(e.target.value))}
            className="w-full"
            style={{ "--thumb-color": "#059669" } as React.CSSProperties}
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>300만원</span><span>5,000만원</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex justify-between text-sm text-slate-600">
              <span>중고차 차령</span>
              <span className="font-semibold text-slate-700">{usedAge}년</span>
            </label>
            <input type="range" min={1} max={15} step={1}
              value={usedAge} onChange={(e) => setUsedAge(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>1년</span><span>15년</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex justify-between text-sm text-slate-600">
              <span>보유 예정</span>
              <span className="font-semibold text-slate-700">{holdYears}년</span>
            </label>
            <input type="range" min={1} max={10} step={1}
              value={holdYears} onChange={(e) => setHoldYears(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>1년</span><span>10년</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
          <div className={`border rounded-2xl p-5 ${winnerStyle[result.winner]}`}>
            <p className="text-xs text-slate-500 mb-1">{holdYears}년 기준 유리한 선택</p>
            <p className="text-3xl font-bold">{result.winner}</p>
            {result.winner !== "비슷함" && (
              <p className="text-sm mt-1 text-slate-500">
                {result.winner === "신차" ? "중고차 대비 " : "신차 대비 "}
                약 {fmt(diffVal)}원 절감 예상
              </p>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">{holdYears}년 총소유비 비교</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400 mb-1">신차</p>
                <p className="text-2xl font-bold text-blue-600 tabular-nums">{fmt(newTotal)}원</p>
                <p className="text-xs text-slate-400 mt-1">감가: {fmt(result.newDepreciation)}원</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">중고차 ({usedAge}년식)</p>
                <p className="text-2xl font-bold text-emerald-600 tabular-nums">{fmt(usedTotal)}원</p>
                <p className="text-xs text-slate-400 mt-1">감가: {fmt(result.usedDepreciation)}원</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-400 border-t border-slate-100 pt-3">
              총소유비 = 감가상각 + 취득세 + 보험료 ({holdYears}년) + 정비비 ({holdYears}년)
            </p>
          </div>

          <AssumptionsAccordion assumptions={result.assumptions} />
        </div>
    </div>
  );
}
