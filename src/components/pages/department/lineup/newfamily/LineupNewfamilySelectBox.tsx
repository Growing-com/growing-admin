import GRTable from "@component/atom/GRTable";
import GRAlert from "@component/atom/alert/GRAlert";
import GRTextButton from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnType } from "antd/es/table";
import { lineUpNewfamily, saveNewfamilyTemporaryLeaders } from "api/newfamily";
import { tNewfamilyRequested } from "api/newfamily/type";
import queryKeys from "api/queryKeys";
import { tSmallGroupLeader } from "api/term/type";
import { SEX_NAME } from "config/const";
import { useNewfamilyLineupRequestQuery } from "hooks/queries/newfamily/useNewfamilyLineupRequestQuery";
import { useCallback, useEffect, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { handleError } from "utils/error";
import { koreanSorter } from "utils/sorter";
import DropCell from "./DropCell";
import TemporarySmallGroupLeaderNamesRender from "./TemporarySmallGroupLeaderNamesRender";

type tLineupNewfamilySelectBox = {
  smallGroups: tSmallGroupLeader[];
};

const LineupNewfamilySelectBox: React.FC<tLineupNewfamilySelectBox> = ({
  smallGroups
}) => {
  const queryClient = useQueryClient();

  const [formResult, setFormResult] = useState<tNewfamilyRequested[]>([]);

  const { data: newFamilyLineupData } = useNewfamilyLineupRequestQuery();

  const { mutateAsync: saveTemporaryLeadersMutateAsync } = useMutation(
    saveNewfamilyTemporaryLeaders,
    {
      onError: error => {
        handleError(error, "후보 저장 오류");
      },
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.NEW_FAMILY_LINE_UP_REQUEST]);
        GRAlert.success("후보 저장 완료");
      }
    }
  );

  const { mutateAsync: lineUpMutateAsync } = useMutation(lineUpNewfamily, {
    onError: error => {
      handleError(error, "라인업 오류");
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.NEW_FAMILY]);
      queryClient.invalidateQueries([queryKeys.NEW_FAMILY_LINE_UP_REQUEST]);
      GRAlert.success("라인업 완료");
    }
  });

  const onClickSaveTemporaryLeaders = () => {
    const newfamilySaveTemporaryLeaderData = formResult
      .filter(item => item.temporarySmallGroupIds !== undefined)
      .map(({ newFamilyId, temporarySmallGroupIds }) => ({
        newFamilyId,
        temporarySmallGroupIds: temporarySmallGroupIds as number[]
      }));

    if (newfamilySaveTemporaryLeaderData.length === 0) {
      GRAlert.error("후보 저장 대상 지체가 없습니다.");
      return;
    }

    saveTemporaryLeadersMutateAsync(newfamilySaveTemporaryLeaderData);
  };

  const onClicklineupNewfamily = () => {
    const newfamilyLineupData = formResult
      .filter(item => item.smallGroupId !== undefined)
      .map(({ newFamilyId, smallGroupId }) => ({
        newFamilyId,
        smallGroupId: smallGroupId as number
      }));

    if (newfamilyLineupData.length === 0) {
      GRAlert.error("라인업 대상 지체가 없습니다.");
      return;
    }

    lineUpMutateAsync(newfamilyLineupData);
  };

  const insertDataInFormResult = useCallback(
    (_newFamilyId: number, updates: { [key: string]: any }) => {
      const _formResult = formResult?.map(result => {
        if (_newFamilyId === result.newFamilyId) {
          return {
            ...result,
            ...updates
          };
        }
        return result;
      });
      setFormResult(_formResult);
    },
    [formResult]
  );

  const insertTemporaryDataInFormResult = useCallback(
    (_newFamilyId: number, value: number) => {
      const _formResult = formResult?.map(result => {
        if (_newFamilyId === result.newFamilyId) {
          return {
            ...result,
            temporarySmallGroupIds: [
              ...(result.temporarySmallGroupIds || []), // 기존 배열 유지
              value // 드롭된 아이템의 ID 추가
            ]
          };
        }
        return result;
      });
      setFormResult(_formResult);
    },
    [formResult]
  );

  const deleteTemporaryDataInFormResult = useCallback(
    (_newFamilyId: number, value: number) => {
      const _formResult = formResult?.map(result => {
        if (_newFamilyId !== result.newFamilyId) return result;
        const _temporarySmallGruopIds = result.temporarySmallGroupIds?.filter(
          id => id !== value
        );
        if (_temporarySmallGruopIds === undefined) return result;
        return {
          ...result,
          temporarySmallGroupIds: _temporarySmallGruopIds
        };
      });
      setFormResult(_formResult);
    },
    [formResult]
  );

  useEffect(() => {
    if (!newFamilyLineupData) return;

    setFormResult(newFamilyLineupData);
  }, [newFamilyLineupData]);

  const columns: ColumnType<any>[] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "3rem"
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      width: "2rem",
      render: (_, item) => {
        if (!item?.sex) return;
        return <GRText>{SEX_NAME[item?.sex]}</GRText>;
      }
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      width: "2rem",
      sorter: (a, b) => a.grade - b.grade
    },
    {
      title: "새가족 순장",
      dataIndex: "newFamilyGroupLeaderName",
      key: "newFamilyGroupLeaderName",
      align: "center",
      width: "4rem",
      sorter: (a, b) => {
        return koreanSorter(
          a.newFamilyGroupLeaderName,
          b.newFamilyGroupLeaderName
        );
      }
    },
    {
      title: "순원 기록지",
      dataIndex: "etc.lineUpMemo",
      key: "etc.lineUpMemo",
      align: "center",
      width: "10rem",
      render: (_, item) => {
        return (
          <div
            style={{
              maxHeight: "100px", // 최대 높이 설정
              overflowY: "scroll", // 항상 스크롤 표시
              whiteSpace: "nowrap" // 줄바꿈 방지
            }}
          >
            <GRText>{item.etc.lineUpMemo || "없음"}</GRText>
          </div>
        );
      }
    },
    {
      title: "일반 순장 후보",
      align: "center",
      dataIndex: "temporarySmallGroupLeaderName",
      width: "10rem",
      minWidth: 63,
      render: (_, item) => {
        const handletemporaryDrop = (droppedItem: tSmallGroupLeader) => {
          if (
            item.temporarySmallGroupIds?.some(
              (id: number) => id === droppedItem.smallGroupId
            )
          ) {
            return;
          }
          insertTemporaryDataInFormResult(
            item.newFamilyId,
            droppedItem.smallGroupId
          );
        };

        return (
          <DropCell onDrop={handletemporaryDrop}>
            <TemporarySmallGroupLeaderNamesRender
              temporarySmallGroupIds={item.temporarySmallGroupIds}
              smallGroups={smallGroups}
              deleteTemporaryData={deleteTemporaryDataInFormResult}
              newFamilyId={item.newFamilyId}
            />
          </DropCell>
        );
      }
    },
    {
      title: "일반 순장",
      align: "center",
      dataIndex: "smallGroupLeaderName",
      width: "5rem",
      minWidth: 80,
      render: (_, item) => {
        if (!item) return;

        const handleConfirmedDrop = (droppedItem: tSmallGroupLeader) => {
          insertDataInFormResult(item.newFamilyId, {
            smallGroupLeaderName: droppedItem.smallGroupLeaderName,
            smallGroupId: droppedItem.smallGroupId,
            codyName: droppedItem.codyName
          });
        };

        return (
          <DropCell onDrop={handleConfirmedDrop}>
            <GRText fontSize={"b7"}>{item.codyName || ""}</GRText>
            <GRText fontSize={"b3"} weight={"bold"}>
              {item.smallGroupLeaderName || "순장 선택"}
            </GRText>
          </DropCell>
        );
      }
    }
  ];

  return (
    <>
      <GRFlexView
        flexDirection={"row"}
        justifyContent={"end"}
        marginbottom={GRStylesConfig.BASE_MARGIN}
      >
        <GRFlexView flexDirection={"row"} justifyContent={"start"}>
          <GRText fontSize={"b4"} weight={"bold"}>
            새가족 목록
          </GRText>
        </GRFlexView>
        <GRFlexView flexDirection={"row"} justifyContent={"end"}>
          <GRTextButton
            marginright={GRStylesConfig.BASE_MARGIN}
            onClick={onClickSaveTemporaryLeaders}
          >
            후보 저장
          </GRTextButton>
          <GRTextButton onClick={onClicklineupNewfamily}> 라인업 </GRTextButton>
        </GRFlexView>
      </GRFlexView>
      <GRTable
        rowKey={"newFamilyId"}
        columns={columns}
        data={formResult}
        scroll={{ x: true }}
        tableLayout={"auto"}
      />
    </>
  );
};

export default LineupNewfamilySelectBox;
