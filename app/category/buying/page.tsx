import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/data/guides";

export const metadata: Metadata = {
  title: "살 때 가이드 — 첫차·중고차 비용 허브",
  description: "첫차 살 때 빠지는 비용, 중고차 유지비 체크 등 구매 전 꼭 알아야 할 비용 정보를 모았습니다.",
};

export default function BuyingCategoryPage() {
  const guides = GUIDES.filter((g) => g.category === "buying");

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-blue-400 font-medium">카테고리</p>
        <h1 className="text-2xl font-bold text-slate-100">🏷️ 살 때</h1>
        <p className="text-sm text-slate-400">차를 구매하기 전에 꼭 알아야 할 비용 정보입니다.</p>
      </header>

      <div className="grid gap-3">
        {guides.map((g) => (
          <Link key={g.slug} href={`/guide/${g.slug}`}
            className="group flex flex-col gap-1 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-blue-600/50 rounded-xl p-4 transition-all">
            <h2 className="text-base font-semibold text-slate-100 group-hover:text-blue-300 transition-colors">{g.title}</h2>
            <p className="text-sm text-slate-400 line-clamp-2">{g.description}</p>
          </Link>
        ))}
        {guides.length === 0 && (
          <p className="text-slate-500 text-sm py-8 text-center">가이드를 준비 중입니다.</p>
        )}
      </div>

      <div className="border-t border-slate-800 pt-6 grid gap-2">
        <Link href="/calculator/first-car-budget" className="flex items-center gap-3 p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm text-slate-300 transition-colors">
          🚗 첫차 총예산 계산기 →
        </Link>
        <Link href="/calculator/new-vs-used" className="flex items-center gap-3 p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm text-slate-300 transition-colors">
          🔄 신차 vs 중고차 총소유비 비교 →
        </Link>
      </div>
    </div>
  );
}
