import { Modal, ModalProps } from "antd";
import React, { ReactNode, useMemo, type FC } from "react";
import GRButtonText from "../button/GRTextButton";

export type tGRFormModal = {
  footerComponent?: ReactNode;
  okButtonText?: string;
  cancelButtonText?: string;
  showFooter?: boolean;
  onCancel: (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onOk: (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  modalOkButtonType?: "submit" | "button" | "reset";
} & Omit<ModalProps, "onOk" | "onCancel">;

const GRFormModal: FC<tGRFormModal> = ({
  children,
  footerComponent,
  okButtonText,
  cancelButtonText,
  open,
  closable = false,
  onCancel,
  onOk,
  modalOkButtonType,
  showFooter = true,
  ...props
}) => {
  const _htmlType = useMemo(
    () => (modalOkButtonType ? modalOkButtonType : "button"),
    [modalOkButtonType]
  );

  const onCancelClickButton = (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onCancel?.(e);
  };

  const onOkClickButton = (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onOk?.(e);
  };

  const _renderFooter = useMemo(() => {
    if (footerComponent || !showFooter) return [];
    return [
      <GRButtonText
        key={"cancel-button"}
        buttonType={"cancel"}
        onClick={onCancelClickButton}
      >
        취소
      </GRButtonText>,
      <GRButtonText
        key={"ok-button"}
        onClick={onOkClickButton}
        htmlType={_htmlType}
      >
        확인
      </GRButtonText>
    ];
  }, [
    showFooter,
    footerComponent,
    _htmlType,
    onCancelClickButton,
    onOkClickButton,
    onOk,
    onCancel
  ]);

  return (
    <Modal
      open={open}
      onOk={onOkClickButton}
      onCancel={onCancelClickButton}
      closable={closable}
      footer={[]}
      {...props}
    >
      {children}
      {_renderFooter}
    </Modal>
  );
};

export default GRFormModal;
