import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "소개",
  description: "차계부는 자동차 비용을 미리 파악할 수 있는 계산기와 가이드 모음입니다. 공공 데이터 기반으로 취등록세, 보험, 연료비, 소모품 비용을 계산합니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-10">
      <header className="space-y-2">
        <p className="text-sm text-blue-600 font-medium">소개</p>
        <h1 className="text-2xl font-bold text-slate-900">차계부 소개</h1>
      </header>

      <div className="space-y-8 text-[15px] text-slate-600 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-800">차계부란?</h2>
          <p>
            차계부는 자동차를 사고, 타고, 고칠 때 드는 비용을 미리 파악할 수 있는 무료 계산기와 가이드 모음입니다.
            "이 차 사면 한 달에 얼마나 드나", "브레이크패드 지금 갈아야 하나", "전기차가 진짜 더 저렴한가"처럼
            지갑과 직결된 질문에 숫자로 답합니다.
          </p>
          <p>
            자동차를 처음 사는 사회 초년생부터, 유지비를 줄이고 싶은 기존 차주까지 —
            비용을 미리 알면 과다 청구를 걸러내고, 합리적인 결정을 내릴 수 있습니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-800">왜 만들었나요?</h2>
          <p>
            첫차를 살 때 차값만 보고 예산을 잡았다가 취등록세, 보험료, 소모품 교체비에 당황한 경험이 출발점이었습니다.
            인터넷에서 자동차 비용 정보를 찾으면 광고성 글이 많고, 실제 수치를 확인하려면 여러 사이트를 돌아다녀야 했습니다.
          </p>
          <p>
            공공 기관이 공개한 데이터를 한곳에 모아 누구나 쉽게 계산할 수 있는 도구를 만들자는 생각으로
            차계부를 시작했습니다. 광고 없는 깔끔한 도구를 지향하며, 사용자에게 실질적으로 도움이 되는 정보만
            제공합니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">주요 기능</h2>
          <div className="grid gap-4">
            <div className="bg-slate-50 rounded-xl p-4 space-y-1">
              <h3 className="font-semibold text-slate-800">🚗 비용 계산기</h3>
              <p>
                <Link href="/calculator/first-car-budget" className="text-blue-600 hover:underline">첫차 총예산 계산기</Link>로 취등록세·보험·연료비·소모품까지 첫해 실지출을 확인하고,{" "}
                <Link href="/calculator/fuel-vs-ev" className="text-blue-600 hover:underline">내연기관 vs 전기차 유지비 비교</Link>,{" "}
                <Link href="/calculator/new-vs-used" className="text-blue-600 hover:underline">신차 vs 중고차 5년 총비용 비교</Link>까지 제공합니다.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 space-y-1">
              <h3 className="font-semibold text-slate-800">📖 가이드</h3>
              <p>
                엔진오일 교체주기, 브레이크패드 교체 신호, 타이어 교체시기, 자동차세 계산법 등{" "}
                <strong>19편의 정비·세금·보험 가이드</strong>를 제공합니다.
                각 가이드는 제조사 매뉴얼과 공공 통계를 기반으로 작성되었습니다.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 space-y-1">
              <h3 className="font-semibold text-slate-800">📰 블로그</h3>
              <p>
                유가 동향, 보험료 인상, 세금 정책 변경 등 자동차 비용에 영향을 주는 최신 소식을
                분석하여 정리합니다. 단순 뉴스 전달이 아닌, 운전자가 실제로 대응할 수 있는 방법까지 포함합니다.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-800">어떤 데이터를 사용하나요?</h2>
          <p>
            차계부의 모든 계산과 가이드는 아래 공공 데이터를 기반으로 합니다:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>세금·등록</strong>: 지방세법 취득세율(7%), 국토교통부 공채할인율</li>
            <li><strong>연료 단가</strong>: 한국석유공사 오피넷 전국 평균 유가 (월 1~2회 업데이트)</li>
            <li><strong>전기차 충전</strong>: 환경부·한국전력 공용 충전 요금</li>
            <li><strong>연비</strong>: 국토교통부 공인 복합연비 (차종별 평균)</li>
            <li><strong>보험·정비</strong>: 보험개발원 통계, 제조사 매뉴얼 권장 주기</li>
            <li><strong>자동차세</strong>: 지방세법 배기량별 세율, 연식 경감률</li>
          </ul>
          <p>
            실제 비용은 차종·지역·운행 조건·정비소에 따라 달라질 수 있습니다.
            중요한 정비 결정은 전문 정비사에게 직접 확인하세요.
            전체 출처는 <Link href="/sources" className="text-blue-600 hover:underline">출처 페이지</Link>에서 확인할 수 있습니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-800">수치는 얼마나 자주 업데이트하나요?</h2>
          <p>
            연료 단가, 충전 요금, 세금 기준처럼 변동이 잦은 수치는 <strong>월 1~2회 검토 후 반영</strong>합니다.
            각 페이지 하단에 마지막 업데이트 날짜를 표시해두었습니다.
          </p>
          <p>
            데이터 오류를 발견하셨거나 추가해야 할 정보가 있다면{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">문의 페이지</Link>를 통해 알려주세요.
            빠르게 확인 후 반영하겠습니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-800">운영 원칙</h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li><strong>정확성 우선</strong>: 공공 데이터와 공식 출처만 사용합니다. 출처가 불분명한 정보는 싣지 않습니다.</li>
            <li><strong>광고와 콘텐츠 분리</strong>: 광고를 위해 수치를 왜곡하거나 특정 제품을 추천하지 않습니다.</li>
            <li><strong>투명한 한계 공지</strong>: 계산 결과는 추정치임을 항상 명시합니다. 실제와 다를 수 있는 부분을 숨기지 않습니다.</li>
            <li><strong>사용자 중심</strong>: 사이트 사용에 회원 가입이 필요 없으며, 개인 정보를 수집하지 않습니다.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
