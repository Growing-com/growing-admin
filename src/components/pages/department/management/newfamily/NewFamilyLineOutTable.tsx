import GRTable from "@component/atom/GRTable";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import { useQuery } from "@tanstack/react-query";
import { ColumnType } from "antd/es/table";
import queryKeys from "api/queryKeys";
import { tTermNewFamily } from "api/term/types";
import { getLineOutNewFamiles } from "apiV2/newFamily";
import { FC, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";

export const NewFamilyLineOutTable: FC<{
  onClickNewFamilyLineUp: (newFamily: tTermNewFamily[]) => void;
}> = ({ onClickNewFamilyLineUp }) => {
  const { data: lineOutNewFamiles } = useQuery(
    [queryKeys.IN_ACTIVE_USERS],
    async () => await getLineOutNewFamiles(),
    { select: _data => _data.content }
  );

  const [selectedNewFamily, setSelectedNewFamily] = useState<tTermNewFamily[]>(
    []
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
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      width: "5rem",
      sorter: (a, b) => a.grade - b.grade
    },
    {
      title: "성별",
      dataIndex: "sex",
      key: "sex",
      align: "center",
      width: "5rem",
      render: (_, record) => <ColumSexRender sexData={record?.sex} />
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
      title: "방문일",
      dataIndex: "visitDate",
      key: "visitDate",
      align: "center",
      width: "8rem",
      render: (_, record) => {
        return record?.visitDate !== "1970-01-01" ? record?.visitDate : "-";
      }
    },
    {
      title: "라인아웃 날짜",
      dataIndex: "lineoutDate",
      key: "lineoutDate",
      align: "center",
      width: "8rem",
      render: (_, record) => {
        return record?.lineoutDate !== "1970-01-01" ? record?.lineoutDate : "-";
      }
    }
  ];

  const onChangeSearch = () => {};

  const onSelectChange = (_: React.Key[], selectedRows: any[]) => {
    setSelectedNewFamily(selectedRows);
  };

  const onClickNewFamilySubLineUp = () => {
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
        <GRButtonText
          onClick={onClickNewFamilySubLineUp}
          buttonType={"custom"}
          size={"small"}
        >
          복귀
        </GRButtonText>
      </GRFlexView>
      <GRTable
        rowKey={"id"}
        columns={columns}
        data={lineOutNewFamiles}
        isHoverTable={false}
        marginbottom={GRStylesConfig.BASE_MARGIN}
        scroll={{ y: "20rem" }}
        pagination={{
          total: lineOutNewFamiles?.length,
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
