import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/data/guides";
import { GuideCard } from "@/components/ui/GuideCard";

export const metadata: Metadata = {
  title: "수리비·견적 가이드 — 정비소 방문 전 필수 체크",
  description: "정비소 견적을 받기 전에 알아야 할 것들. 과잉 정비를 피하는 방법과 수리 항목을 판단하는 기준을 정리했습니다.",
  alternates: { canonical: "/category/repairing" },
  openGraph: {
    title: "수리비·견적 가이드 — 정비소 방문 전 필수 체크",
    description: "정비소 견적을 받기 전에 알아야 할 것들. 과잉 정비를 피하는 방법과 수리 항목을 판단하는 기준을 정리했습니다.",
    type: "website",
  },
};

export default function RepairingCategoryPage() {
  const guides = GUIDES.filter((g) => g.category === "repairing");

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-blue-600 font-medium">카테고리</p>
        <h1 className="text-2xl font-bold text-slate-900">🛠️ 수리비·견적</h1>
        <p className="text-[15px] text-slate-600 leading-relaxed">
          정비소 견적을 받기 전에 알아야 할 것들. 과잉 정비를 피하는 방법과
          수리 항목을 판단하는 기준을 정리했습니다.
        </p>
      </header>

      <div className="bg-slate-50 rounded-xl p-5 text-[15px] text-slate-600 leading-relaxed space-y-2">
        <p>
          정비소에서 견적을 받았을 때 "이게 적정 가격인지" 판단하기 어려운 경우가 많습니다.
          특히 처음 차를 가진 운전자라면 정비사가 권하는 항목이 정말 필요한 것인지,
          아니면 과잉 정비인지 구분하기 힘듭니다.
        </p>
        <p>
          아래 가이드에서는 주요 수리 항목별 적정 비용 범위(제조사 공식 서비스센터 기준),
          교체가 정말 필요한 상황을 판단하는 체크리스트, 그리고 정비소 방문 전에
          미리 확인할 사항을 정리했습니다. 견적서를 받았을 때 비교 기준으로 활용하세요.
        </p>
      </div>

      <div className="grid gap-3">
        {guides.map((g) => (
          <GuideCard key={g.slug} slug={g.slug} title={g.title} description={g.description} />
        ))}
        {guides.length === 0 && (
          <p className="text-slate-500 text-sm py-8 text-center">가이드를 준비 중입니다.</p>
        )}
      </div>

      <div className="border-t border-slate-200 pt-6 space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">관련 계산기</p>
        <Link href="/calculator/new-vs-used" className="flex items-center gap-3 p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-2xl text-[15px] text-slate-700 hover:text-blue-600 transition-colors group">
          <span>🔄</span>
          <span className="flex-1">신차 vs 중고차 총소유비 비교</span>
          <span className="text-slate-600 group-hover:text-blue-400 transition-colors">→</span>
        </Link>
      </div>
    </div>
  );
}
