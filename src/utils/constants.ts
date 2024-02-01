import { tTrainingType } from "api/training/type";

export type tTrainingMainTitle = {
  label: string;
  value: tTrainingType;
};

export const TRAINING_MAIN_TITLE: tTrainingMainTitle[] = [
  { label: "제자학교A", value: "DISCIPLE_SCHOOL_A" },
  { label: "제자학교B", value: "DISCIPLE_SCHOOL_B" },
  { label: "제자반", value: "DISCIPLE" },
  { label: "유아 세례", value: "INFANT_BAPTISM" },
  { label: "성인 세례", value: "NORMAL_BAPTISM" },
  { label: "입교", value: "CONFIRMATION" },
  { label: "군대 세례", value: "MILITARY_BAPTISM" },
  { label: "학습", value: "PRE_BAPTISM" }
];
