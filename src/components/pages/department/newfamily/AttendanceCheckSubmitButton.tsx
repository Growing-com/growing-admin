import GRButtonText from "@component/atom/button/GRTextButton";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRAlertModal from "@component/molecule/modal/GRAlertModal";
import { Tooltip } from "antd";
import { FC, useCallback, useState } from "react";

type tAttendanceCheckSubmitButton = {
  onSubmit: () => void;
  disabled: boolean;
};

const AttendanceCheckSubmitButton: FC<tAttendanceCheckSubmitButton> = ({
  onSubmit,
  disabled
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
      <Tooltip title={disabled ? "출석 체크를 모두 완료해주세요" : undefined}>
        <GRButtonText
          htmlType={"submit"}
          marginleft={0.5}
          size={"large"}
          onClick={handleModal}
          disabled={disabled}
        >
          출석 등록
        </GRButtonText>
      </Tooltip>
      <GRAlertModal
        open={open}
        description={"입력한 출석 내용을 등록하시겠습니까?"}
        onCancelClickButton={handleModal}
        onOkClickButton={onOkClickButton}
      />
    </GRFlexView>
  );
};

export default AttendanceCheckSubmitButton;
