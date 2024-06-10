import GRText from "@component/atom/text/GRText";
import { ColumnType } from "antd/es/table";
import { tTermNewFamily } from "api/term/types";
import { DUTY_NAME, SEX_NAME } from "config/const";
import dayjs from "dayjs";
import { dateSorter, koreanSorter } from "utils/sorter";

export const INFO_COLUMNS: ColumnType<tTermNewFamily>[] = [
  {
    title: "이름",
    dataIndex: "name",
    key: "name",
    align: "center",
    width: "5rem"
  },
  {
    title: "학년",
    dataIndex: "grade",
    key: "grade",
    align: "center",
    width: "5rem"
  },
  {
    title: "성별",
    dataIndex: "sex",
    key: "sex",
    align: "center",
    width: "5rem",
    render: (_, item) => {
      if (!item?.sex) return;
      return <GRText>{SEX_NAME[item?.sex]}</GRText>;
    }
  },
  {
    title: "생년월일",
    key: "birth",
    dataIndex: "birth",
    align: "center",
    width: "8rem",
    render: (_, record) => {
      return record?.birth !== null && record?.birth !== "1970-01-01"
        ? record?.birth
        : "-";
    }
  },
  {
    title: "직분",
    dataIndex: "duty",
    key: "duty",
    align: "center",
    width: "10rem",
    render: (_, item) => {
      if (!item?.duty) return;
      return DUTY_NAME[item?.duty];
    }
  },
  {
    title: "전화번호",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    align: "center",
    width: "10rem"
  }
];

export const ATTENDANCE_COLUMNS: ColumnType<tTermNewFamily>[] = [
  {
    title: "이름",
    dataIndex: "name",
    key: "name",
    align: "center",
    width: "5rem"
  }
];

export const PROMOTE_COLUMNS: ColumnType<tTermNewFamily>[] = [
  {
    title: "이름",
    dataIndex: "name",
    key: "name",
    align: "center",
    width: "4rem"
  },
  {
    title: "학년",
    dataIndex: "grade",
    key: "grade",
    align: "center",
    width: "4rem"
  },
  {
    title: "성별",
    dataIndex: "sex",
    key: "sex",
    align: "center",
    width: "4rem",
    render: (_, item) => {
      if (!item?.sex) return;
      return <GRText>{SEX_NAME[item?.sex]}</GRText>;
    }
  },
  {
    title: "생년월일",
    key: "birth",
    dataIndex: "birth",
    align: "center",
    width: "5rem",
    render: (_, record) => {
      return record?.birth !== null && record?.birth !== "1970-01-01"
        ? record?.birth
        : "-";
    }
  },
  {
    title: "방문일",
    dataIndex: "visitDate",
    key: "visitDate",
    align: "center",
    width: "5rem",
    sorter: (valueA, valueB) =>
      dateSorter(dayjs(valueA.visitDate), dayjs(valueB.visitDate)),
    render: (_, record) => {
      return record?.visitDate !== "1970-01-01" ? record?.visitDate : "-";
    }
  },
  {
    title: "새가족 순장",
    dataIndex: "newTeamLeaderName",
    key: "newTeamLeaderName",
    align: "center",
    width: "5rem"
  },
  {
    title: "등반 순장",
    align: "center",
    dataIndex: "firstPlantLeaderName",
    width: "8rem",
    sorter: (a, b) =>
      koreanSorter(a.firstPlantLeaderName, b.firstPlantLeaderName)
  },
  {
    title: "등반일",
    dataIndex: "lineupDate",
    key: "lineupDate",
    align: "center",
    width: "8rem",
    sorter: (valueA, valueB) =>
      dateSorter(dayjs(valueA.lineupDate), dayjs(valueB.lineupDate)),
    render: (_, record) => {
      const date = record.lineoutDate ? record.lineoutDate : record.lineupDate;
      return <GRText weight={"bold"}>{date}</GRText>;
    }
  }
];

export const LINEOUT_COLUMNS: ColumnType<tTermNewFamily>[] = [
  {
    title: "이름",
    dataIndex: "name",
    key: "name",
    align: "center",
    width: "5rem"
  },
  {
    title: "학년",
    dataIndex: "grade",
    key: "grade",
    align: "center",
    width: "5rem"
  },
  {
    title: "성별",
    dataIndex: "sex",
    key: "sex",
    align: "center",
    width: "5rem",
    render: (_, item) => {
      if (!item?.sex) return;
      return <GRText>{SEX_NAME[item?.sex]}</GRText>;
    }
  },
  {
    title: "생년월일",
    key: "birth",
    dataIndex: "birth",
    align: "center",
    width: "8rem",
    render: (_, record) => {
      return record?.birth !== null && record?.birth !== "1970-01-01"
        ? record?.birth
        : "-";
    }
  },
  {
    title: "방문일",
    dataIndex: "visitDate",
    key: "visitDate",
    align: "center",
    width: "5rem"
  },
  {
    title: "라인아웃 날짜",
    dataIndex: "lineoutDate",
    key: "lineoutDate",
    align: "center",
    width: "5rem"
  }
];
