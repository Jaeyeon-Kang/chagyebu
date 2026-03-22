import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/data/guides";

export const metadata: Metadata = {
  title: "탈 때·정비 가이드 — 교체주기·정비비 허브",
  description: "엔진오일, 브레이크패드, 타이어, 배터리 등 차를 타는 동안 필요한 모든 정비 가이드를 모았습니다.",
};

export default function MaintainingCategoryPage() {
  const guides = GUIDES.filter((g) => g.category === "maintaining");

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-blue-400 font-medium">카테고리</p>
        <h1 className="text-2xl font-bold text-slate-100">🔧 탈 때·정비</h1>
        <p className="text-sm text-slate-400">차를 타는 동안 발생하는 정비비와 교체주기 정보를 모았습니다.</p>
      </header>

      <div className="grid gap-3">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={`/guide/${g.slug}`}
            className="group flex flex-col gap-1 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-blue-600/50 rounded-xl p-4 transition-all"
          >
            <h2 className="text-base font-semibold text-slate-100 group-hover:text-blue-300 transition-colors">
              {g.title}
            </h2>
            <p className="text-sm text-slate-400 line-clamp-2">{g.description}</p>
            <p className="text-xs text-slate-600 mt-1">업데이트: {g.updatedAt}</p>
          </Link>
        ))}
      </div>

      <div className="border-t border-slate-800 pt-6">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">관련 계산기</h3>
        <div className="grid gap-2">
          <Link href="/calculator/first-car-budget" className="flex items-center gap-3 p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm text-slate-300 transition-colors">
            🚗 첫차 총예산 계산기 →
          </Link>
          <Link href="/calculator/fuel-vs-ev" className="flex items-center gap-3 p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm text-slate-300 transition-colors">
            ⚡ 연료비 비교 계산기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
