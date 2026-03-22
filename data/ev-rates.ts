// EV 충전 요금 기준 (2026년 3월 기준 한국전력 공시 요금 참고)
// 출처: 한국전력공사, 환경부 전기차 충전 인프라 정보 시스템

export const EV_CHARGE_RATES = {
  // 집충전 (완속, 주택용 전기요금 기준 - 심야 할인 미적용 평균)
  homeSlowKwh: 120,        // 원/kWh (주택용 기본 구간 기준)
  homeSlowNightKwh: 73,    // 원/kWh (심야 시간대 적용 시)

  // 공용 완속 충전 (환경부 기준)
  publicSlowKwh: 255,      // 원/kWh

  // 급속 충전 (50kW급, 환경부 기준)
  publicFastKwh: 347,      // 원/kWh

  // 급속 충전 (100kW급, 민간 사업자 기준 평균)
  privateFastKwh: 420,     // 원/kWh

  updatedAt: "2026-03-22",
  note: "요금은 공시 기준으로 실제 청구액과 다를 수 있습니다. 회원 할인, 구독 플랜에 따라 차이 발생.",
};

// 휘발유 비교 기준 (한국석유공사 오피넷 참고)
export const GASOLINE_REFERENCE = {
  pricePerLiter: 1680,     // 원/L (2026년 3월 전국 평균)
  efficiencyKmPerLiter: 12, // km/L (중형 세단 기준)
  updatedAt: "2026-03-22",
};

// 대표 EV 효율 (공인 기준)
export const EV_EFFICIENCY: Record<string, number> = {
  "아이오닉5": 4.5,   // km/kWh (롱레인지 기준)
  "아이오닉6": 5.1,
  "EV6": 4.3,
  "기타": 4.0,        // 기본값
};

export const UPDATED_AT = "2026-03-22";
