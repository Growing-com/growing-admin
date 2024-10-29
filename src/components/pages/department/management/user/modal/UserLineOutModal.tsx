import GRTable from "@component/atom/GRTable";
import GRModal from "@component/atom/modal/GRModal";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRView from "@component/atom/view/GRView";
import { ColumnType } from "antd/es/table";
import { tUser } from "api/account/types";
import useLineOutMutate from "api/management/user/mutate/useLineOutMutate";
import { SEX_NAME } from "config/const";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { convertDateStringByDefaultForm } from "utils/DateUtils";

type tUserLineOutModal = {
  open: boolean;
  onClickClose: () => void;
  selectedUser: tUser[];
};

type tUserWithReason = tUser & { reason?: string };

export const UserLineOutModal: FC<tUserLineOutModal> = ({
  open,
  onClickClose,
  selectedUser
}) => {
  const [selectFormData, setSelectFormData] = useState<tUserWithReason[]>([]);

  const { userLineOutMutate } = useLineOutMutate(onClickClose);

  const onOkPromoteClickButton = async () => {
    const _formData = selectFormData.map(({ userId, reason }) => ({
      userId,
      lineOutDate: convertDateStringByDefaultForm(dayjs()),
      reason
    }));
    await userLineOutMutate(_formData);
  };

  const insertDataInFormResult = (
    _teamMemberId: number,
    key: string,
    value: any
  ) => {
    const _formResult = selectFormData.map(result => {
      if (_teamMemberId === result.userId) {
        return {
          ...result,
          [key]: value
        };
      }
      return result;
    });
    setSelectFormData(_formResult);
  };

  const columns: ColumnType<tUser>[] = [
    {
      title: "리더",
      align: "center",
      dataIndex: "leaderName",
      key: "leaderName",
      render: (_, item) => {
        if (!item) return;
        return <GRText>{item?.leaderName}</GRText>;
      }
    },
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
      title: "이유",
      dataIndex: "reason",
      key: "reason",
      align: "center",
      render: (_, _item) => {
        const currentReason =
          selectFormData.find(result => result.userId === _item.userId)
            ?.reason ?? "";

        return (
          <GRTextInput
            type={"textarea"}
            placeholder={"라인아웃 이유를 작성해주세요."}
            value={currentReason}
            onChange={value => {
              insertDataInFormResult(_item.userId, "reason", value);
            }}
          />
        );
      }
    }
  ];

  const onCloseModal = () => {
    onClickClose();
  };

  useEffect(() => {
    setSelectFormData(selectedUser);
  }, [selectedUser]);

  return (
    <GRModal
      open={open}
      onCancel={onCloseModal}
      onOk={onOkPromoteClickButton}
      title={"라인아웃"}
      width={"60%"}
      maskClosable={false}
    >
      <GRView marginbottom={GRStylesConfig.BASE_MARGIN}>
        <GRTable columns={columns} data={selectedUser} />
      </GRView>
    </GRModal>
  );
};
