export const STATUS = {
  gansa: "gansa",
  codi: "codi",
  leader: "leader",
  member: "member",
  new_com: "new_com"
};

export const ROLE = {
  CODI: "codi",
  MANAGER: "manager"
};

export const accountDumpData = [
  {
    id: 1,
    name: "이종민",
    age: 10,
    gender: "남",
    status: STATUS.member,
    leaderId: 3,
    leader: "곽민섭",
    phoneNumber: "010-1234-5678"
  },
  {
    id: 2,
    name: "아이유",
    age: 10,
    gender: "여",
    status: STATUS.new_com,
    leaderId: 3,
    leader: "곽민섭",
    phoneNumber: "010-1234-5678"
  },
  {
    id: 3,
    name: "곽민섭",
    age: 11,
    gender: "남",
    status: STATUS.codi,
    role: ROLE.CODI,
    leaderId: 6,
    leader: "이순종",
    phoneNumber: "010-1234-5678"
  },
  {
    id: 4,
    name: "이요한",
    age: 11,
    gender: "남",
    status: STATUS.codi,
    role: ROLE.CODI,
    leaderId: 6,
    leader: "이순종",
    phoneNumber: "010-1234-5678"
  },
  {
    id: 5,
    name: "우상욱",
    age: 8,
    gender: "남",
    status: STATUS.leader,
    leaderId: 4,
    leader: "이요한",
    phoneNumber: "010-1234-5678"
  },
  {
    id: 6,
    name: "이순종",
    age: 12,
    gender: "남",
    status: STATUS.gansa,
    role: ROLE.MANAGER,
    phoneNumber: "010-1234-5678"
  }
];
