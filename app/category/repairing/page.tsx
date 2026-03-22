import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "고장·수리 가이드 — 정비비 범위 허브",
  description: "수리비가 적정한지, 수리해야 할지 교체해야 할지 판단할 때 필요한 비용 정보를 모았습니다.",
};

export default function RepairingCategoryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-blue-400 font-medium">카테고리</p>
        <h1 className="text-2xl font-bold text-slate-100">🛠️ 고장·수리</h1>
        <p className="text-sm text-slate-400">수리 견적이 적정한지, 수리와 교체 중 어느 쪽이 유리한지 판단하는 데 필요한 정보입니다.</p>
      </header>

      <div className="grid gap-2">
        <Link href="/calculator/new-vs-used" className="group flex flex-col gap-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-600/50 rounded-xl p-4 transition-all">
          <h2 className="text-base font-semibold text-slate-100 group-hover:text-blue-300 transition-colors">수리 vs 교체 판단 계산기</h2>
          <p className="text-sm text-slate-400">수리비·차량가치·향후 예상 비용으로 경제성 판단</p>
        </Link>
      </div>

      <p className="text-sm text-slate-500 text-center py-4">추가 가이드를 준비 중입니다.</p>
    </div>
  );
}
