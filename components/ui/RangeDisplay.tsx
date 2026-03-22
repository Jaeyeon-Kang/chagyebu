interface RangeDisplayProps {
  label: string;
  min: number;
  max: number;
  unit?: string;
  highlight?: boolean;
}

export function RangeDisplay({
  label,
  min,
  max,
  unit = "원",
  highlight = false,
}: RangeDisplayProps) {
  const fmt = (n: number) => n.toLocaleString("ko-KR");

  return (
    <div
      className={`flex flex-col gap-0.5 py-3 border-b border-slate-700 last:border-0 ${
        highlight ? "bg-blue-950/30 -mx-4 px-4 rounded-lg" : ""
      }`}
    >
      <span className="text-sm text-slate-400">{label}</span>
      <span
        className={`font-semibold tabular-nums ${
          highlight ? "text-xl text-blue-300" : "text-base text-slate-100"
        }`}
      >
        {fmt(min)} ~ {fmt(max)}
        <span className="text-xs font-normal text-slate-400 ml-1">{unit}</span>
      </span>
    </div>
  );
}
