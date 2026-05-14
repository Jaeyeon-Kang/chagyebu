import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/data/guides";
import { GuideCard } from "@/components/ui/GuideCard";

export const metadata: Metadata = {
  title: "자동차 가이드 전체 — 정비·구매·EV·수리 한눈에",
  description:
    "엔진오일·브레이크패드·타이어부터 첫차 구매·전기차·정비까지 자동차 비용 관련 가이드를 카테고리별로 모았습니다.",
  alternates: { canonical: "/guide" },
  openGraph: {
    title: "자동차 가이드 전체 — 정비·구매·EV·수리 한눈에",
    description:
      "엔진오일·브레이크패드·타이어부터 첫차 구매·전기차·정비까지 자동차 비용 관련 가이드를 카테고리별로 모았습니다.",
    type: "website",
  },
};

const CATEGORY_META: Record<
  "buying" | "maintaining" | "repairing" | "ev",
  { label: string; emoji: string; description: string; href: string }
> = {
  buying: {
    label: "구매 비용 검증",
    emoji: "🛒",
    description: "첫차 부대비용·중고차 점검·자동차세 등 구매 단계의 모든 비용",
    href: "/category/buying",
  },
  maintaining: {
    label: "탈 때·정비",
    emoji: "🔧",
    description: "엔진오일·브레이크패드·타이어 등 정기 정비비와 교체 주기",
    href: "/category/maintaining",
  },
  repairing: {
    label: "수리비·견적",
    emoji: "🔨",
    description: "쇼크업소버·정비소 견적 등 사고·고장 수리 비용 판단",
    href: "/category/repairing",
  },
  ev: {
    label: "EV 충전·유지비",
    emoji: "⚡",
    description: "전기차 충전 요금·하이브리드 비교 등 친환경차 비용",
    href: "/category/ev",
  },
};

export default function GuideIndexPage() {
  const byCategory = (["buying", "maintaining", "repairing", "ev"] as const).map((cat) => ({
    category: cat,
    meta: CATEGORY_META[cat],
    guides: GUIDES.filter((g) => g.category === cat),
  }));

  const totalGuides = GUIDES.length;
  const latestUpdate = GUIDES.map((g) => g.updatedAt)
    .sort()
    .reverse()[0];

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "자동차 가이드 전체",
    description:
      "엔진오일·브레이크패드·타이어부터 첫차 구매·전기차·정비까지 자동차 비용 관련 가이드 모음",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalGuides,
      itemListElement: GUIDES.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: g.title,
        url: `https://chagyebu.co.kr/guide/${g.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
        <header className="space-y-2">
          <p className="text-sm text-blue-600 font-medium">가이드 전체</p>
          <h1 className="text-2xl font-bold text-slate-900">
            자동차 비용 가이드 — 총 {totalGuides}편
          </h1>
          <p className="text-[15px] text-slate-600 leading-relaxed">
            제조사 권장 주기, 공공 통계, 정비소 표준 공임가를 바탕으로 정리한
            자동차 비용 가이드를 카테고리별로 모았습니다. 차를 살 때부터 탈 때,
            수리할 때까지 단계별로 확인하세요.
          </p>
          <p className="text-xs text-slate-400">
            마지막 업데이트: {latestUpdate} · 데이터 출처는{" "}
            <Link className="underline hover:text-slate-600" href="/sources">
              출처 페이지
            </Link>
            에서 확인할 수 있습니다.
          </p>
        </header>

        <div className="bg-slate-50 rounded-xl p-5 text-[15px] text-slate-600 leading-relaxed space-y-2">
          <p>
            자동차 비용은 구매 시점뿐 아니라 타는 동안 꾸준히 발생합니다.
            연간 유지비의 60% 이상이 연료비와 정기 정비비, 보험료에 들어가며,
            여기에 사고·고장 시 수리비가 추가됩니다.
          </p>
          <p>
            아래 가이드들은 제조사 매뉴얼 권장 주기, 공공 통계, 정비소 공임표를
            기준으로 작성되었습니다. 구체적인 견적은 차종·지역·정비소에 따라
            달라지므로, 실제 비용은 전문 정비사에게 확인하세요.
          </p>
        </div>

        {byCategory.map(({ category, meta, guides }) => (
          <section key={category} className="space-y-4">
            <div className="flex items-end justify-between border-b border-slate-200 pb-2">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {meta.emoji} {meta.label}
                </h2>
                <p className="text-sm text-slate-500 mt-1">{meta.description}</p>
              </div>
              <Link
                href={meta.href}
                className="text-xs text-blue-600 hover:text-blue-800 whitespace-nowrap"
              >
                카테고리 전체 →
              </Link>
            </div>

            <div className="grid gap-3">
              {guides.map((g) => (
                <GuideCard
                  key={g.slug}
                  slug={g.slug}
                  title={g.title}
                  description={g.description}
                />
              ))}
            </div>
          </section>
        ))}

        <div className="border-t border-slate-200 pt-6 space-y-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            계산기로 직접 확인
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/calculator/first-car-budget"
              className="p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-2xl transition-colors"
            >
              <p className="text-sm font-semibold text-slate-800">🚗 첫차 총예산 계산기</p>
              <p className="text-xs text-slate-500 mt-1">
                취득세·보험·연료비·소모품까지 첫해 총비용
              </p>
            </Link>
            <Link
              href="/calculator/fuel-vs-ev"
              className="p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-2xl transition-colors"
            >
              <p className="text-sm font-semibold text-slate-800">⚡ 연료비 비교 계산기</p>
              <p className="text-xs text-slate-500 mt-1">
                가솔린·하이브리드·EV 월 비용 비교
              </p>
            </Link>
            <Link
              href="/calculator/new-vs-used"
              className="p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-2xl transition-colors sm:col-span-2"
            >
              <p className="text-sm font-semibold text-slate-800">📊 신차 vs 중고차 5년 총비용</p>
              <p className="text-xs text-slate-500 mt-1">
                감가상각·수리비까지 더한 5년 총소유비 비교
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
