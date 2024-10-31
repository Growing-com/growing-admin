import GRTable from "@component/atom/GRTable";
import GRAlert from "@component/atom/alert/GRAlert";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRModal from "@component/atom/modal/GRModal";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import { ColumnType } from "antd/es/table";
import { tUser } from "api/account/types";
import useGraduateMutate from "api/management/user/mutate/useGraduateMutate";
import { DUTY, SEX_NAME } from "config/const";
import dayjs, { Dayjs } from "dayjs";
import { FC, useState } from "react";
import { convertDateStringByDefaultForm } from "utils/DateUtils";

type tUserGraduateModal = {
  open: boolean;
  onClickClose: () => void;
  selectedUser: tUser[];
};

const UserGraduateModal: FC<tUserGraduateModal> = ({
  open,
  onClickClose,
  selectedUser
}) => {
  const [graduateDate, setGraduateDate] = useState<Dayjs | null>(dayjs());

  const { graduateMutate } = useGraduateMutate(onClickClose);

  const onOkGraduateButton = async () => {
    if (graduateDate === null) {
      GRAlert.error("졸업일을 선택해 주세요.");
      return;
    }
    const _selectedUserIds = selectedUser.map(item => item.userId);

    await graduateMutate({
      userIds: _selectedUserIds,
      graduateDate: convertDateStringByDefaultForm(graduateDate)
    });
  };

  const columns: ColumnType<tUser>[] = [
    {
      title: "직분",
      dataIndex: "duty",
      key: "duty",
      align: "center",
      width: "3rem",
      minWidth: 45,
      render: (_, item) => {
        if (!item?.duty) return;
        return <GRText>{DUTY[item?.duty]}</GRText>;
      }
    },
    {
      title: "일반 순장",
      align: "center",
      dataIndex: "leaderName",
      width: "4rem",
      minWidth: 65
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "6rem",
      minWidth: 55,
      render: (_, item) => {
        return <GRText fontSize={"b5"}>{item.name}</GRText>;
      }
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      width: "3rem",
      minWidth: 40,
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
      width: "3rem",
      minWidth: 40
    }
  ];

  const onCloseModal = () => {
    onClickClose();
  };

  const onChangeDate = (date: Dayjs | null) => {
    setGraduateDate(date);
  };

  return (
    <GRModal
      open={open}
      onCancel={onCloseModal}
      onOk={onOkGraduateButton}
      title={"졸업"}
      width={"50%"}
      maskClosable={false}
    >
      <GRFlexView
        flexDirection={"row"}
        alignItems={"center"}
        xGap={2}
        marginbottom={1}
        style={{ width: "50%" }}
      >
        <GRText fontSize={"b4"}>졸업일</GRText>
        <GRFlexView>
          <GRDatePicker
            pickerType={"basic"}
            defaultValue={graduateDate}
            onChange={onChangeDate}
          />
        </GRFlexView>
      </GRFlexView>
      <GRTable
        rowKey={"userId"}
        columns={columns}
        data={selectedUser}
        scroll={{ x: true }}
        tableLayout={"auto"}
      />
    </GRModal>
  );
};

export default UserGraduateModal;
