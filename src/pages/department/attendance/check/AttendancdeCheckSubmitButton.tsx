import GRButtonText from "@component/atom/button/GRTextButton";
import GRFlexView from "@component/atom/view/GRFlexView";
import AlertModal from "@component/molecule/modal/AlertModal";
import { useCallback, useState } from "react";

const AttendancdeCheckSubmitButton = ({ onSubmit }) => {
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
        description={"출석 등록"}
        onCancelClickButton={handleModal}
        onOkClickButton={onOkClickButton}
      />
    </GRFlexView>
  );
};

export default AttendancdeCheckSubmitButton;
