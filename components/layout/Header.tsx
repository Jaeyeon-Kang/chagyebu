import Link from "next/link";

const NAV = [
  { href: "/calculator/first-car-budget", label: "첫차예산" },
  { href: "/calculator/fuel-vs-ev", label: "연료비비교" },
  { href: "/category/maintaining", label: "정비가이드" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-700 bg-slate-900/95 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-blue-400 font-bold text-lg tracking-tight group-hover:text-blue-300 transition-colors">
            차비서
          </span>
          <span className="hidden sm:block text-xs text-slate-500">
            자동차 비용 판단 가이드
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-xs px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
