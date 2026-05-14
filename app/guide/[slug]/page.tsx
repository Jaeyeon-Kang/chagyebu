import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuideBySlug, GUIDE_SLUGS } from "@/data/guides";
import { renderBody } from "@/components/ui/RenderBody";
import { NextQuestions } from "@/components/layout/NextQuestions";
import { BASE_URL } from "@/lib/site-url";

export async function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "가이드를 찾을 수 없습니다" };
  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      publishedTime: guide.publishedAt ?? guide.updatedAt,
      modifiedTime: guide.updatedAt,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: guide.title }],
    },
    alternates: { canonical: `/guide/${slug}` },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const relatedGuides = guide.relatedGuides
    .map((s) => getGuideBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getGuideBySlug>>[];

  const categoryLabel: Record<string, string> = {
    maintaining: "소모품·정비",
    repairing: "수리비·견적",
    buying: "구매 비용 검증",
    ev: "EV 충전·유지비",
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt ?? guide.updatedAt,
    dateModified: guide.updatedAt,
    author: { "@type": "Organization", name: "차계부", url: BASE_URL },
    publisher: { "@type": "Organization", name: "차계부", url: BASE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/guide/${slug}` },
  };

  const faqJsonLd = guide.faq && guide.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guide.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: categoryLabel[guide.category] ?? "가이드", item: `${BASE_URL}/category/${guide.category}` },
      { "@type": "ListItem", position: 3, name: guide.title, item: `${BASE_URL}/guide/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
        <header className="space-y-2">
          <p className="text-sm text-blue-600 font-medium">가이드</p>
          <h1 className="text-2xl font-bold text-slate-900 leading-snug">{guide.title}</h1>
          <p className="text-[15px] text-slate-500 leading-relaxed">{guide.description}</p>
          <p className="text-xs text-slate-400">마지막 업데이트: {guide.updatedAt}</p>
        </header>

        {guide.relatedCalculator && (
          <Link
            href={guide.relatedCalculator.href}
            className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 hover:border-blue-400 hover:bg-blue-100 transition-colors group"
          >
            <span className="text-sm text-blue-700 group-hover:text-blue-800 font-medium">
              🧮 {guide.relatedCalculator.label}
            </span>
            <span className="text-blue-400 group-hover:text-blue-600">→</span>
          </Link>
        )}

        <article className="space-y-8">
          {guide.sections.map((section, i) => (
            <section key={i} className="space-y-3">
              {section.heading && (
                <h2 className="text-lg font-bold text-slate-900 border-l-2 border-blue-500 pl-3">
                  {section.heading}
                </h2>
              )}
              <div className="space-y-3">
                {renderBody(section.body)}
              </div>
            </section>
          ))}
        </article>

        {guide.faq && guide.faq.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 border-l-2 border-blue-500 pl-3">
              자주 묻는 질문
            </h2>
            <div className="space-y-3">
              {guide.faq.map((item, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-2">
                  <p className="text-sm font-semibold text-slate-800">Q. {item.q}</p>
                  <p className="text-[15px] text-slate-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {relatedGuides.length > 0 && (
          <NextQuestions
            title="관련 가이드"
            questions={relatedGuides.map((g) => ({
              text: g.title,
              href: `/guide/${g.slug}`,
              type: "guide" as const,
            }))}
          />
        )}

        <footer className="border-t border-slate-200 pt-6 space-y-3 text-xs text-slate-500 leading-relaxed">
          <div className="space-y-1">
            <p>
              <span className="font-semibold text-slate-700">작성·검토</span> · 차계부 편집팀
            </p>
            <p>
              <span className="font-semibold text-slate-700">최초 발행</span> ·{" "}
              {guide.publishedAt ?? guide.updatedAt}
            </p>
            <p>
              <span className="font-semibold text-slate-700">최종 검토일</span> · {guide.updatedAt}
            </p>
            <p>
              <span className="font-semibold text-slate-700">자료 출처</span> · 제조사 매뉴얼 권장
              주기, 한국교통안전공단·국토교통부 공시 자료, 정비소 표준 공임가표.{" "}
              <Link href="/sources" className="underline hover:text-slate-700">
                전체 출처 보기
              </Link>
            </p>
          </div>
          <p className="text-slate-400">
            본 가이드는 일반적인 기준값을 정리한 정보 콘텐츠입니다. 차종·연식·운행 환경에 따라
            실제 권장 주기와 비용이 다를 수 있으므로, 구체적인 점검은 전문 정비사에게 확인하시기
            바랍니다. 가이드 내용은 정기적으로 검토·갱신됩니다.
          </p>
        </footer>
      </div>
    </>
  );
}
