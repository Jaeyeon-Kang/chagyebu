import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "출처 및 데이터 기준",
  description: "차계부 계산기와 가이드에서 사용하는 데이터의 출처와 기준을 안내합니다.",
  alternates: { canonical: "/sources" },
};

const SOURCES = [
  {
    category: "세금·등록",
    items: [
      { name: "지방세법 (취득세 7% 기준)", url: "https://www.law.go.kr", desc: "비영업용 자동차 취득세율, EV 감면 한도" },
      { name: "국토교통부 — 자동차등록 안내", url: "https://www.molit.go.kr", desc: "공채 매입, 등록 절차, 번호판 발급" },
    ],
  },
  {
    category: "연료·충전 단가",
    items: [
      { name: "한국석유공사 오피넷 (전국 평균 유가)", url: "https://www.opinet.co.kr", desc: "휘발유·경유·LPG 전국 평균 가격" },
      { name: "환경부 — 전기차 충전요금 공시", url: "https://www.me.go.kr", desc: "공용 완속·급속 충전 요금" },
      { name: "한국전력 — 전기요금표", url: "https://cyber.kepco.co.kr", desc: "가정용 심야·일반 전기 요금 (집충전 기준)" },
    ],
  },
  {
    category: "연비",
    items: [
      { name: "국토교통부 — 자동차 에너지소비효율", url: "https://www.molit.go.kr", desc: "차종별 공인 연비 (km/L, km/kWh)" },
    ],
  },
  {
    category: "보험·정비",
    items: [
      { name: "보험개발원 — 자동차보험 참조순보험료", url: "https://www.kidi.or.kr", desc: "차종·연령·경력별 보험료 통계" },
      { name: "제조사 서비스센터 공시 공임표", url: null, desc: "현대·기아·BMW 등 공식 서비스센터 부품비+공임 기준" },
    ],
  },
  {
    category: "자동차세",
    items: [
      { name: "지방세법 — 자동차세 세율", url: "https://www.law.go.kr", desc: "배기량별 cc당 세율, 차령 감면율 (최대 50%)" },
    ],
  },
];

export default function SourcesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-blue-600 font-medium">출처</p>
        <h1 className="text-2xl font-bold text-slate-900">출처 및 데이터 기준</h1>
        <p className="text-[15px] text-slate-600 leading-relaxed">
          차계부의 계산기와 가이드에서 사용하는 모든 수치는 아래 공공 통계 및 공시 자료를 기반으로 합니다.
          광고성 자료나 출처가 불분명한 데이터는 사용하지 않으며,
          각 데이터의 출처와 적용 기준을 아래에 투명하게 공개합니다.
        </p>
      </header>

      {/* 데이터 관리 원칙 */}
      <section className="bg-blue-50 border border-blue-100 rounded-xl p-5 space-y-3">
        <h2 className="text-base font-semibold text-slate-800">데이터 관리 원칙</h2>
        <ul className="space-y-2 text-[15px] text-slate-600 leading-relaxed">
          <li className="flex gap-2">
            <span className="text-blue-500 shrink-0">•</span>
            <span><strong>공공 데이터만 사용</strong>: 국토교통부, 한국석유공사, 환경부, 보험개발원 등 정부·공공기관의 공식 발표 자료만 참조합니다.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 shrink-0">•</span>
            <span><strong>정기 검토</strong>: 연료 단가, 충전 요금, 세율 등 변동이 잦은 수치는 월 1~2회 검토 후 반영합니다. 세법 개정이나 요금 변경 시 수시로 업데이트합니다.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 shrink-0">•</span>
            <span><strong>전국 평균 기준</strong>: 연료 가격은 전국 평균 유가를, 정비비는 제조사 공식 서비스센터 공임표를 기준으로 합니다. 지역·정비소에 따라 실제 금액은 달라질 수 있습니다.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 shrink-0">•</span>
            <span><strong>오류 수정 이력 공개</strong>: 데이터 오류가 발견되면 즉시 수정하고, 주요 수정 사항은 <a href="/update-log" className="text-blue-600 hover:underline">업데이트 기록</a>에 게시합니다.</span>
          </li>
        </ul>
      </section>

      <div className="space-y-6">
        {SOURCES.map((group) => (
          <section key={group.category} className="space-y-3">
            <h2 className="text-base font-semibold text-slate-800 border-l-2 border-blue-500 pl-3">
              {group.category}
            </h2>
            <div className="space-y-2">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                      <p className="text-[15px] text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline shrink-0 mt-0.5"
                      >
                        바로가기 →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* 계산 방법 설명 */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-slate-800 border-l-2 border-blue-500 pl-3">
          계산 방법
        </h2>
        <div className="text-[15px] text-slate-600 leading-relaxed space-y-2">
          <p>
            차계부의 계산기는 위 공공 데이터를 조합하여 비용의 <strong>추정 범위(최소~최대)</strong>를 산출합니다.
            단일 정답이 아닌 범위를 제시하는 이유는, 동일한 차종이라도 운전 습관·지역·정비소 선택에 따라
            실제 비용이 크게 달라지기 때문입니다.
          </p>
          <p>
            예를 들어 연료비 계산에서는 공인 복합연비에 실주행 보정 계수(0.8~0.9)를 적용하여
            실도로 연비 기준의 비용을 추정합니다. 보험료는 보험개발원의 차종·연령·경력별 통계를 바탕으로
            일반적인 범위를 제시하며, 개인의 사고 이력·특약 구성에 따라 달라질 수 있습니다.
          </p>
          <p>
            각 계산기 페이지 하단의 "계산 근거" 섹션에서 해당 계산기의 구체적인 산출 공식을 확인할 수 있습니다.
          </p>
        </div>
      </section>

      <div className="border-t border-slate-200 pt-6 space-y-2 text-xs text-slate-400 leading-relaxed">
        <p>
          위 출처의 수치는 전국 평균 또는 표준 기준이며, 지역·차종·개인 조건에 따라 실제 금액과 차이가 발생할 수 있습니다.
          중요한 비용 결정은 전문 정비사, 보험 설계사, 공인된 딜러에게 직접 확인하시기 바랍니다.
          데이터 오류를 발견하시면 <a href="/contact" className="text-blue-500 hover:underline">문의 페이지</a>를 통해 알려주세요.
        </p>
        <p>마지막 업데이트: 2026-04-15</p>
      </div>
    </div>
  );
}
