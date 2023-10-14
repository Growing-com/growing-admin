import GRButtonText from "@component/atom/button/GRTextButton";
import GRModal from "@component/atom/modal/GRModal";
import GRFlexView from "@component/atom/view/GRFlexView";
import { ModalProps } from "antd";
import React, { FormEventHandler, useCallback, type FC } from "react";
import GRStylesConfig from "styles/GRStylesConfig";

export type tGRFormModal = {
  okButtonText?: string;
  cancelButtonText?: string;
  onCancel?: (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
} & Omit<ModalProps, "onOk" | "onCancel">;

const GRFormModal: FC<tGRFormModal> = ({
  children,
  okButtonText,
  cancelButtonText,
  open,
  closable = false,
  onCancel,
  onSubmit,
  title,
  ...props
}) => {
  const onCancelClickButton = useCallback(
    (
      e:
        | React.MouseEvent<HTMLAnchorElement, MouseEvent>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      onCancel?.(e);
    },
    [onCancel]
  );

  return (
    <GRModal
      open={open}
      closable={closable}
      footer={[]}
      title={title}
      onCancel={onCancelClickButton}
      {...props}
    >
      <form onSubmit={onSubmit}>
        {children}
        <GRFlexView flexDirection={"row"} justifyContent={"flex-end"}>
          <GRButtonText
            key={"cancel-button"}
            buttonType={"cancel"}
            onClick={onCancelClickButton}
            marginright={GRStylesConfig.BASE_MARGIN}
          >
            {cancelButtonText ?? "취소"}
          </GRButtonText>
          <GRButtonText key={"ok-button"} htmlType={"submit"}>
            {okButtonText ?? "확인"}
          </GRButtonText>
        </GRFlexView>
      </form>
    </GRModal>
  );
};

export default GRFormModal;
