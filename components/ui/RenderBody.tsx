export function renderBody(body: string) {
  const paragraphs = body.split("\n\n");
  return paragraphs.map((para, j) => {
    const lines = para.split("\n");
    const isBulletBlock = lines.every((l) => l.trimStart().startsWith("•"));

    if (isBulletBlock) {
      return (
        <ul key={j} className="space-y-1.5 pl-1">
          {lines.map((line, k) => (
            <li key={k} className="flex gap-2 text-[15px] text-slate-600 leading-relaxed">
              <span className="text-blue-500 shrink-0 mt-0.5">•</span>
              <span>{line.replace(/^•\s*/, "")}</span>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={j} className="text-[15px] text-slate-600 leading-relaxed">
        {para}
      </p>
    );
  });
}
