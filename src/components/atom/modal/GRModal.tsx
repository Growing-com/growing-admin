import { Modal, ModalProps } from "antd";
import React, { ReactNode, useCallback, useMemo, type FC } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import GRButtonText from "../button/GRTextButton";
import GRView from "../view/GRView";

export type tGRModal = {
  footerComponent?: ReactNode;
  okButtonText?: string;
  cancelButtonText?: string;
  showFooter?: boolean;
  onCancel?: (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onOk?: (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  modalOkButtonType?: "submit" | "button" | "reset";
} & Omit<ModalProps, "onOk" | "onCancel">;

const GRModal: FC<tGRModal> = ({
  children,
  footerComponent,
  okButtonText,
  cancelButtonText,
  open,
  closable = false,
  onCancel,
  onOk,
  showFooter = true,
  title,
  maskClosable = true,
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

  const onOkClickButton = useCallback(
    (
      e:
        | React.MouseEvent<HTMLAnchorElement, MouseEvent>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      onOk?.(e);
    },
    [onOk]
  );

  const _renderFooter = useMemo(() => {
    if (!!footerComponent || !showFooter) return [];
    return [
      <GRButtonText
        key={"cancel-button"}
        buttonType={"cancel"}
        onClick={onCancelClickButton}
      >
        {cancelButtonText ?? "취소"}
      </GRButtonText>,
      <GRButtonText
        key={"ok-button"}
        onClick={onOkClickButton}
        htmlType={"submit"}
      >
        {okButtonText ?? "확인"}
      </GRButtonText>
    ];
  }, [
    footerComponent,
    showFooter,
    onCancelClickButton,
    cancelButtonText,
    onOkClickButton,
    okButtonText
  ]);

  const renderModalHeader = useCallback(() => {
    if (title) {
      return (
        <GRView borderbottom={0.5} padding={GRStylesConfig.BASE_PADDING}>
          {title}
        </GRView>
      );
    }
  }, [title]);

  return (
    <Modal
      open={open}
      onOk={onOkClickButton}
      onCancel={onCancelClickButton}
      closable={closable}
      footer={_renderFooter}
      maskClosable={maskClosable}
      bodyStyle={{
        padding: "1rem"
      }}
      title={renderModalHeader()}
      {...props}
    >
      {children}
    </Modal>
  );
};

export default GRModal;
