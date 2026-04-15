import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/data/guides";
import { GuideCard } from "@/components/ui/GuideCard";

export const metadata: Metadata = {
  title: "탈 때·정비 가이드 — 교체주기·정비비 허브",
  description: "엔진오일, 브레이크패드, 타이어, 배터리 등 차를 타는 동안 필요한 모든 정비 가이드를 모았습니다.",
  alternates: { canonical: "/category/maintaining" },
  openGraph: {
    title: "탈 때·정비 가이드 — 교체주기·정비비 허브",
    description: "엔진오일, 브레이크패드, 타이어, 배터리 등 차를 타는 동안 필요한 모든 정비 가이드를 모았습니다.",
    type: "website",
  },
};

export default function MaintainingCategoryPage() {
  const guides = GUIDES.filter((g) => g.category === "maintaining");

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-blue-600 font-medium">카테고리</p>
        <h1 className="text-2xl font-bold text-slate-900">🔧 탈 때·정비</h1>
        <p className="text-[15px] text-slate-600 leading-relaxed">
          차를 타는 동안 발생하는 정비비와 교체주기 정보를 모았습니다.
        </p>
      </header>

      <div className="bg-slate-50 rounded-xl p-5 text-[15px] text-slate-600 leading-relaxed space-y-2">
        <p>
          자동차 유지비에서 가장 큰 비중을 차지하는 것은 연료비와 정기 정비비입니다.
          엔진오일, 브레이크패드, 타이어, 배터리 등 소모품은 교체주기를 놓치면
          더 큰 수리비로 이어질 수 있고, 반대로 너무 일찍 교체하면 불필요한 지출이 됩니다.
        </p>
        <p>
          아래 가이드에서는 제조사 매뉴얼 권장 주기와 실제 운행 조건을 고려한
          적정 교체 시기, 부품별 예상 비용(부품비+공임), 그리고 정비소에서
          과잉 정비를 권유받았을 때 판단하는 기준을 정리했습니다.
          비용 수치는 제조사 공식 서비스센터 공임표를 기준으로 합니다.
        </p>
      </div>

      <div className="grid gap-3">
        {guides.map((g) => (
          <GuideCard key={g.slug} slug={g.slug} title={g.title} description={g.description} />
        ))}
      </div>

      <div className="border-t border-slate-200 pt-6 space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">관련 계산기</p>
        <Link href="/calculator/first-car-budget" className="flex items-center gap-3 p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-2xl text-[15px] text-slate-700 hover:text-blue-600 transition-colors group">
          <span>🚗</span>
          <span className="flex-1">첫차 총예산 계산기</span>
          <span className="text-slate-600 group-hover:text-blue-400 transition-colors">→</span>
        </Link>
        <Link href="/calculator/fuel-vs-ev" className="flex items-center gap-3 p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-2xl text-[15px] text-slate-700 hover:text-blue-600 transition-colors group">
          <span>⚡</span>
          <span className="flex-1">연료비 비교 계산기</span>
          <span className="text-slate-600 group-hover:text-blue-400 transition-colors">→</span>
        </Link>
      </div>
    </div>
  );
}
