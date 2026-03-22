// 차종별/연식별 권장 교체주기 데이터
// 출처: 제조사 취급설명서, 공식 서비스센터 권장 기준

export type DrivingCondition = "normal" | "severe";

export interface MaintenanceItem {
  part: string;
  normalKm?: number;       // 일반 운행 기준 km
  normalMonths?: number;   // 일반 운행 기준 개월
  severeKm?: number;       // 가혹 조건 기준 km
  severeMonths?: number;   // 가혹 조건 기준 개월
  note?: string;
}

// 가혹 조건 정의: 짧은 주행 반복, 먼지 많은 도로, 고온/저온 극단, 고속 장거리 빈번
export const SEVERE_CONDITION_EXAMPLES = [
  "도심 단거리 반복 주행 (5km 이하)",
  "혼잡 구간 잦은 정차·가속 반복",
  "강남·도심 상습 정체 구간 위주 운행",
  "험로·비포장도로 주행",
  "견인·산간지역 등 고부하 운행",
];

// 현대/기아 가솔린 공통 기준 (제조사 취급설명서 기반)
export const HYUNDAI_KIA_GASOLINE: MaintenanceItem[] = [
  {
    part: "엔진오일 (합성유)",
    normalKm: 15000,
    normalMonths: 12,
    severeKm: 7500,
    severeMonths: 6,
    note: "광유 사용 시 절반 주기 권장",
  },
  {
    part: "에어필터",
    normalKm: 40000,
    normalMonths: 24,
    severeKm: 20000,
    severeMonths: 12,
  },
  {
    part: "에어컨 필터",
    normalKm: 20000,
    normalMonths: 12,
    severeKm: 10000,
    severeMonths: 6,
  },
  {
    part: "점화플러그 (이리듐)",
    normalKm: 100000,
    normalMonths: 60,
    severeKm: 60000,
    severeMonths: 48,
  },
  {
    part: "브레이크 패드",
    normalKm: 50000,
    normalMonths: 36,
    severeKm: 30000,
    severeMonths: 24,
    note: "육안 점검 권장 (2mm 이하 교환)",
  },
  {
    part: "냉각수",
    normalKm: 100000,
    normalMonths: 60,
    severeKm: 60000,
    severeMonths: 36,
  },
  {
    part: "변속기 오일 (자동)",
    normalKm: 90000,
    normalMonths: 60,
    severeKm: 45000,
    severeMonths: 36,
  },
  {
    part: "타이어 로테이션",
    normalKm: 10000,
    normalMonths: 6,
    severeKm: 7500,
    severeMonths: 4,
  },
  {
    part: "12V 배터리",
    normalMonths: 60,
    severeMonths: 36,
    note: "무부하 전압 12.5V 이하 시 교환 검토",
  },
];

// EV 전용 (현대 아이오닉5, 기아 EV6 기준)
export const EV_MAINTENANCE: MaintenanceItem[] = [
  {
    part: "에어컨 필터",
    normalKm: 20000,
    normalMonths: 12,
    severeKm: 10000,
    severeMonths: 6,
  },
  {
    part: "브레이크 패드",
    normalKm: 80000,
    normalMonths: 48,
    severeKm: 50000,
    severeMonths: 36,
    note: "회생 제동 덕분에 내연기관 대비 교환 주기 길어짐",
  },
  {
    part: "냉각수 (열관리 시스템)",
    normalKm: 100000,
    normalMonths: 60,
    severeKm: 60000,
    severeMonths: 36,
  },
  {
    part: "12V 보조 배터리",
    normalMonths: 48,
    severeMonths: 36,
    note: "EV도 12V 보조배터리 별도 장착",
  },
  {
    part: "타이어 로테이션",
    normalKm: 10000,
    normalMonths: 6,
    severeKm: 7500,
    severeMonths: 4,
    note: "EV는 토크 특성상 앞뒤 마모 편차 클 수 있음",
  },
  {
    part: "고전압 배터리 점검",
    normalKm: 40000,
    normalMonths: 24,
    note: "BMS 데이터 확인, 냉각 라인 점검",
  },
  {
    part: "브레이크액",
    normalMonths: 24,
    severeMonths: 12,
  },
];

export const UPDATED_AT = "2026-03-22";
