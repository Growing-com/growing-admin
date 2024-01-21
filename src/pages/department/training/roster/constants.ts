
export type tTrainingList = { key: string, title: string}

export type tTrainingMainTitle = {
    title: string,
    trainList: tTrainingList[]
}

export const TRAINING_MAIN_TITLE: tTrainingMainTitle[] = [
    {title:"제자학교", trainList: [
      {key:"DISCIPLE_SCHOOL_A", title:"제자학교A"},
      {key:"DISCIPLE_SCHOOL_B", title:"제자학교B"}
    ]},
    {title:"제자훈련", trainList: []},
    {title:"세례", trainList: [
      {key:"INFANT_BAPTISM", title: "유아 세례"},
      {key:"NORMAL_BAPTISM", title: "성인 세례"},
      {key:"CONFIRMATION", title: "입교"},
      {key:"MILITARY_BAPTISM", title: "군대 세례"},
      {key:"PRE_BAPTISM", title: "학습"},
    ]},
]


