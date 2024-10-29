export enum ATTEND_STATUS {
  ATTEND = "ATTEND",
  ABSENT = "ABSENT",
  ONLINE = "ONLINE"
}

export enum VISIT_REASON {
  /** 훈련 받고 싶어서 */
  DISCIPLE_TRAINING = "DISCIPLE_TRAINING",

  /** 아는 사람 소개 */
  INTRODUCE = "INTRODUCE",

  /** 종교를 가져야 겠다는 생각에 */
  RELIGION = "RELIGION",

  /** 대학부 새생명축제(전도집회)를 계기로 */
  NEW_LIFE_FESTIVAL = "NEW_LIFE_FESTIVAL",

  /** 기타 */
  ETC = "ETC"
}

export enum BELIEVE_STATUS {
  /** 나를 구원해 주신 주님으로 믿고 있다. */
  LORD = "LORD",

  /** 믿고 싶지만 어떻게 해야 할지 모르겠다. */
  HESITANT = "HESITANT",

  /** 잘 모른다. */
  NONE = "NONE",

  /** 알고 싶지도 않고 관심도 없다. */
  NOT_INTERESTED = "NOT_INTERESTED"
}

export enum YES_NO_STATUS {
  YES = "YES",
  NO = "NO"
}

export enum DISPATCH_STATUS {
  MILITARY = "MILITARY",
  ABROAD = "ABROAD",
  MISSIONARY = "MISSIONARY",
  ETC = "ETC"
}
