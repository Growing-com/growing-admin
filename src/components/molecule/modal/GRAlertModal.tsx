import GRTextButton from "@component/atom/button/GRTextButton";
import GRModal, { tGRModal } from "@component/atom/modal/GRModal";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import { css } from "@emotion/react";
import { FC, ReactNode } from "react";

type tGRAlertModal = {
  onCancelClickButton?: () => void;
  cancelButtonText?: string;
  onOkClickButton?: () => void;
  okButtonText?: string;
  description: string;
  subComponent?: ReactNode;
} & Omit<tGRModal, "onCancel" | "onOk">;

const GRAlertModal: FC<tGRAlertModal> = ({
  onCancelClickButton,
  cancelButtonText,
  onOkClickButton,
  okButtonText,
  description,
  subComponent,
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
      footer={[]}
      // // eslint-disable-next-line @typescript-eslint/no-empty-function
      // onCancel={() => {}}
      // // eslint-disable-next-line @typescript-eslint/no-empty-function
      // onOk={() => {}}
    >
      <GRFlexView>
        <GRFlexView>
          <GRFlexView
            justifyContent={"center"}
            alignItems={"center"}
            style={{ minHeight: "7rem" }}
          >
            <GRText fontSize={"b4"} weight={"bold"}>
              {description ?? ""}
            </GRText>
            {subComponent}
          </GRFlexView>
        </GRFlexView>
        <GRFlexView flexDirection={"row"} justifyContent={"center"}>
          <GRTextButton
            onClick={onCancelClickButton}
            key={"modal-cancel-button"}
            marginright={2}
            size={"large"}
            buttonType={"cancel"}
          >
            {cancelButtonText ?? "취소"}
          </GRTextButton>
          <GRTextButton
            onClick={onOkClickButton}
            key={"modal-ok-button"}
            size={"large"}
          >
            {okButtonText ?? "확인"}
          </GRTextButton>
        </GRFlexView>
      </GRFlexView>
    </GRModal>
  );
};

export default GRAlertModal;
