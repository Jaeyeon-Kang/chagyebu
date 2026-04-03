import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog";
import { GUIDES } from "@/data/guides";

export const metadata: Metadata = {
  title: "차계부 — 자동차 비용 판단 가이드",
  description:
    "첫차 총예산, 연료비 비교(가솔린·하이브리드·EV), 신차 vs 중고차 총소유비 계산기와 소모품·정비·수리비 가이드를 무료로 제공합니다.",
};

const CALCULATORS_SUB = [
  {
    href: "/calculator/fuel-vs-ev",
    icon: "⚡",
    title: "내연기관 vs 전기차 유지비",
    desc: "내 주행거리와 충전 환경 기준으로 가솔린·하이브리드·EV 월 비용을 비교합니다.",
  },
  {
    href: "/calculator/new-vs-used",
    icon: "🔄",
    title: "신차 vs 중고차 5년 총비용",
    desc: "감가상각·수리비까지 더한 5년 총소유비로 실제 손익을 비교합니다.",
  },
] as const;

const POPULAR_GUIDES = [
  { href: "/guide/engine-oil-interval", label: "호갱 방지: 엔진오일 적정 교체 주기" },
  { href: "/guide/brake-pad-signal", label: "브레이크패드 과잉 교체 당하지 않는 법" },
  { href: "/guide/tire-timing", label: "타이어 교체시기" },
  { href: "/guide/battery-timing", label: "배터리 교체시기" },
  { href: "/guide/first-car-hidden-costs", label: "딜러가 말 안 해주는 첫차 부대비용 7가지" },
];

const CATEGORIES = [
  { href: "/category/buying", icon: "🏷️", label: "구매 비용", color: "text-blue-600" },
  { href: "/category/maintaining", icon: "🔧", label: "소모품·정비", color: "text-emerald-600" },
  { href: "/category/repairing", icon: "🛠️", label: "수리비·견적", color: "text-amber-600" },
  { href: "/category/ev", icon: "⚡", label: "EV 충전·유지비", color: "text-teal-600" },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">

      {/* Hero + 메인 CTA */}
      <section className="space-y-6 mb-16">
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            차 살 때, 탈 때, 고칠 때<br />
            <span className="text-blue-600">견적 전에</span> 먼저 확인하세요
          </h1>
          <p className="text-base text-slate-500 max-w-xl leading-relaxed">
            표준 비용 범위를 미리 알면 과다 청구를 바로 걸러낼 수 있습니다.
          </p>
        </div>

        {/* 메인 CTA — 첫차 계산기 */}
        <Link
          href="/calculator/first-car-budget"
          className="group flex items-center gap-5 bg-blue-600 hover:bg-blue-700 rounded-2xl p-6 transition-colors shadow-lg shadow-blue-600/20"
        >
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-2xl shrink-0">
            🚗
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">첫차 실지출액 계산기</h2>
              <span className="text-xs px-2 py-0.5 bg-white/20 text-white/90 rounded-full">첫차 구매 전 필수</span>
            </div>
            <p className="text-sm text-blue-100 mt-1">취등록세, 보험, 연료비, 소모품까지 — 첫해 실지출액을 산출합니다</p>
          </div>
          <span className="text-white/60 group-hover:text-white transition-colors shrink-0 text-2xl">→</span>
        </Link>

        {/* 서브 계산기 2개 */}
        <div className="grid sm:grid-cols-2 gap-3">
          {CALCULATORS_SUB.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group flex items-start gap-3 bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md rounded-xl p-4 transition-all"
            >
              <span className="text-xl mt-0.5">{c.icon}</span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 카테고리 — 한 줄 */}
      <section className="mb-14">
        <h2 className="text-sm font-bold text-slate-900 mb-3">주제별로 찾기</h2>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 hover:border-blue-300 rounded-full text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors shadow-sm hover:shadow"
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 인기 가이드 */}
      <section className="mb-14">
        <h2 className="text-sm font-bold text-slate-900 mb-3">많이 읽은 가이드</h2>
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
          {POPULAR_GUIDES.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="flex items-center justify-between px-5 py-3.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors group"
            >
              <span>{g.label}</span>
              <span className="text-slate-300 group-hover:text-blue-500 transition-colors">→</span>
            </Link>
          ))}
        </div>
        <div className="mt-2 text-right">
          <Link href="/category/maintaining" className="text-xs text-slate-400 hover:text-blue-500">
            가이드 {GUIDES.length}개 전체 보기 →
          </Link>
        </div>
      </section>

      {/* 최근 글 */}
      {BLOG_POSTS.length > 0 && (
        <section className="mb-14">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-900">최근 글</h2>
            <Link href="/blog" className="text-xs text-slate-400 hover:text-blue-500">전체 보기 →</Link>
          </div>
          <div className="space-y-2">
            {[...BLOG_POSTS]
              .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
              .slice(0, 3)
              .map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="flex items-start gap-3 bg-white border border-slate-200 hover:border-blue-300 rounded-xl px-5 py-4 transition-all group"
                >
                  <span className="text-xs text-slate-400 shrink-0 mt-0.5 tabular-nums">{post.publishedAt.slice(5)}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors truncate">
                      {post.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{post.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      )}

      {/* 면책 조항 */}
      <section className="text-xs text-slate-400 leading-relaxed border-t border-slate-100 pt-8">
        <p>
          본 사이트의 모든 산출 결과는 공공 통계(국토교통부·한국전력 등), 제조사 공시가 및 표준 공임표를
          바탕으로 한 추정치입니다. 개별 차량 상태·지역·정비소에 따라 실제 청구 금액과 차이가 발생할 수 있으며,
          본 사이트는 해당 결과에 대한 법적 책임을 지지 않습니다.
        </p>
      </section>

    </div>
  );
}
