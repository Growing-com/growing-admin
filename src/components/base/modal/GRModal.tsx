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
  title: string;
} & Omit<ModalProps, "onOk" | "onCancel" | "title">;

const GRModal: FC<tGRModal> = ({
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
  title,
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
    onOkClickButton
  ]);

  const renderModalHeader = useCallback(() => {
    return (
      <GRView borderBottom={0.5} padding={GRStylesConfig.BASE_PADDING}>
        {title}
      </GRView>
    );
  }, []);

  return (
    <Modal
      open={open}
      onOk={onOkClickButton}
      onCancel={onCancelClickButton}
      closable={closable}
      footer={_renderFooter}
      {...props}
      title={renderModalHeader()}
    >
      {children}
    </Modal>
  );
};

export default GRModal;
