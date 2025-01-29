import GRTextButton from "@component/atom/button/GRTextButton";
import GRModal from "@component/atom/modal/GRModal";
import GRFlexView from "@component/atom/view/GRFlexView";
import { ModalProps } from "antd";
import React, { FormEventHandler, ReactNode, useCallback, type FC } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";

export type tGRFormModal = {
  titleInfoType?: "success" | "info" | "warning" | "error";
  titleInfo?: ReactNode;
  showIcon?: boolean;
  okButtonText?: string;
  cancelButtonText?: string;
  deleteButtonText?: string;
  isShowDeleteButton?: boolean;
  onCancel?: (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onDelete?: () => void;
} & Omit<ModalProps, "onOk" | "onCancel">;

const GRFormModal: FC<tGRFormModal> = ({
  children,
  okButtonText,
  cancelButtonText,
  deleteButtonText,
  isShowDeleteButton = false,
  open,
  closable = false,
  onCancel,
  onSubmit,
  onDelete,
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

  const onDeleteClickButton = () => {
    onDelete?.();
  };

  const preventEnterKeySubmission = (
    e: React.KeyboardEvent<HTMLFormElement>
  ) => {
    const target = e.target;
    if (e.key === "Enter" && target instanceof HTMLInputElement) {
      e.preventDefault();
    }
  };

  return (
    <GRModal
      open={open}
      closable={closable}
      footer={[]}
      title={title}
      onCancel={onCancelClickButton}
      {...props}
      styles={{
        body: {
          padding: "1rem",
          paddingBottom: "0rem"
        }
      }}
    >
      <form onSubmit={onSubmit} onKeyDown={preventEnterKeySubmission}>
        {children}
        <GRFlexView flexDirection={"row"} justifyContent={"space-between"} margintop={GRStylesConfig.FORM_BLOCK_BASE_MARGIN} >
          {isShowDeleteButton && (
            <GRFlexView>
              <GRTextButton
                key={"delete-button"}
                buttonType={"custom"}
                onClick={onDeleteClickButton}
                marginright={GRStylesConfig.BASE_MARGIN}
                backgroundColor={Color.red300}
                textColor={"white"}
                textSize={"b7"}
              >
                {deleteButtonText ?? "삭제"}
              </GRTextButton>
            </GRFlexView>
          )}
          <GRFlexView flexDirection={"row"} justifyContent={"flex-end"}>
            <GRTextButton
              key={"cancel-button"}
              buttonType={"cancel"}
              onClick={onCancelClickButton}
              marginright={GRStylesConfig.BASE_MARGIN}
            >
              {cancelButtonText ?? "취소"}
            </GRTextButton>
            <GRTextButton key={"ok-button"} htmlType={"submit"}>
              {okButtonText ?? "확인"}
            </GRTextButton>
          </GRFlexView>
        </GRFlexView>
      </form>
    </GRModal>
  );
};

export default GRFormModal;
