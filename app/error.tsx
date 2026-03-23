"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center space-y-6">
      <p className="text-6xl font-bold text-slate-200">오류</p>
      <h1 className="text-2xl font-bold text-slate-900">
        문제가 발생했습니다
      </h1>
      <p className="text-slate-500">
        일시적인 오류입니다. 아래 버튼을 눌러 다시 시도해 주세요.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
      >
        다시 시도
      </button>
    </div>
  );
}
