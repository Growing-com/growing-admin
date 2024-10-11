import GRTable from "@component/atom/GRTable";
import GRAlert from "@component/atom/alert/GRAlert";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRModal from "@component/atom/modal/GRModal";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnType } from "antd/es/table";
import { lineUpNewfamily, promoteNewfamily } from "api/newfamily";
import { tNewfamily } from "api/newfamily/type";
import queryKeys from "api/queryKeys";
import { SEX_NAME } from "config/const";
import { FC, useEffect, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { convertDateStringByDefaultForm } from "utils/DateUtils";
import { handleError } from "utils/error";

type tNewFamilyPromoteModal = {
  open: boolean;
  onClickClose: () => void;
  selectedNewFamily: tNewfamily[];
};

export const NewFamilyPromoteModal: FC<tNewFamilyPromoteModal> = ({
  open,
  onClickClose,
  selectedNewFamily
}) => {
  const queryClient = useQueryClient();

  const [selectFormData, setSelectFormData] = useState<tNewfamily[]>([]);

  const { mutateAsync: promoteMutateAsync } = useMutation(promoteNewfamily, {
    onError: error => {
      handleError(error, "등반 오류");
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.NEW_FAMILY]);
      queryClient.invalidateQueries([queryKeys.NEW_FAMILY_LINE_UP_REQUEST]);
      queryClient.invalidateQueries([queryKeys.NEW_FAMILY_ATTENDANCE]);

      onClickClose();
      GRAlert.success("등반 완료");
    }
  });

  const validateFormData = (newfamily: tNewfamily[]) => {
    for (const item of newfamily) {
      const { name, smallGroupLeaderName, promoteDate } = item;

      if (smallGroupLeaderName === null) {
        GRAlert.error(`${name}은 라인업이 되어야 합니다.`);
        return false;
      }
      if (promoteDate === undefined) {
        GRAlert.error(`${name}의 등반일을 선택해주세요.`);
        return false;
      }
    }
    return true;
  };

  const { mutateAsync: lineUpMutateAsync } = useMutation(lineUpNewfamily, {
    onError: error => {
      handleError(error, "라인업 오류");
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.NEW_FAMILY]);

      //   onClickClose();
      GRAlert.success("라인업 완료");
    }
  });

  const onOkPromoteClickButton = async () => {
    if (!validateFormData(selectFormData)) {
      return;
    }

    const newfamilyPromoteData = selectFormData.map(
      ({ newFamilyId, promoteDate }) => ({
        newFamilyId,
        promoteDate: promoteDate as string
      })
    );

    await promoteMutateAsync(newfamilyPromoteData);
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

  const columns: ColumnType<tNewfamily>[] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center"
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      render: (_, item) => {
        if (!item?.sex) return;
        return <GRText>{SEX_NAME[item?.sex]}</GRText>;
      }
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center"
    },
    {
      title: "새가족 순장",
      dataIndex: "newFamilyGroupLeaderName",
      key: "newFamilyGroupLeaderName",
      align: "center"
    },
    {
      title: "일반 순장",
      align: "center",
      dataIndex: "smallGroupLeaderName",
      render: (_, item) => {
        if (!item) return;
        return <GRText>{item?.smallGroupLeaderName}</GRText>;
      }
    },
    {
      title: "등반일",
      dataIndex: "promoteDate",
      key: "promoteDate",
      align: "center",
      render: (_, _item) => {
        return (
          <GRFlexView>
            <GRDatePicker
              pickerType={"basic"}
              placeholder={"등반일 선택"}
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
    }
  ];

  const onCloseModal = () => {
    onClickClose();
  };

  useEffect(() => {
    setSelectFormData(selectedNewFamily);
  }, [selectedNewFamily]);

  return (
    <GRModal
      open={open}
      onCancel={onCloseModal}
      onOk={onOkPromoteClickButton}
      title={"새가족 등반"}
      width={"60%"}
      maskClosable={false}
    >
      <GRView marginbottom={GRStylesConfig.BASE_MARGIN}>
        <GRTable columns={columns} data={selectedNewFamily} />
      </GRView>
    </GRModal>
  );
};
