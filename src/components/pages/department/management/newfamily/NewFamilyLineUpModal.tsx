import GRTable from "@component/atom/GRTable";
import GRAlert from "@component/atom/alert/GRAlert";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRSelect from "@component/atom/dataEntry/GRSelect";
import GRModal from "@component/atom/modal/GRModal";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "antd";
import { ColumnType } from "antd/es/table";
import queryKeys from "api/queryKeys";
import {
  newFamiliesLineUp,
  promteNewFamily,
  tNewFamiliesLineUpParams
} from "apiV2/newFamily";
import { tLineUpNewFamilyV2 } from "apiV2/newFamily/type";
import useTerm from "hooks/api/term/useTerm";
import { FC, useEffect, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { convertDateStringByDefaultForm } from "utils/DateUtils";

type tNewFamilyLineUpModal = {
  open: boolean;
  onClickClose: () => void;
  selectNewFamily: tLineUpNewFamilyV2[];
  resetSelection: () => void;
};
interface tNewFamilyLineUpForm extends tLineUpNewFamilyV2 {
  isPromote?: boolean;
  smallGroupId?: number;
  newFamilyGroupLeaderName?: string;
}
export const NewFamilyLineUpModal: FC<tNewFamilyLineUpModal> = ({
  open,
  onClickClose,
  selectNewFamily,
  resetSelection
}) => {
  const queryClient = useQueryClient();

  const [selectFormData, setSelectFormData] = useState<tNewFamilyLineUpForm[]>(
    []
  );

  const { termSmallGroupLeader, termSmallGroupLeaderOptions } = useTerm({
    termId: 1
  });

  /** 대량 라인업 mutate */
  const { mutateAsync: newFamiliesLineUpMutateAsync } = useMutation(
    newFamiliesLineUp,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.NEW_FAMILY_V2]);
        resetSelection();
        onClickClose();
        GRAlert.success("라인업 완료!");
      }
    }
  );

  /** 등반 mutate */
  const { mutateAsync: newFamilyPromoteMutateAsync } = useMutation(
    promteNewFamily,
    {
      onError: error => {
        console.log("error", error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.NEW_FAMILY_V2]);
        resetSelection();
      }
    }
  );

  const onOkNewFamiliesLineUpClickButton = async () => {
    const newFamiliesData: tNewFamiliesLineUpParams[] = [];
    let promoteSuccess = false;

    const validateFormData = (item: tNewFamilyLineUpForm)  => {
      const { name, promoteDate, smallGroupId, newFamilyGroupLeaderName } =
        item;

      // 등반 날짜, 순장 선택 둘 다 없는 경우
      if (promoteDate === null && smallGroupId == null) {
        GRAlert.error(`${name}의 변경사항을 선택해주세요.`);
        return false;
      }

      // 등반일이 없는데 새가족반이 있는 경우
      if (promoteDate === null && newFamilyGroupLeaderName) {
        GRAlert.error(`${name}의 등반일을 선택해주세요.`);
        return false;
      }
      return true;
    };

    const filteredSelectFormData = selectFormData
      .filter(item => !item.promotedSmallGroupLeaderName)
      .map(item => {
        if (item.smallGroupLeaderName) {
          const leader = termSmallGroupLeader?.find(
            leader => leader.smallGroupLeaderName === item.smallGroupLeaderName
          );
          return { ...item, smallGroupId: leader?.smallGroupId };
        }
        return item;
      });

    for (const item of filteredSelectFormData) {
      const {
        name,
        newFamilyId,
        promoteDate,
        smallGroupId,
      } = item;

      if(!validateFormData(item)){
        return;
      }
      
      // 등반만 할 경우
      if (smallGroupId == null && promoteDate) {
        try {
          await newFamilyPromoteMutateAsync({
            promoteDate,
            newFamilyId,
            smallGroupId: null
          });
          promoteSuccess = true;
        } catch (error) {
          console.log("등반 실패", error);
          GRAlert.error(`${name} 등반 실패`);
          promoteSuccess = false;
        }
        continue;
      }

      if (smallGroupId) {
        newFamiliesData.push({
          newFamilyId,
          smallGroupId,
          promoteDate
        });
      } else {
        GRAlert.error(`${name}의 순장을 선택해주세요.`);
      }
    }

    if (newFamiliesData.length === 0 && !promoteSuccess) {
      GRAlert.warning("변동 사항이 없습니다.");
      onClickClose();
      return;
    }

    if (promoteSuccess) {
      GRAlert.success("등반 완료!");
      onClickClose();
      return;
    }

    await newFamiliesLineUpMutateAsync(newFamiliesData);
  };

  const insertDataInFormResult = (
    _teamMemberId: number,
    key: string,
    value: any
  ) => {
    const _formResult = selectFormData.map(result => {
      if (_teamMemberId === result.newFamilyId) {
        return {
          ...result,
          [key]: value
        };
      }
      return result;
    });
    setSelectFormData(_formResult);
  };

  const columns: ColumnType<tLineUpNewFamilyV2>[] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center"
    },
    {
      title: "등반 여부",
      dataIndex: "promote",
      key: "promote",
      align: "center",
      render: (_, _item) => {
        return _item.promoteDate ? (
          <GRText>{}</GRText>
        ) : (
          <Checkbox
            onChange={value => {
              insertDataInFormResult(
                _item.newFamilyId,
                "isPromote",
                value.target.checked
              );
            }}
          />
        );
      }
    },
    {
      title: "등반일",
      dataIndex: "promoteDate",
      key: "promoteDate",
      align: "center",
      render: (_, _item) => {
        const includeNewFamilyId = selectFormData.find(
          i => i.newFamilyId === _item.newFamilyId
        );
        return _item.promoteDate ? (
          <GRText>{_item.promoteDate}</GRText>
        ) : (
          <GRFlexView>
            <GRDatePicker
              pickerType={"basic"}
              disabled={!includeNewFamilyId?.isPromote}
              placeholder={
                !includeNewFamilyId?.isPromote
                  ? "등반 여부를 선택해주세요"
                  : "등반일 선택"
              }
              onChange={value => {
                if (value) {
                  insertDataInFormResult(
                    _item.newFamilyId,
                    "promoteDate",
                    convertDateStringByDefaultForm(value)
                  );
                }
              }}
            />
          </GRFlexView>
        );
      }
    },
    {
      title: "순장",
      dataIndex: "leader",
      key: "leader",
      align: "center",
      width: "20rem",
      render: (_, _item) => {
        const leaderName =
          _item?.promotedSmallGroupLeaderName ?? _item?.smallGroupLeaderName;

        return (
          <GRFlexView>
            {leaderName ? (
              <GRText>{leaderName}</GRText>
            ) : (
              <GRSelect
                options={termSmallGroupLeaderOptions}
                onChange={value => {
                  insertDataInFormResult(
                    _item.newFamilyId,
                    "smallGroupId",
                    value
                  );
                }}
                placeholder={"리더 선택"}
              />
            )}
          </GRFlexView>
        );
      }
    }
  ];

  const onCloseModal = () => {
    onClickClose();
  };

  useEffect(() => {
    if (selectNewFamily.length === 0) return;
    setSelectFormData(selectNewFamily);
  }, [selectNewFamily]);

  return (
    <GRModal
      open={open}
      onCancel={onCloseModal}
      onOk={onOkNewFamiliesLineUpClickButton}
      title={"새가족 라인업"}
      width={"60%"}
      maskClosable={false}
    >
      <GRView flexDirection={"row"} marginbottom={GRStylesConfig.BASE_MARGIN}>
        <GRTable columns={columns} data={selectNewFamily} />
      </GRView>
    </GRModal>
  );
};
