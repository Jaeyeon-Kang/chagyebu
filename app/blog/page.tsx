import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS, BLOG_TAGS } from "@/data/blog";

export const metadata: Metadata = {
  title: "블로그 — 자동차 비용 뉴스와 분석 | 차계부",
  description:
    "유가 동향, EV 보조금 변경, 보험료 트렌드 등 자동차 비용에 영향을 주는 최신 소식을 정리합니다.",
};

export default function BlogListPage() {
  const posts = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-blue-600 font-medium">블로그</p>
        <h1 className="text-2xl font-bold text-slate-900">자동차 비용 뉴스와 분석</h1>
        <p className="text-[15px] text-slate-600 leading-relaxed">
          유가 동향, EV 충전 요금 변동, 보조금·세금 정책 변경 등 자동차 비용에 영향을 주는 소식을 정리합니다.
        </p>
      </header>

      {BLOG_TAGS.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {BLOG_TAGS.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {posts.length > 0 ? (
        <div className="space-y-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-1.5 bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md rounded-2xl p-5 transition-all shadow-sm"
            >
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <time>{post.publishedAt}</time>
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-base font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-[15px] text-slate-500 leading-relaxed line-clamp-2">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 space-y-2">
          <p className="text-slate-500 text-sm">아직 작성된 글이 없습니다.</p>
          <p className="text-slate-400 text-xs">곧 자동차 비용 관련 분석 글이 올라옵니다.</p>
        </div>
      )}
    </div>
  );
}
