import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, BLOG_SLUGS } from "@/data/blog";
import { getGuideBySlug } from "@/data/guides";
import { renderBody } from "@/components/ui/RenderBody";
import { NextQuestions } from "@/components/layout/NextQuestions";
import { BASE_URL } from "@/lib/site-url";

export async function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "글을 찾을 수 없습니다" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedGuides = (post.relatedGuides ?? [])
    .map((s) => getGuideBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getGuideBySlug>>[];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "차계부", url: BASE_URL },
    publisher: { "@type": "Organization", name: "차계부", url: BASE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/blog/${slug}` },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "블로그", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${BASE_URL}/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
        <header className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/blog" className="text-blue-600 font-medium hover:underline">블로그</Link>
            <span className="text-slate-300">·</span>
            <time className="text-slate-400">{post.publishedAt}</time>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 leading-snug">{post.title}</h1>
          <p className="text-[15px] text-slate-500 leading-relaxed">{post.description}</p>
          <div className="flex gap-2 pt-1">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-0.5 bg-slate-100 text-slate-500 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </header>

        {post.relatedCalculator && (
          <Link
            href={post.relatedCalculator.href}
            className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 hover:border-blue-400 hover:bg-blue-100 transition-colors group"
          >
            <span className="text-sm text-blue-700 group-hover:text-blue-800 font-medium">
              {post.relatedCalculator.label}
            </span>
            <span className="text-blue-400 group-hover:text-blue-600">→</span>
          </Link>
        )}

        <article className="space-y-8">
          {post.sections.map((section, i) => (
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

        <div className="border-t border-slate-200 pt-6">
          <Link href="/blog" className="text-sm text-blue-600 hover:underline">
            ← 블로그 목록으로
          </Link>
        </div>
      </div>
    </>
  );
}
