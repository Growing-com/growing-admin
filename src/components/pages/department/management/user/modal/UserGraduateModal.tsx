import GRAlert from "@component/atom/alert/GRAlert";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRModal from "@component/atom/modal/GRModal";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import { tUser } from "api/account/types";
import useGraduateMutate from "api/management/user/mutate/useGraduateMutate";
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
      width={"40%"}
      maskClosable={false}
    >
      <GRFlexView
        flexDirection={"row"}
        alignItems={"center"}
        xGap={2}
        marginbottom={1}
      >
        <GRText fontSize={"b4"}>졸업일</GRText>
        <GRView>
          <GRDatePicker
            pickerType={"basic"}
            defaultValue={graduateDate}
            onChange={onChangeDate}
          />
        </GRView>
      </GRFlexView>
      <GRFlexView flexDirection={"row"} alignItems={"center"} xGap={3}>
        <GRText fontSize={"b4"}>명단</GRText>
        <GRText fontSize={"b3"}>
          {selectedUser.map(user => user.name).join(", ")}
        </GRText>
      </GRFlexView>
    </GRModal>
  );
};

export default UserGraduateModal;
