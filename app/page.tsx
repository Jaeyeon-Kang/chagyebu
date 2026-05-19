import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog";
import { GUIDES } from "@/data/guides";

export const metadata: Metadata = {
  title: "차계부 — 자동차 비용 판단 가이드",
  description:
    "첫차 총예산, 연료비 비교(가솔린·하이브리드·EV), 신차 vs 중고차 총소유비 계산기와 소모품·정비·수리비 가이드를 무료로 제공합니다.",
  alternates: { canonical: "/" },
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
  { href: "/guide/car-tax-calculation", label: "자동차세 계산법 — 배기량·연식별 정리" },
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
            <span className="text-blue-600">견적 전에</span> 확인하세요
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
              <h2 className="text-lg font-bold text-white">첫차 총비용 계산기</h2>
              <span className="text-xs px-2 py-0.5 bg-white/20 text-white/90 rounded-full">첫차 구매 전 필수</span>
            </div>
            <p className="text-sm text-blue-100 mt-1">취등록세, 보험, 연료비, 소모품까지 — 첫해 총비용을 확인해보세요</p>
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
          <Link href="/guide" className="text-xs text-slate-400 hover:text-blue-500">
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

      {/* 왜 차계부인가 — 운영자 메시지 */}
      <section className="mb-14 border-t border-slate-100 pt-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4">왜 차계부를 만들었나요?</h2>
        <div className="space-y-4 text-[15px] text-slate-600 leading-relaxed">
          <p>
            첫차를 살 때 차값 2,000만 원만 보고 예산을 잡았다가,
            취등록세 140만 원, 공채 20만 원, 첫해 보험료 100만 원, 4년치 자동차세, 소모품 첫 교환비까지
            한꺼번에 나가서 당황한 적이 있습니다. <strong>"차값보다 차값 외 비용이 많구나"</strong> 라는 깨달음이 시작점이었습니다.
          </p>
          <p>
            정비소에서도 마찬가지였습니다.
            "엔진오일 1만 km 권장이지만 3개월 됐으니 한 번 더 갈자", "브레이크패드 6mm 남았는데 미리 갈자" 같은 권유에
            <strong>"이게 진짜 필요한 건지, 아니면 매출인지"</strong> 판단할 기준이 없었습니다.
            결국 인터넷을 뒤져 제조사 매뉴얼·공공 통계·정비소 공임표를 따로따로 찾아야 했죠.
          </p>
          <p>
            이 사이트는 <strong>그 흩어진 정보를 한곳에 모은 것</strong>입니다.
            "딜러가 안 알려주는 부대비용 7가지", "정비소에서 과잉 교체 당하지 않는 법" 같은
            가이드는 모두 실제 견적·정비 사례를 바탕으로 정리했습니다.
            광고를 위해 수치를 부풀리거나 특정 제품을 추천하지 않습니다.
          </p>
        </div>
      </section>

      {/* 차계부의 차별점 */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-slate-900 mb-4">다른 자동차 사이트와 무엇이 다른가</h2>
        <div className="grid gap-3">
          <div className="bg-blue-50 rounded-xl p-5 space-y-1">
            <p className="font-semibold text-slate-800">📐 모든 계산을 공식 법령·공시 데이터로 구현</p>
            <p className="text-[14px] text-slate-600 leading-relaxed">
              취득세는 지방세법 7%, 공채는 국토교통부 할인율, 연료비는 한국석유공사 오피넷 평균가,
              충전 요금은 환경부·한국전력 고시 단가. 출처가 명확하고{" "}
              <Link href="/sources" className="text-blue-600 underline">출처 페이지</Link>에서 검증 가능합니다.
            </p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-5 space-y-1">
            <p className="font-semibold text-slate-800">🛠️ 정비비는 표준 공임 + 부품가 범위로 제공</p>
            <p className="text-[14px] text-slate-600 leading-relaxed">
              "엔진오일 5만 원" 같은 단일 수치 대신 "공식 센터 6~10만, 일반 정비소 4~7만" 범위로 제시합니다.
              과다 청구를 한눈에 식별할 수 있게.
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-5 space-y-1">
            <p className="font-semibold text-slate-800">🚫 광고와 콘텐츠를 분리</p>
            <p className="text-[14px] text-slate-600 leading-relaxed">
              특정 정비소·보험사·중고차 플랫폼을 추천하지 않습니다.
              비교 견적의 출처(보험다모아, 엔카, KB차차차 등)는 공정하게 나열만 합니다.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-5 space-y-1">
            <p className="font-semibold text-slate-800">📅 분기별 데이터 재검증</p>
            <p className="text-[14px] text-slate-600 leading-relaxed">
              유가·충전요금·세율은 분기마다 재확인하고{" "}
              <Link href="/update-log" className="text-blue-600 underline">업데이트 기록</Link>에 명시합니다.
              각 가이드 하단에 마지막 검토일을 표시합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 사이트 안내 */}
      <section className="mb-14 bg-slate-50 rounded-xl p-6 space-y-3 text-[14px] text-slate-600 leading-relaxed">
        <h3 className="text-base font-bold text-slate-800">사이트 안내</h3>
        <p>
          <strong>운영자</strong>: 차계부 편집팀 (1인 미디어 프로젝트)
        </p>
        <p>
          <strong>문의·제보</strong>:{" "}
          <Link href="/contact" className="text-blue-600 underline">contact</Link> 페이지를 통해 직접 받습니다.
          데이터 오류나 추가 요청이 있으면 24시간 내 검토 후 회신합니다.
        </p>
        <p>
          <strong>관련 페이지</strong>:{" "}
          <Link href="/about" className="text-blue-600 underline">상세 소개</Link>{" "}·{" "}
          <Link href="/sources" className="text-blue-600 underline">데이터 출처</Link>{" "}·{" "}
          <Link href="/update-log" className="text-blue-600 underline">업데이트 기록</Link>{" "}·{" "}
          <Link href="/privacy" className="text-blue-600 underline">개인정보처리방침</Link>
        </p>
      </section>

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
