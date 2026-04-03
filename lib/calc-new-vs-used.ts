const fmt = (n: number) => n.toLocaleString("ko-KR");

export interface NewVsUsedResult {
  newTotalCost: number;
  usedTotalCost: number;
  newDepreciation: number;
  usedDepreciation: number;
  newTax: number;
  usedTax: number;
  newInsurance: number;
  usedInsurance: number;
  newMaintenance: number;
  usedMaintenance: number;
  winner: "신차" | "중고차" | "비슷함";
  diff: number;
  assumptions: string[];
}

export function calcDepreciation(price: number, years: number, isNew: boolean): number {
  if (isNew) {
    let val = price * 0.85;
    for (let i = 1; i < years; i++) val *= 0.91;
    return price - val;
  } else {
    let val = price;
    for (let i = 0; i < years; i++) val *= 0.90;
    return price - val;
  }
}

export function calcNewVsUsed(
  newPrice: number,
  usedPrice: number,
  usedAge: number,
  holdYears: number,
): NewVsUsedResult {
  const newDepreciation = calcDepreciation(newPrice, holdYears, true);
  const usedDepreciation = calcDepreciation(usedPrice, holdYears, false);
  const newTax = Math.round(newPrice * 0.07);
  const newInsurance = 900000 * holdYears;
  const newMaintenance = 500000 * holdYears;
  const usedTax = Math.round(usedPrice * 0.07);
  const usedInsurance = 650000 * holdYears;
  const usedMaintenance = (500000 + usedAge * 80000) * holdYears;
  const newTotalCost = newDepreciation + newTax + newInsurance + newMaintenance;
  const usedTotalCost = usedDepreciation + usedTax + usedInsurance + usedMaintenance;
  const diff = Math.abs(newTotalCost - usedTotalCost);
  const threshold = Math.min(newTotalCost, usedTotalCost) * 0.05;
  let winner: NewVsUsedResult["winner"];
  if (diff < threshold) winner = "비슷함";
  else if (newTotalCost < usedTotalCost) winner = "신차";
  else winner = "중고차";
  return {
    newTotalCost, usedTotalCost, newDepreciation, usedDepreciation,
    newTax, usedTax, newInsurance, usedInsurance, newMaintenance, usedMaintenance,
    winner, diff,
    assumptions: [
      `신차 ${holdYears}년 보유 기준 감가: 첫해 15%, 이후 연 9%`,
      `중고차(${usedAge}년식) ${holdYears}년 보유 기준 감가: 연 10%`,
      `보험료: 신차 연 90만원, 중고차 연 65만원 추정`,
      `정비비: 신차 연 50만원, 중고차 차령에 따라 연 ${fmt(500000 + usedAge * 80000)}원 추정`,
      "취득세: 비영업용 기준 7% 적용",
      "실제 감가는 차종·주행거리·사고이력에 따라 다릅니다",
    ],
  };
}
