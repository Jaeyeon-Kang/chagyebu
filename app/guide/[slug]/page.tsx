import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuideBySlug, GUIDE_SLUGS } from "@/data/guides";
import { NextQuestions } from "@/components/layout/NextQuestions";

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

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
      {/* 헤더 */}
      <header className="space-y-2">
        <p className="text-sm text-blue-400 font-medium">가이드</p>
        <h1 className="text-2xl font-bold text-slate-100 leading-snug">{guide.title}</h1>
        <p className="text-sm text-slate-400 leading-relaxed">{guide.description}</p>
        <p className="text-xs text-slate-600">마지막 업데이트: {guide.updatedAt}</p>
      </header>

      {/* 관련 계산기 CTA */}
      {guide.relatedCalculator && (
        <Link
          href={guide.relatedCalculator.href}
          className="flex items-center justify-between bg-blue-950/30 border border-blue-700/40 rounded-xl px-4 py-3 hover:border-blue-500/60 transition-colors group"
        >
          <span className="text-sm text-blue-300 group-hover:text-blue-200">
            🧮 {guide.relatedCalculator.label}
          </span>
          <span className="text-blue-600 group-hover:text-blue-400">→</span>
        </Link>
      )}

      {/* 본문 섹션들 */}
      <article className="space-y-6">
        {guide.sections.map((section, i) => (
          <section key={i} className="space-y-2">
            {section.heading && (
              <h2 className="text-lg font-semibold text-slate-200">{section.heading}</h2>
            )}
            <div className="text-sm text-slate-300 leading-relaxed space-y-3">
              {section.body.split("\n\n").map((para, j) => (
                <p key={j} className={para.startsWith("•") ? "pl-1" : ""}>
                  {para.startsWith("•") ? (
                    <span className="whitespace-pre-line">{para}</span>
                  ) : (
                    para
                  )}
                </p>
              ))}
            </div>
          </section>
        ))}
      </article>

      {/* FAQ */}
      {guide.faq && guide.faq.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-slate-200">자주 묻는 질문</h2>
          <div className="space-y-3">
            {guide.faq.map((item, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-2">
                <p className="text-sm font-semibold text-slate-200">Q. {item.q}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 관련 가이드 */}
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
    </div>
  );
}
