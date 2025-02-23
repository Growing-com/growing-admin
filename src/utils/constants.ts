import { tTrainingType } from "api/training/type";

export type tTrainingMainTitle = {
  label: string;
  value: tTrainingType;
};

export const DISCIPLE: tTrainingMainTitle[] = [
  { label: "제자학교A", value: "DISCIPLE_SCHOOL_A" },
  { label: "제자학교B", value: "DISCIPLE_SCHOOL_B" },
  { label: "제자반", value: "DISCIPLE" }
];

export const BAPTISM: tTrainingMainTitle[] = [
  { label: "유아 세례", value: "INFANT_BAPTISM" },
  { label: "성인 세례", value: "NORMAL_BAPTISM" },
  { label: "군대 세례", value: "MILITARY_BAPTISM" }
];

export const TRAINING: tTrainingMainTitle[] = [
  { label: "입교", value: "CONFIRMATION" },
  { label: "학습", value: "PRE_BAPTISM" }
];

export const TRAINING_MAIN_TITLE: tTrainingMainTitle[] = [
  ...DISCIPLE,
  ...BAPTISM,
  ...TRAINING
];

// const EMPTY_FILTER = [
//   {
//     text: "비어 있음",
//     value: ""
//   }
// ];

// export const DISCIPLE_SCHOOL_FILTER = [
//   ...EMPTY_FILTER,
//   {
//     text: "제자 학교 A",
//     value: "DISCIPLE_SCHOOL_A"
//   },
//   {
//     text: "제자 학교 B",
//     value: "DISCIPLE_SCHOOL_B"
//   }
// ];

// export const DISCIPLE_FILTER = [
//   ...EMPTY_FILTER,
//   {
//     text: "제자 훈련",
//     value: "DISCIPLE"
//   }
// ];

// export const BAPTISM_FILTER = [
//   ...EMPTY_FILTER,
//   { text: "유아 세례", value: "INFANT_BAPTISM" },
//   { text: "성인 세례", value: "NORMAL_BAPTISM" },
//   { text: "군대 세례", value: "MILITARY_BAPTISM" }
// ];

// export const CONFIRMATION_FILTER = [
//   ...EMPTY_FILTER,
//   { text: "입교", value: "CONFIRMATION" }
// ];

// export const PRE_BAPTISM_FILTER = [
//   ...EMPTY_FILTER,
//   { text: "학습", value: "PRE_BAPTISM" }
// ];

export const DUTY_FILTER = [
  {
    value: "PASTOR",
    text: "교역자"
  },
  {
    value: "GANSA",
    text: "간사"
  },
  {
    value: "CODY",
    text: "코디"
  },
  {
    value: "LEADER",
    text: "리더"
  },
  {
    value: "MEMBER",
    text: "조원"
  },
  {
    value: "NEW_COMER",
    text: "새가족"
  }
];
