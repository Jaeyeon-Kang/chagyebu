import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "차계부의 개인정보처리방침입니다. 수집하는 정보, 쿠키 정책, 제3자 서비스 이용 내역을 안내합니다.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <header className="space-y-2">
        <p className="text-sm text-blue-600 font-medium">정책</p>
        <h1 className="text-2xl font-bold text-slate-900">개인정보처리방침</h1>
        <p className="text-sm text-slate-500">시행일: 2026-03-01 · 최종 업데이트: 2026-04-03</p>
      </header>

      <div className="space-y-6 text-[15px] text-slate-600 leading-relaxed">
        <p>
          차계부(이하 "본 사이트", <strong>https://chagyebu.co.kr</strong>)는 사용자의 개인정보를 중요하게 생각합니다.
          본 방침은 사이트 이용 과정에서 어떤 정보가 수집되고 어떻게 처리되는지 설명합니다.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-slate-800">1. 수집하는 정보</h2>
          <p>
            본 사이트는 <strong>회원 가입 기능이 없으며</strong>, 이름·이메일·전화번호 등 개인을 직접 식별할 수 있는 정보를 수집하지 않습니다.
          </p>
          <p>
            계산기에 입력하는 값(주행거리, 연료 타입, 차량 가격 등)은 사용자의 브라우저 내에서만 처리되며,
            서버로 전송되거나 저장되지 않습니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-slate-800">2. 자동으로 수집되는 정보</h2>
          <p>
            사이트 방문 시 아래 정보가 분석 도구를 통해 자동으로 수집될 수 있습니다:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>방문 페이지 URL 및 체류 시간</li>
            <li>브라우저 종류 및 운영체제</li>
            <li>유입 경로(검색 엔진, 직접 방문 등)</li>
            <li>대략적인 지역 정보(도시 수준, IP 주소 자체는 저장하지 않음)</li>
          </ul>
          <p>
            이 정보는 개인을 식별하는 데 사용되지 않으며, 사이트 개선과 콘텐츠 기획 목적으로만 활용됩니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-slate-800">3. 제3자 서비스</h2>
          <p>본 사이트는 아래 제3자 서비스를 사용합니다:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Google Analytics 4</strong>: 사이트 이용 통계 분석. Google의 데이터 처리 방식은{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Google 개인정보처리방침
              </a>을 참고하세요.
            </li>
            <li>
              <strong>Google AdSense</strong>: 맞춤형 광고 제공. 쿠키를 통해 관심사 기반 광고를 표시할 수 있습니다.
              광고 개인화를 원하지 않으면{" "}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Google 광고 설정
              </a>에서 비활성화할 수 있습니다.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-slate-800">4. 쿠키 정책</h2>
          <p>
            본 사이트는 Google Analytics와 AdSense 운영을 위해 쿠키를 사용합니다.
            쿠키는 사용자의 브라우저에 저장되는 작은 텍스트 파일로, 사이트 이용 패턴을 파악하거나
            광고를 표시하는 데 사용됩니다.
          </p>
          <p>
            사이트 첫 방문 시 쿠키 동의 배너가 표시되며, 동의하지 않으면 광고 관련 쿠키가 설정되지 않습니다.
            브라우저 설정에서도 쿠키를 차단하거나 삭제할 수 있습니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-slate-800">5. 아동의 개인정보</h2>
          <p>
            본 사이트는 만 14세 미만의 아동을 대상으로 하지 않으며, 아동의 개인정보를 의도적으로 수집하지 않습니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-slate-800">6. 방침 변경</h2>
          <p>
            본 방침이 변경될 경우 이 페이지에 업데이트 날짜와 함께 게시합니다.
            중요한 변경 사항이 있을 경우 사이트 메인 페이지에 안내를 게시할 수 있습니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-slate-800">7. 문의</h2>
          <p>
            개인정보처리방침에 대한 문의 사항이 있으시면 문의 페이지를 통해 연락해 주세요.
          </p>
        </section>
      </div>
    </div>
  );
}
