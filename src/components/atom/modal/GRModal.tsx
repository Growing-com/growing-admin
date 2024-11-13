import { Alert, Modal, ModalProps } from "antd";
import React, { ReactNode, useCallback, useMemo, type FC } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import GRTextButton from "../button/GRTextButton";
import GRText from "../text/GRText";
import GRFlexView from "../view/GRFlexView";
import GRView from "../view/GRView";

export type tGRModal = {
  titleInfoType?: "success" | "info" | "warning" | "error";
  titleInfo?: ReactNode;
  showIcon?: boolean;
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
  titleInfo,
  titleInfoType,
  showIcon = true,
  maskClosable = true,
  keyboard = false,
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
      <GRTextButton
        key={"cancel-button"}
        buttonType={"cancel"}
        onClick={onCancelClickButton}
      >
        {cancelButtonText ?? "취소"}
      </GRTextButton>,
      <GRTextButton
        key={"ok-button"}
        onClick={onOkClickButton}
        htmlType={"submit"}
      >
        {okButtonText ?? "확인"}
      </GRTextButton>
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
          <GRFlexView flexDirection={"row"} alignItems="center">
            {title}
            <GRText fontSize={"b10"}>
              {titleInfo && (
                <Alert
                  showIcon={showIcon}
                  message={titleInfo}
                  type={titleInfoType}
                  style={{ backgroundColor: "white" }}
                  banner={true}
                />
              )}
            </GRText>
          </GRFlexView>
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
      styles={{
        body: {
          padding: "1rem"
        }
      }}
      title={renderModalHeader()}
      keyboard={keyboard}
      {...props}
    >
      {children}
    </Modal>
  );
};

export default GRModal;
