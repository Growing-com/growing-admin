import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { useQuery } from "@tanstack/react-query";
import { ColumnType } from "antd/es/table";
import queryKeys from "api/queryKeys";
import { tTermNewFamily } from "api/term/types";
import { getNewFamilies } from "apiV2/newFamily";
import { SEX_NAME } from "config/const";
import dayjs from "dayjs";
import { FC, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { checkDefaultDate } from "utils/DateUtils";
import { dateSorter, koreanSorter } from "utils/sorter";

type tNewFamilyTable = {
  onClickPromote: (newFamily: tTermNewFamily[]) => void;
  onClickNewFamilyLineUp: (newFamily: tTermNewFamily[]) => void;
};

export const NewFamilyTable: FC<tNewFamilyTable> = ({
  onClickPromote,
  onClickNewFamilyLineUp
}) => {
  const [selectedNewFamily, setSelectedNewFamily] = useState<tTermNewFamily[]>(
    []
  );

  const { data: newFamilyData } = useQuery(
    [queryKeys.ACCOUNT_ROLES],
    async () =>
      await getNewFamilies({
        newFamilyGroupId: 1
      }),
    {
      select: _data => _data.content
    }
  );

  const columns: ColumnType<any>[] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "5rem"
    },
    {
      title: "등반일",
      dataIndex: "promoteDate",
      key: "promoteDate",
      align: "center",
      width: "8rem",
      render: (_, record) => checkDefaultDate(record.promoteDate)
    },
    {
      title: "새가족 순장",
      dataIndex: "smallGroupLeaderName",
      key: "smallGroupLeaderName",
      align: "center",
      width: "6rem"
    },
    {
      title: "순장",
      align: "center",
      dataIndex: "promotedSmallGroupLeaderName",
      width: "8rem",
      sorter: (a, b) =>
        koreanSorter(
          a.promotedSmallGroupLeaderName,
          b.promotedSmallGroupLeaderName
        )
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
      dataIndex: "gender",
      key: "gender",
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
      render: (_, record) => checkDefaultDate(record.birth)
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
      render: (_, record) => checkDefaultDate(record.visitDate)
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
