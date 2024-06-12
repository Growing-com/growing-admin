import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { ColumnType } from "antd/es/table";
import { useTermNewFamily } from "api/term/queries/useTermNewFamily";
import { tTermNewFamily } from "api/term/types";
import { SEX_NAME } from "config/const";
import dayjs from "dayjs";
import { useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { dateSorter, koreanSorter } from "utils/sorter";

export const NewFamilyTable = ({ onClickPromote, onClickNewFamilyLineUp }) => {
  const { data: newFamilyData, refetch } = useTermNewFamily({ termId: 1 });
  const [selectedNewFamily, setSelectedNewFamily] = useState<tTermNewFamily[]>(
    []
  );

  const columns: ColumnType<tTermNewFamily>[] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "5rem"
    },
    {
      title: "등반일",
      align: "center",
      width: "8rem",
      render: (_, record) => {
        if (!record.lineoutDate && !record.lineupDate) return "";
        const date = record.lineoutDate
          ? record.lineoutDate
          : record.lineupDate;
        return <GRText weight={"bold"}>{date}</GRText>;
      }
    },
    {
      title: "새가족 순장",
      dataIndex: "newTeamLeaderName",
      key: "newTeamLeaderName",
      align: "center",
      width: "6rem"
    },
    {
      title: "순장",
      align: "center",
      dataIndex: "firstPlantLeaderName",
      width: "8rem",
      sorter: (a, b) =>
        koreanSorter(a.firstPlantLeaderName, b.firstPlantLeaderName)
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
        return record?.birth !== "1970-01-01" ? record?.birth : "-";
      }
    },
    {
      title: "전화번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      width: "10rem"
    },
    {
      title: "방문일",
      dataIndex: "visitDate",
      key: "visitDate",
      align: "center",
      width: "8rem",
      sorter: (valueA, valueB) =>
        dateSorter(dayjs(valueA.visitDate), dayjs(valueB.visitDate)),
      render: (_, record) => {
        return record?.visitDate !== "1970-01-01" ? record?.visitDate : "-";
      }
    }
  ];

  const onSelectChange = (_: React.Key[], selectedRows: any[]) => {
    setSelectedNewFamily(selectedRows);
  };

  const onChangeSearch = () => {};

  const onClickSubPromote = () => {
    if (selectedNewFamily.length === 0) {
      alert("등반할 새가족을 선택해주세요.");
      return;
    }
    onClickPromote(selectedNewFamily);
  };

  const onClickSubNewFamilyLineUp = () => {
    if (selectedNewFamily.length === 0) {
      alert("라인업 할 새가족을 선택해주세요.");
      return;
    }
    onClickNewFamilyLineUp(selectedNewFamily);
  };

  return (
    <>
      <GRFlexView
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginbottom={GRStylesConfig.BASE_MARGIN}
      >
        <GRView>
          <GRTextInput
            style={{
              height: "2.1rem"
            }}
            type={"input"}
            placeholder={"이름으로 검색하세요"}
            onChange={onChangeSearch}
          />
        </GRView>
        <GRView>
          <GRButtonText
            onClick={onClickSubPromote}
            marginright={GRStylesConfig.BASE_MARGIN}
            buttonType={"custom"}
            size={"small"}
          >
            등반
          </GRButtonText>
          <GRButtonText
            onClick={onClickSubNewFamilyLineUp}
            buttonType={"primary"}
          >
            라인업
          </GRButtonText>
        </GRView>
      </GRFlexView>
      <GRTable
        rowKey={"userId"}
        columns={columns}
        data={newFamilyData}
        pagination={{
          total: newFamilyData?.length,
          defaultPageSize: 10,
          position: ["bottomCenter"]
        }}
        rowSelection={{
          selectedRowKeys: selectedNewFamily.map(newFamily => newFamily.userId),
          onChange: onSelectChange
        }}
      />
    </>
  );
};
