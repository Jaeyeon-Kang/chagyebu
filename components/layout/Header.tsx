"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV = [
  { href: "/calculator/first-car-budget", label: "첫차 예산", desc: "첫해 실지출액 계산" },
  { href: "/calculator/fuel-vs-ev", label: "연료비 비교", desc: "가솔린·하이브리드·EV" },
  { href: "/calculator/new-vs-used", label: "신차 vs 중고", desc: "5년 총소유비 비교" },
  { href: "/category/maintaining", label: "정비 가이드", desc: "소모품·수리비 단가표" },
  { href: "/blog", label: "블로그", desc: "유가·정책 소식" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="28" height="28" rx="6" fill="#2563eb" className="group-hover:fill-blue-700 transition-colors" />
            <text x="14" y="15.5" dominantBaseline="middle" textAnchor="middle"
              fontFamily="'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif"
              fontWeight="900" fontSize="14.5" fill="white">차</text>
          </svg>
          <span className="text-blue-600 font-bold text-lg tracking-tight group-hover:text-blue-700 transition-colors">
            차계부
          </span>
        </Link>

        {/* 햄버거 버튼 */}
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col items-center justify-center w-9 h-9 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
        >
          <span className={`block w-5 h-0.5 bg-slate-600 rounded-full transition-all duration-200 ${open ? "rotate-45 translate-y-[3px]" : ""}`} />
          <span className={`block w-5 h-0.5 bg-slate-600 rounded-full transition-all duration-200 mt-1 ${open ? "-rotate-45 -translate-y-[3px]" : ""}`} />
        </button>
      </div>

      {/* 드롭다운 메뉴 */}
      {open && (
        <nav className="border-t border-slate-100 bg-white">
          <div className="mx-auto max-w-3xl px-4 py-2">
            {NAV.map((n) => {
              const isActive = pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`flex items-center justify-between px-3 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span className={`text-sm ${isActive ? "font-medium" : ""}`}>{n.label}</span>
                  <span className="text-xs text-slate-400">{n.desc}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
