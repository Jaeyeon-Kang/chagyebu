import type { CostRange } from "@/types";
import { RangeDisplay } from "./RangeDisplay";

interface BreakdownItem {
  label: string;
  cost: CostRange;
  highlight?: boolean;
}

interface CostBreakdownCardProps {
  title: string;
  items: BreakdownItem[];
  updatedAt?: string;
}

export function CostBreakdownCard({
  title,
  items,
  updatedAt,
}: CostBreakdownCardProps) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
      <h3 className="text-base font-semibold text-slate-200 mb-4">{title}</h3>
      <div className="divide-y divide-slate-700">
        {items.map((item) => (
          <RangeDisplay
            key={item.label}
            label={item.label}
            min={item.cost.min}
            max={item.cost.max}
            unit={item.cost.unit}
            highlight={item.highlight}
          />
        ))}
      </div>
      {updatedAt && (
        <p className="mt-4 text-xs text-slate-500">
          마지막 업데이트: {updatedAt} · 제조사 기준 및 공공 통계 기반 추정
        </p>
      )}
    </div>
  );
}
