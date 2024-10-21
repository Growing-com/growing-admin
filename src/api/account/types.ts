
/**
 * @descriptio 성
 * MALE : 남
 * FEMALE : 여
 */
export type tSex = "MALE" | "FEMALE";

/**
 * * @descriptio 직분
 * PASTOR: 교역자
 * GANSA: 간사
 * LEADER: 리더
 * MEMBER: 조원
 * NEW_COMER: 새가족
 */
export type tDuty =
  | "PASTOR"
  | "GANSA"
  | "LEADER"
  | "MEMBER"
  | "NEW_COMER";

/**
 * @description 역할
 * ADMIN: 관리자
 * MANAGER: 매니저
 * NORMAL: 조원
 */
export type tRole = "ADMIN" | "MANAGER" | "NORMAL";

export type tAccount = {
  /** @description 유저 아이디 @example 1 */
  userId: number;
  /** @description 이름  @example   "윤동건" */
  name: string;
  /** @description 성 @example   "MALE" */
  sex: tSex;
  /** @description 학년  @example  9 */
  grade: number;
  /** @description 휴대폰 번호  @example  "01011111111" */
  phoneNumber: string;
  /** @description 생년월일  @example  "1996-10-16" */
  birth?: string;
  
  // updatedBy: string;
  // updatedAt: string;
};

export type tLoginParam = {
    username: string;
    password: string;
  };

export type tUserAccount = {
  /** @description 유저 아이디 @example 1 */
  userId: number;
  /** 직분 */ 
  // duty: tDuty;
  /** 역할 */ 
  role: tRole;
  /** @description 이름  @example   "윤동건", */
  name: string;
}