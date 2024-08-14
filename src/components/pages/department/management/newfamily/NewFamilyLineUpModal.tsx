import GRTable from "@component/atom/GRTable";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRSelect from "@component/atom/dataEntry/GRSelect";
import GRModal from "@component/atom/modal/GRModal";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Checkbox } from "antd";
import { ColumnType } from "antd/es/table";
import queryKeys from 'api/queryKeys';
import { newFamiliesLineUp, tNewFamiliesLineUpParams } from 'apiV2/newFamily';
import { tNewFamilyV2 } from "apiV2/newFamily/type";
import useTerm from "hooks/api/term/useTerm";
import { FC, useEffect, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { convertDateStringByDefaultForm } from "utils/DateUtils";

type tNewFamilyLineUpModal = {
  open: boolean;
  onClickClose: () => void;
  selectNewFamily: tNewFamilyV2[];
};
interface tNewFamilyLineUpForm extends tNewFamilyV2 {
  isPromote: boolean;
  smallGroupId?: number;
  promoteDate?: string;
}
export const NewFamilyLineUpModal: FC<tNewFamilyLineUpModal> = ({
  open,
  onClickClose,
  selectNewFamily
}) => {
  const queryClient = useQueryClient();

  const [selectedLeaderId, setSelectedLeaderId] = useState<number>();
  const [selectPromteDate, setSelectPromteDate] = useState<number[]>([]);
  const [selectFormData, setSelectFormData] = useState<tNewFamilyLineUpForm[]>(
    []
  );

  const { termSamllGroupLeaderOptions } = useTerm({ termId: 1 });

  /** 대량 라인업 mutate */
  const { mutateAsync:  newFamiliesLineUpMutateAsync} = useMutation(
    newFamiliesLineUp,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.NEW_FAMILY_LINE_OUT_V2]);
        onClickClose();
      }
    }
  );

  const onOkNewFamiliesLineUpClickButton = async () => {
    const newFamiliesData: tNewFamiliesLineUpParams[] = [];

    for (const item of selectFormData) {
        const { name, newFamilyId, smallGroupId, promoteDate } = item;

        if (smallGroupId == null) {
            alert(`${name}의 순장을 선택해주세요.`);
            return; 
        }

        newFamiliesData.push({
            newFamilyId,
            smallGroupId,
            promoteDate: promoteDate || null
        });
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

  const columns: ColumnType<tNewFamilyV2>[] = [
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
        return (
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
        return (
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
        return (
          <GRFlexView>
            <GRSelect
              // value={selectedLeaderId}
              options={termSamllGroupLeaderOptions}
              onChange={value => {
                insertDataInFormResult(
                  _item.newFamilyId,
                  "smallGroupId",
                  value
                );
              }}
              placeholder={"리더 선택"}
            />
          </GRFlexView>
        );
      }
    }
  ];

  const onCloseModal = () => {
    onClickClose();
  };

  const onClickModalOk = () => {
    console.log("확인!", selectFormData);
  };

  useEffect(() => {
    if (selectNewFamily.length === 0) return;
    const initSelectNewFamily = selectNewFamily.map(item => ({
      ...item,
      isPromote: false,
    }));
    setSelectFormData(initSelectNewFamily);
  }, []);

  return (
    <GRModal
      open={open}
      onCancel={onCloseModal}
      // onOk={onClickModalOk}
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
