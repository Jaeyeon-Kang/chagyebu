import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/data/guides";
import { GuideCard } from "@/components/ui/GuideCard";

export const metadata: Metadata = {
  title: "EV·친환경 가이드 — 전기차 비용 허브",
  description: "전기차 충전비, EV가 맞는 경우·안 맞는 경우, 하이브리드 vs EV 비교 등 전기차 비용 정보를 모았습니다.",
  alternates: { canonical: "/category/ev" },
  openGraph: {
    title: "EV·친환경 가이드 — 전기차 비용 허브",
    description: "전기차 충전비, EV가 맞는 경우·안 맞는 경우, 하이브리드 vs EV 비교 등 전기차 비용 정보를 모았습니다.",
    type: "website",
  },
};

export default function EvCategoryPage() {
  const guides = GUIDES.filter((g) => g.category === "ev");

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-blue-600 font-medium">카테고리</p>
        <h1 className="text-2xl font-bold text-slate-900">⚡ EV·친환경</h1>
        <p className="text-[15px] text-slate-600 leading-relaxed">
          전기차와 하이브리드의 실제 비용을 확인하세요.
        </p>
      </header>

      <div className="bg-slate-50 rounded-xl p-5 text-[15px] text-slate-600 leading-relaxed space-y-2">
        <p>
          "전기차가 진짜 더 저렴할까?" — 구매 보조금, 취등록세 감면, 낮은 충전비 덕분에
          전기차가 경제적으로 유리해 보이지만, 실제로는 주행 패턴과 충전 환경에 따라
          내연기관차보다 비용이 더 들 수도 있습니다.
        </p>
        <p>
          아래 가이드에서는 전기차 충전비의 실제 구조(공용 급속·완속, 집충전 요금 차이),
          하이브리드와 순수 EV의 연간 유지비 차이, 그리고 전기차가 경제적으로 유리한 경우와
          그렇지 않은 경우를 구체적인 수치로 비교합니다.
          충전 요금은 환경부·한국전력 공시 기준이며, 월 1~2회 업데이트합니다.
        </p>
      </div>

      <div className="grid gap-3">
        {guides.map((g) => (
          <GuideCard key={g.slug} slug={g.slug} title={g.title} description={g.description} />
        ))}
        {guides.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-4">가이드를 준비 중입니다.</p>
        )}
      </div>

      <div className="border-t border-slate-200 pt-6 space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">관련 계산기</p>
        <Link href="/calculator/fuel-vs-ev" className="flex items-center gap-3 p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-2xl text-[15px] text-slate-700 hover:text-blue-600 transition-colors group">
          <span>⚡</span>
          <span className="flex-1">연료비 비교 계산기 (EV 충전비 포함)</span>
          <span className="text-slate-600 group-hover:text-blue-400 transition-colors">→</span>
        </Link>
      </div>
    </div>
  );
}
