import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/data/guides";

export const metadata: Metadata = {
  title: "EV·친환경 가이드 — 전기차 비용 허브",
  description: "전기차 충전비, EV가 맞는 경우·안 맞는 경우, 하이브리드 vs EV 비교 등 전기차 비용 정보를 모았습니다.",
};

export default function EvCategoryPage() {
  const guides = GUIDES.filter((g) => g.category === "ev");

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-blue-400 font-medium">카테고리</p>
        <h1 className="text-2xl font-bold text-slate-100">⚡ EV·친환경</h1>
        <p className="text-sm text-slate-400">전기차와 하이브리드의 실제 비용을 확인하세요.</p>
      </header>

      {guides.length > 0 ? (
        <div className="grid gap-3">
          {guides.map((g) => (
            <Link key={g.slug} href={`/guide/${g.slug}`}
              className="group flex flex-col gap-1 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-blue-600/50 rounded-xl p-4 transition-all">
              <h2 className="text-base font-semibold text-slate-100 group-hover:text-blue-300 transition-colors">{g.title}</h2>
              <p className="text-sm text-slate-400 line-clamp-2">{g.description}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500 text-center py-4">가이드를 준비 중입니다.</p>
      )}

      <div className="border-t border-slate-800 pt-6 grid gap-2">
        <Link href="/calculator/fuel-vs-ev" className="flex items-center gap-3 p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm text-slate-300 transition-colors">
          ⚡ 연료비 비교 계산기 (EV 충전비 포함) →
        </Link>
      </div>
    </div>
  );
}
