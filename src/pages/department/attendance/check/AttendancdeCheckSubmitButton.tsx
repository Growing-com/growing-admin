import GRButtonText from "@component/atom/button/GRTextButton";
import GRFlexView from "@component/atom/view/GRFlexView";
import AlertModal from "@component/molecule/modal/AlertModal";
import { FC, useCallback, useState } from "react";

type tAttendancdeCheckSubmitButton = {
  onSubmit: () => void;
};

const AttendancdeCheckSubmitButton: FC<tAttendancdeCheckSubmitButton> = ({
  onSubmit
}) => {
  const [open, setOpen] = useState(false);

  const handleModal = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const onOkClickButton = useCallback(() => {
    setOpen(false);
    onSubmit();
  }, [onSubmit]);

  return (
    <GRFlexView flexDirection={"row"} justifyContent={"flex-end"} margintop={1}>
      <GRButtonText
        htmlType={"submit"}
        marginleft={0.5}
        size={"large"}
        onClick={handleModal}
      >
        출석 등록
      </GRButtonText>
      <AlertModal
        open={open}
        description={"입력한 출석 내용을 등록하시겠습니까?"}
        onCancelClickButton={handleModal}
        onOkClickButton={onOkClickButton}
      />
    </GRFlexView>
  );
};

export default AttendancdeCheckSubmitButton;
