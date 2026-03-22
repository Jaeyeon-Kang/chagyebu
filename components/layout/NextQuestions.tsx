import Link from "next/link";
import type { NextQuestion } from "@/types";

interface NextQuestionsProps {
  questions: NextQuestion[];
  title?: string;
}

const typeIcon: Record<NextQuestion["type"], string> = {
  calculator: "🧮",
  guide: "📖",
  compare: "⚖️",
};

export function NextQuestions({
  questions,
  title = "다음 질문",
}: NextQuestionsProps) {
  if (questions.length === 0) return null;

  return (
    <section className="mt-8">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
        {title}
      </h3>
      <div className="grid gap-2">
        {questions.map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="flex items-center gap-3 p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-xl transition-colors group"
          >
            <span className="text-lg">{typeIcon[q.type]}</span>
            <span className="text-sm text-slate-300 group-hover:text-slate-100 transition-colors">
              {q.text}
            </span>
            <span className="ml-auto text-slate-600 group-hover:text-slate-400">
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
