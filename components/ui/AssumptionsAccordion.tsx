"use client";

import { useState } from "react";

interface AssumptionsAccordionProps {
  assumptions: string[];
}

export function AssumptionsAccordion({ assumptions }: AssumptionsAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
      >
        <span>계산 기준 보기</span>
        <span className="text-slate-500">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <ul className="px-4 pb-4 space-y-1.5 bg-slate-800/50">
          {assumptions.map((a, i) => (
            <li key={i} className="text-xs text-slate-400 flex gap-2">
              <span className="text-slate-600 shrink-0">•</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
