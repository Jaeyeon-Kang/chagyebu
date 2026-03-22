// ─── 차량 관련 타입 ────────────────────────────────────────────────────────────

export type FuelType = "gasoline" | "diesel" | "hybrid" | "ev" | "lpg";

export interface CarModel {
  make: string;         // 브랜드 (현대, 기아 등)
  model: string;        // 모델명 (아반떼, K5 등)
  years: number[];      // 지원 연식
  fuelTypes: FuelType[];
  displacement?: number; // 배기량 (cc), EV는 없음
  segment: "소형" | "중형" | "대형" | "SUV" | "승합";
}

// ─── 비용 범위 타입 ───────────────────────────────────────────────────────────

export interface CostRange {
  min: number;
  max: number;
  unit: "원" | "원/월" | "원/년" | "원/km";
}

export interface PartCost {
  partName: string;
  laborCost: CostRange;    // 공임
  partsCost: CostRange;    // 부품비
  totalCost: CostRange;    // 합계
  intervalKm?: number;     // 권장 교체 주기 (km)
  intervalMonth?: number;  // 권장 교체 주기 (개월)
  note?: string;
}

// ─── 연간 유지비 계산기 ────────────────────────────────────────────────────────

export interface AnnualCostInput {
  annualMileageKm: number;      // 연간 주행거리 (km)
  fuelType: FuelType;
  vehicleYear: number;          // 차량 연식
  region: "서울" | "경기" | "기타";
  fuelPricePerLiter?: number;   // 연료 단가 (사용자 입력 가능)
  fuelEfficiency?: number;      // 연비 (km/L 또는 km/kWh)
}

export interface AnnualCostBreakdown {
  fuel: CostRange;
  insurance: CostRange;
  tax: CostRange;
  consumables: CostRange;       // 소모품 (오일, 타이어, 브레이크패드 등)
  total: CostRange;
  perMonth: CostRange;
  assumptions: string[];        // 계산 가정값 목록
  updatedAt: string;
}

// ─── EV 충전비 계산기 ──────────────────────────────────────────────────────────

export interface EvChargingInput {
  monthlyMileageKm: number;
  efficiency: number;             // km/kWh
  homeChargeRatio: number;        // 집충전 비율 (0~1)
  fastChargeRatio: number;        // 급속충전 비율 (0~1)
  slowChargeAtPublicRatio: number; // 공용 완속 비율 (0~1)
}

export interface EvChargingResult {
  monthlyChargeCost: CostRange;
  vsGasoline: CostRange;          // 휘발유 대비 절감액
  assumptions: string[];
  updatedAt: string;
}

// ─── 수리 vs 교체 판단 ─────────────────────────────────────────────────────────

export interface RepairOrReplaceInput {
  repairCost: number;             // 현재 수리비
  vehicleCurrentValue: number;    // 차량 현재 시장가
  expectedCostNext12Months: number; // 향후 12개월 예상 추가 비용
  vehicleAge: number;             // 차령 (년)
}

export type RepairOrReplaceDecision = "수리 권장" | "교체 고려" | "검토 필요";

export interface RepairOrReplaceResult {
  decision: RepairOrReplaceDecision;
  repairRatio: number;            // 수리비/차량가치 비율
  reasons: string[];
  updatedAt: string;
}

// ─── 가이드/콘텐츠 타입 ────────────────────────────────────────────────────────

export interface GuideContent {
  slug: string;
  title: string;
  description: string;
  category: "정비비" | "교체주기" | "EV" | "총소유비" | "증상";
  relatedCalculator?: string;    // 관련 계산기 경로
  relatedGuides: string[];       // 관련 가이드 slug 목록
  updatedAt: string;
}

export interface NextQuestion {
  text: string;
  href: string;
  type: "calculator" | "guide" | "compare";
}
