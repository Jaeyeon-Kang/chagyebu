import type { CarModel } from "@/types";

export const CAR_MODELS: CarModel[] = [
  // ─── 현대 ──────────────────────────────────────────────────────────────────
  {
    make: "현대",
    model: "아반떼",
    years: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
    fuelTypes: ["gasoline", "hybrid"],
    displacement: 1600,
    segment: "소형",
  },
  {
    make: "현대",
    model: "소나타",
    years: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
    fuelTypes: ["gasoline", "hybrid"],
    displacement: 2000,
    segment: "중형",
  },
  {
    make: "현대",
    model: "투싼",
    years: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
    fuelTypes: ["gasoline", "diesel", "hybrid"],
    displacement: 2000,
    segment: "SUV",
  },
  {
    make: "현대",
    model: "팰리세이드",
    years: [2019, 2020, 2021, 2022, 2023, 2024],
    fuelTypes: ["gasoline", "diesel"],
    displacement: 2200,
    segment: "SUV",
  },
  {
    make: "현대",
    model: "아이오닉5",
    years: [2021, 2022, 2023, 2024],
    fuelTypes: ["ev"],
    segment: "SUV",
  },
  {
    make: "현대",
    model: "아이오닉6",
    years: [2022, 2023, 2024],
    fuelTypes: ["ev"],
    segment: "중형",
  },
  // ─── 기아 ──────────────────────────────────────────────────────────────────
  {
    make: "기아",
    model: "K3",
    years: [2018, 2019, 2020, 2021, 2022, 2023],
    fuelTypes: ["gasoline"],
    displacement: 1600,
    segment: "소형",
  },
  {
    make: "기아",
    model: "K5",
    years: [2019, 2020, 2021, 2022, 2023, 2024],
    fuelTypes: ["gasoline", "hybrid"],
    displacement: 2000,
    segment: "중형",
  },
  {
    make: "기아",
    model: "스포티지",
    years: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
    fuelTypes: ["gasoline", "diesel", "hybrid"],
    displacement: 2000,
    segment: "SUV",
  },
  {
    make: "기아",
    model: "쏘렌토",
    years: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
    fuelTypes: ["gasoline", "diesel", "hybrid"],
    displacement: 2000,
    segment: "SUV",
  },
  {
    make: "기아",
    model: "EV6",
    years: [2021, 2022, 2023, 2024],
    fuelTypes: ["ev"],
    segment: "중형",
  },
  // ─── 르노코리아 ────────────────────────────────────────────────────────────
  {
    make: "르노",
    model: "QM6",
    years: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
    fuelTypes: ["gasoline", "lpg"],
    displacement: 2000,
    segment: "SUV",
  },
  {
    make: "르노",
    model: "SM6",
    years: [2018, 2019, 2020, 2021, 2022],
    fuelTypes: ["gasoline"],
    displacement: 2000,
    segment: "중형",
  },
  // ─── 쉐보레 ────────────────────────────────────────────────────────────────
  {
    make: "쉐보레",
    model: "트레일블레이저",
    years: [2019, 2020, 2021, 2022, 2023, 2024],
    fuelTypes: ["gasoline"],
    displacement: 1400,
    segment: "SUV",
  },
  {
    make: "쉐보레",
    model: "스파크",
    years: [2018, 2019, 2020, 2021, 2022],
    fuelTypes: ["gasoline"],
    displacement: 1000,
    segment: "소형",
  },
  // ─── 수입차 ────────────────────────────────────────────────────────────────
  {
    make: "BMW",
    model: "5시리즈",
    years: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
    fuelTypes: ["gasoline", "diesel"],
    displacement: 2000,
    segment: "중형",
  },
  {
    make: "벤츠",
    model: "E클래스",
    years: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
    fuelTypes: ["gasoline", "diesel"],
    displacement: 2000,
    segment: "중형",
  },
];

export function getCarByMakeAndModel(make: string, model: string): CarModel | undefined {
  return CAR_MODELS.find((c) => c.make === make && c.model === model);
}

export const ALL_MAKES = [...new Set(CAR_MODELS.map((c) => c.make))];
