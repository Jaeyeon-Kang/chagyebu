import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/data/guides";
import { GuideCard } from "@/components/ui/GuideCard";

export const metadata: Metadata = {
  title: "살 때 가이드 — 첫차·중고차 비용 허브",
  description: "첫차 살 때 빠지는 비용, 중고차 유지비 체크 등 구매 전 꼭 알아야 할 비용 정보를 모았습니다.",
  alternates: { canonical: "/category/buying" },
  openGraph: {
    title: "살 때 가이드 — 첫차·중고차 비용 허브",
    description: "첫차 살 때 빠지는 비용, 중고차 유지비 체크 등 구매 전 꼭 알아야 할 비용 정보를 모았습니다.",
    type: "website",
  },
};

export default function BuyingCategoryPage() {
  const guides = GUIDES.filter((g) => g.category === "buying");

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-blue-600 font-medium">카테고리</p>
        <h1 className="text-2xl font-bold text-slate-900">🏷️ 살 때</h1>
        <p className="text-[15px] text-slate-600 leading-relaxed">
          차를 구매하기 전에 꼭 알아야 할 비용 정보입니다.
        </p>
      </header>

      <div className="bg-slate-50 rounded-xl p-5 text-[15px] text-slate-600 leading-relaxed space-y-2">
        <p>
          자동차를 살 때 차량 가격만 보고 예산을 잡으면 취등록세, 공채 매입, 보험료 등
          예상치 못한 부대비용에 당황하게 됩니다. 특히 첫차를 구매하는 사회 초년생이라면
          차값 외에 첫해에만 <strong>200~500만 원</strong>의 추가 비용이 발생할 수 있습니다.
        </p>
        <p>
          아래 가이드에서는 취등록세 계산법, 신차와 중고차의 5년 총비용 차이,
          자동차보험 가입 시 체크할 항목 등 구매 전에 반드시 확인해야 할 비용 정보를 정리했습니다.
          모든 수치는 국토교통부, 지방세법, 보험개발원 등 공공 데이터를 기반으로 합니다.
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
        <Link href="/calculator/first-car-budget" className="flex items-center gap-3 p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-2xl text-[15px] text-slate-700 hover:text-blue-600 transition-colors group">
          <span>🚗</span>
          <span className="flex-1">첫차 총예산 계산기</span>
          <span className="text-slate-600 group-hover:text-blue-400 transition-colors">→</span>
        </Link>
        <Link href="/calculator/new-vs-used" className="flex items-center gap-3 p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-2xl text-[15px] text-slate-700 hover:text-blue-600 transition-colors group">
          <span>🔄</span>
          <span className="flex-1">신차 vs 중고차 총소유비 비교</span>
          <span className="text-slate-600 group-hover:text-blue-400 transition-colors">→</span>
        </Link>
      </div>
    </div>
  );
}
