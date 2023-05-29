import GRButtonText from "@component/base/button/GRTextButton";
import GRModal, { tGRModal } from "@component/base/modal/GRModal";
import GRText from "@component/base/text/GRText";
import GRFlexView from "@component/base/view/GRFlexView";
import { css } from "@emotion/react";
import { FC } from "react";

type tAlertModal = {
  onCancelClickButton?: () => void;
  cancelButtonText?: string;
  onOkClickButton?: () => void;
  okButtonText?: string;
  description: string;
} & tGRModal;

const AlertModal: FC<tAlertModal> = ({
  onCancelClickButton,
  cancelButtonText,
  onOkClickButton,
  okButtonText,
  description,
  ...props
}) => {
  return (
    <GRModal
      {...props}
      centered
      width={"24rem"}
      css={css`
        .ant-modal-content {
          border-radius: 1rem;
        }
      `}
    >
      <GRFlexView>
        <GRFlexView>
          <GRFlexView
            justifyContent={"center"}
            alignItems={"center"}
            style={{ minHeight: "7rem" }}
          >
            <GRText fontSize={"b2"} weight={"bold"}>
              {description ?? ""}
            </GRText>
          </GRFlexView>
        </GRFlexView>
        <GRFlexView flexDirection={"row"} justifyContent={"center"}>
          <GRButtonText
            onClick={onCancelClickButton}
            key={"modal-cancel-button"}
            marginRight={2}
            size={"large"}
          >
            {cancelButtonText ?? "취소"}
          </GRButtonText>
          <GRButtonText
            onClick={onOkClickButton}
            key={"modal-ok-button"}
            size={"large"}
          >
            {okButtonText ?? "확인"}
          </GRButtonText>
        </GRFlexView>
      </GRFlexView>
    </GRModal>
  );
};

export default AlertModal;
