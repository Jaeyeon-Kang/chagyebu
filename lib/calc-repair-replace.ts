import type {
  RepairOrReplaceInput,
  RepairOrReplaceResult,
  RepairOrReplaceDecision,
} from "@/types";

// 수리비/차량가치 비율이 이 기준 이상이면 교체 고려
const REPLACE_THRESHOLD_RATIO = 0.5; // 50%
const REVIEW_THRESHOLD_RATIO = 0.3;  // 30%

export function calcRepairOrReplace(
  input: RepairOrReplaceInput
): RepairOrReplaceResult {
  const { repairCost, vehicleCurrentValue, expectedCostNext12Months, vehicleAge } =
    input;

  const repairRatio =
    vehicleCurrentValue > 0 ? repairCost / vehicleCurrentValue : 1;

  const totalExpectedCost = repairCost + expectedCostNext12Months;
  const totalExpectedRatio =
    vehicleCurrentValue > 0 ? totalExpectedCost / vehicleCurrentValue : 1;

  const reasons: string[] = [];
  let decision: RepairOrReplaceDecision;

  if (repairRatio >= REPLACE_THRESHOLD_RATIO || totalExpectedRatio >= 0.7) {
    decision = "교체 고려";
    reasons.push(
      `수리비가 현재 차량 가치의 ${Math.round(repairRatio * 100)}%에 해당합니다.`
    );
    if (totalExpectedRatio >= 0.7) {
      reasons.push(
        `수리비 + 향후 12개월 예상 비용이 차량 가치의 ${Math.round(totalExpectedRatio * 100)}%로, 교체가 경제적으로 유리할 수 있습니다.`
      );
    }
    if (vehicleAge >= 10) {
      reasons.push(
        `차령 ${vehicleAge}년으로, 추가 수리 필요성이 높아질 수 있습니다.`
      );
    }
  } else if (repairRatio >= REVIEW_THRESHOLD_RATIO) {
    decision = "검토 필요";
    reasons.push(
      `수리비가 현재 차량 가치의 ${Math.round(repairRatio * 100)}%입니다. 추가 수리 가능성을 고려해 신중히 판단하세요.`
    );
    if (vehicleAge >= 7) {
      reasons.push(
        `차령 ${vehicleAge}년으로, 다른 부품의 노후화도 함께 점검하는 것이 좋습니다.`
      );
    }
  } else {
    decision = "수리 권장";
    reasons.push(
      `수리비가 현재 차량 가치의 ${Math.round(repairRatio * 100)}%로, 수리가 경제적입니다.`
    );
    if (vehicleAge < 5) {
      reasons.push(`차령 ${vehicleAge}년으로 아직 주요 부품 노후화 전입니다.`);
    }
    if (expectedCostNext12Months < repairCost * 0.3) {
      reasons.push(
        `향후 12개월 예상 추가 비용이 낮아, 현재 수리 후 안정적 운행이 가능할 것으로 예상됩니다.`
      );
    }
  }

  reasons.push(
    "이 판단은 경제성 지표 기반입니다. 차량 상태와 안전성은 반드시 정비사가 직접 점검해야 합니다."
  );

  return {
    decision,
    repairRatio,
    reasons,
    updatedAt: "2026-03-22",
  };
}
