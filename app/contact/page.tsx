import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "문의하기",
  description: "계산 오류 제보, 기능 제안, 데이터 수정 요청 등 차계부에 대한 모든 문의를 남겨주세요. 보통 1~2영업일 내에 답변드립니다.",
  alternates: {
    canonical: "https://chagyebu.co.kr/contact",
  },
};

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdyPTKhyb3auX4zUivjvA8c-T5sXbeil_2q-V005XUiQYkDDA/viewform?embedded=true";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-blue-600 font-medium">문의</p>
        <h1 className="text-2xl font-bold text-slate-900">문의하기</h1>
        <p className="text-[15px] text-slate-600 leading-relaxed">
          차계부를 이용하면서 궁금한 점이나 불편한 점이 있으시면 아래 양식을 통해 알려주세요.
          계산 오류 제보, 데이터 수정 요청, 새로운 기능 제안, 기타 문의 모두 환영합니다.
          보통 <strong>1~2영업일 내</strong>에 확인 후 답변드리거나 사이트에 반영합니다.
        </p>
      </header>

      {/* 문의 유형 안내 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div className="bg-slate-50 rounded-xl p-5 space-y-2">
          <div className="text-lg">🐛</div>
          <div className="font-semibold text-slate-900">오류 제보</div>
          <p className="text-slate-500 leading-relaxed">
            계산 결과가 실제와 다르거나 데이터가 오래된 경우 알려주세요.
            어떤 계산기에서 어떤 값을 입력했는지 함께 알려주시면 더 빠르게 수정할 수 있습니다.
          </p>
        </div>
        <div className="bg-slate-50 rounded-xl p-5 space-y-2">
          <div className="text-lg">💡</div>
          <div className="font-semibold text-slate-900">기능 제안</div>
          <p className="text-slate-500 leading-relaxed">
            필요한 계산기나 가이드 주제, UI 개선 아이디어가 있으시면 제안해 주세요.
            실제로 사용자 피드백을 반영해 가이드를 추가하고 계산기를 개선해왔습니다.
          </p>
        </div>
        <div className="bg-slate-50 rounded-xl p-5 space-y-2">
          <div className="text-lg">📬</div>
          <div className="font-semibold text-slate-900">기타 문의</div>
          <p className="text-slate-500 leading-relaxed">
            데이터 출처 확인, 계산 방법 질문, 제휴·협업 제안 등 위 항목에 해당하지 않는 문의도
            편하게 남겨주세요.
          </p>
        </div>
      </div>

      {/* Google Form */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
        <iframe
          src={GOOGLE_FORM_URL}
          width="100%"
          height="700"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="차계부 문의하기"
          className="block"
        >
          Loading…
        </iframe>
      </div>

      {/* 자주 묻는 질문 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">자주 묻는 질문</h2>
        <div className="space-y-3">
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
            <p className="text-sm font-semibold text-slate-800">Q. 답변은 얼마나 걸리나요?</p>
            <p className="text-[15px] text-slate-600 leading-relaxed">
              보통 1~2영업일 내에 확인합니다. 단순 오류 수정은 확인 즉시 사이트에 반영하며,
              기능 제안은 검토 후 업데이트 기록 페이지에 반영 여부를 게시합니다.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
            <p className="text-sm font-semibold text-slate-800">Q. 계산 결과가 실제와 다른 것 같은데, 어떤 정보를 알려주면 되나요?</p>
            <p className="text-[15px] text-slate-600 leading-relaxed">
              사용한 계산기 이름, 입력한 값(차량 가격, 주행거리 등), 예상과 다른 항목, 그리고
              실제 금액(영수증, 견적서 등)을 함께 알려주시면 원인을 빠르게 파악할 수 있습니다.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
            <p className="text-sm font-semibold text-slate-800">Q. 지금까지 사용자 피드백으로 개선된 사항이 있나요?</p>
            <p className="text-[15px] text-slate-600 leading-relaxed">
              네, 실제로 피드백을 통해 다양한 개선이 이루어졌습니다. 등록 채권 비용 계산 방식 수정,
              마일리지 특약 할인율 정정, 자동차세 세율 오류 수정, 가이드 수치 오류 6건 수정 등이
              사용자 제보로 반영된 사례입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 안내 사항 */}
      <div className="border-t border-slate-200 pt-6 text-xs text-slate-400 leading-relaxed space-y-1">
        <p>
          문의 내용은 서비스 개선 목적으로만 사용되며, 제3자에게 공유되지 않습니다.
          입력하신 이메일 주소는 답변 전달 용도로만 사용됩니다.
        </p>
        <p>
          개인정보처리방침은 <a href="/privacy" className="text-blue-500 hover:underline">여기</a>에서 확인할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
