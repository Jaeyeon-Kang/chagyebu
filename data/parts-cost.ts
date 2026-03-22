import type { PartCost } from "@/types";

// 2026년 3월 기준 국내 평균 비용 범위 (부품비 + 공임 분리)
// 출처: 제조사 권장가, 공식 서비스센터 공지가, 자체 취합 데이터

export const PARTS_COST: Record<string, PartCost> = {
  engineOil: {
    partName: "엔진오일 교환",
    laborCost: { min: 10000, max: 20000, unit: "원" },
    partsCost: { min: 25000, max: 80000, unit: "원" },
    totalCost: { min: 35000, max: 100000, unit: "원" },
    intervalKm: 10000,
    intervalMonth: 12,
    note: "합성유 기준 상단, 광유 기준 하단. 터보 차량은 5,000km마다 권장.",
  },
  brakepad: {
    partName: "브레이크패드 교환 (앞바퀴 1쌍)",
    laborCost: { min: 30000, max: 60000, unit: "원" },
    partsCost: { min: 40000, max: 150000, unit: "원" },
    totalCost: { min: 70000, max: 210000, unit: "원" },
    intervalKm: 40000,
    note: "운전 스타일·차종에 따라 편차 큼. 디스크 동시 교환 시 추가 비용 발생.",
  },
  brakedisc: {
    partName: "브레이크 디스크 교환 (앞바퀴 1쌍)",
    laborCost: { min: 50000, max: 100000, unit: "원" },
    partsCost: { min: 100000, max: 400000, unit: "원" },
    totalCost: { min: 150000, max: 500000, unit: "원" },
    intervalKm: 80000,
    note: "패드와 함께 교환 권장 시 공임 절감 가능.",
  },
  tire: {
    partName: "타이어 교환 (1개)",
    laborCost: { min: 10000, max: 20000, unit: "원" },
    partsCost: { min: 80000, max: 250000, unit: "원" },
    totalCost: { min: 90000, max: 270000, unit: "원" },
    intervalKm: 50000,
    note: "차종·사이즈·브랜드에 따라 편차 큼. 휠 얼라인먼트 별도 (3~5만원).",
  },
  battery12v: {
    partName: "12V 배터리 교환",
    laborCost: { min: 10000, max: 20000, unit: "원" },
    partsCost: { min: 80000, max: 200000, unit: "원" },
    totalCost: { min: 90000, max: 220000, unit: "원" },
    intervalKm: undefined,
    intervalMonth: 48,
    note: "주로 3~5년 주기 교환. EV 고전압 배터리와 별개.",
  },
  airFilter: {
    partName: "에어필터 교환",
    laborCost: { min: 5000, max: 15000, unit: "원" },
    partsCost: { min: 15000, max: 40000, unit: "원" },
    totalCost: { min: 20000, max: 55000, unit: "원" },
    intervalKm: 20000,
    intervalMonth: 12,
    note: "도심 주행 비중 높으면 더 자주 교환 권장.",
  },
  cabinFilter: {
    partName: "에어컨 필터 교환",
    laborCost: { min: 5000, max: 15000, unit: "원" },
    partsCost: { min: 10000, max: 35000, unit: "원" },
    totalCost: { min: 15000, max: 50000, unit: "원" },
    intervalKm: 15000,
    intervalMonth: 12,
    note: "봄·가을 교환 권장.",
  },
  sparkPlug: {
    partName: "점화플러그 교환",
    laborCost: { min: 20000, max: 50000, unit: "원" },
    partsCost: { min: 30000, max: 150000, unit: "원" },
    totalCost: { min: 50000, max: 200000, unit: "원" },
    intervalKm: 60000,
    note: "이리듐 기준 상단, 일반 기준 하단.",
  },
  coolant: {
    partName: "냉각수 교환",
    laborCost: { min: 15000, max: 30000, unit: "원" },
    partsCost: { min: 20000, max: 50000, unit: "원" },
    totalCost: { min: 35000, max: 80000, unit: "원" },
    intervalKm: 60000,
    intervalMonth: 24,
  },
  transmission: {
    partName: "변속기 오일 교환 (자동)",
    laborCost: { min: 20000, max: 50000, unit: "원" },
    partsCost: { min: 50000, max: 150000, unit: "원" },
    totalCost: { min: 70000, max: 200000, unit: "원" },
    intervalKm: 60000,
    note: "제조사에 따라 '무교환' 정책도 있으나, 10만km 이상 시 점검 권장.",
  },
};

export const PARTS_LIST = Object.entries(PARTS_COST).map(([key, val]) => ({
  key,
  ...val,
}));

export const UPDATED_AT = "2026-03-22";
