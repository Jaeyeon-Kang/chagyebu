import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "면책고지",
  description: "차계부 사이트에서 제공하는 계산 결과와 정보의 정확성, 활용 범위, 법적 한계에 관한 면책 고지입니다.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <header className="space-y-2">
        <p className="text-sm text-blue-600 font-medium">정책</p>
        <h1 className="text-2xl font-bold text-slate-900">면책고지</h1>
        <p className="text-sm text-slate-500">최종 업데이트: 2026-04-03</p>
      </header>

      <div className="space-y-6 text-[15px] text-slate-600 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-slate-800">1. 정보의 목적</h2>
          <p>
            차계부(이하 "본 사이트", https://chagyebu.co.kr)에서 제공하는 모든 계산 결과, 가이드, 블로그 게시물은
            <strong> 교육 및 참고 목적</strong>으로만 제공됩니다.
            본 사이트의 정보는 전문적인 재무, 법률, 보험, 정비 자문을 대체하지 않습니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-slate-800">2. 계산 결과의 한계</h2>
          <p>
            본 사이트의 계산기는 공공 통계와 제조사 기준을 바탕으로 비용의 <strong>추정 범위</strong>를 제공합니다.
            실제 비용은 아래 요인에 따라 달라질 수 있습니다:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>차종, 연식, 옵션 사양</li>
            <li>거주 지역 및 정비소 선택</li>
            <li>운전 습관 및 주행 환경 (시내·고속도로 비율, 날씨 등)</li>
            <li>보험 가입 이력 및 운전 경력</li>
            <li>유가·충전 요금·세율의 변동</li>
          </ul>
          <p>
            계산 결과는 최소값과 최대값의 범위로 표시되지만, 실제 비용이 이 범위를 벗어나는 경우도 있습니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-slate-800">3. 데이터 정확성</h2>
          <p>
            본 사이트는 국토교통부, 한국석유공사, 환경부, 보험개발원 등 공공 기관의 공식 데이터를 사용하며,
            월 1~2회 검토하여 업데이트합니다.
            그러나 데이터 출처의 업데이트 지연, 계절적 변동, 정책 변경 등으로 인해
            일시적으로 실제 수치와 차이가 발생할 수 있습니다.
          </p>
          <p>
            데이터 오류를 발견하시면{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">문의 페이지</Link>를 통해 알려주세요.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-slate-800">4. 책임의 한계</h2>
          <p>
            본 사이트의 정보를 근거로 한 차량 구매, 정비, 보험 가입, 투자 등의 결정에 대해
            차계부는 어떠한 법적 책임도 지지 않습니다.
          </p>
          <p>
            중요한 비용 결정은 반드시 전문 정비사, 보험 설계사, 공인된 딜러 또는 관련 전문가에게
            직접 확인하시기 바랍니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-slate-800">5. 외부 링크</h2>
          <p>
            본 사이트에 포함된 외부 웹사이트로의 링크는 사용자의 편의를 위해 제공됩니다.
            외부 사이트의 콘텐츠, 개인정보 보호 정책, 서비스에 대해 차계부는 책임을 지지 않습니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-slate-800">6. 고지 변경</h2>
          <p>
            본 면책고지는 사전 통지 없이 변경될 수 있습니다.
            변경 시 이 페이지에 업데이트 날짜와 함께 게시합니다.
          </p>
        </section>
      </div>
    </div>
  );
}
