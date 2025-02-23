import { tSex } from "api/account/types";

export type tTrainingType =
  /* "제자학교A" */
  | "DISCIPLE_SCHOOL_A"
  /* "제자학교B" */
  | "DISCIPLE_SCHOOL_B"
  /* 제자반 */
  | "DISCIPLE"
  /* "유아 세례" */
  | "INFANT_BAPTISM"
  /* "성인 세례" */
  | "NORMAL_BAPTISM"
  /* "입교" */
  | "CONFIRMATION"
  /* "군대 세례" */
  | "MILITARY_BAPTISM"
  /* "학습" */
  | "PRE_BAPTISM";

export type tTrainingRosterMember = {
  userId: number;
  name: string;
  sex: tSex;
  grade: number;
  phoneNumber: string;
};

export type tTrainingDetail = {
  id: number;
  type: tTrainingType;
  name: string;
  etc: string;
  startDate: string;
  endDate: string;
  members: tTrainingRosterMember[];
};
