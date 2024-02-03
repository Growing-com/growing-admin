import GRButtonText from "@component/atom/button/GRTextButton";
import GRModal from "@component/atom/modal/GRModal";
import GRFlexView from "@component/atom/view/GRFlexView";
import { ModalProps } from "antd";
import React, { FormEventHandler, useCallback, type FC } from "react";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";

export type tGRFormModal = {
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

  const onDeleteClickButton = () =>{
    onDelete?.()
  }

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
        <GRFlexView flexDirection={"row"} justifyContent={"space-between"}>
          {isShowDeleteButton && (
            <GRFlexView>
              <GRButtonText
                key={"delete-button"}
                buttonType={"custom"}
                onClick={onDeleteClickButton}
                marginright={GRStylesConfig.BASE_MARGIN}
                backgroundColor={Color.red300}
                textColor={"white"}
              >
                {deleteButtonText ?? "삭제"}
              </GRButtonText>
            </GRFlexView>
          )}
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
        </GRFlexView>
      </form>
    </GRModal>
  );
};

export default GRFormModal;
