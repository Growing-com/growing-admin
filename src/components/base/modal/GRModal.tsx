import { Modal, ModalProps } from 'antd';
import React, { useCallback, type FC, ReactNode } from 'react';
import { map } from 'lodash';
import GRButton from '../button/GRButton';
import GRFlexView from '../view/GRFlexView';

type tGRModal = {
  footerComponent: ReactNode;
  okButtonText: string;
  cancelButtonText: string;
} & ModalProps;

const GRModal: FC<tGRModal> = ({
    children,
    footerComponent,
    okButtonText,
    cancelButtonText,
    open,
    maskClosable = false,
    onCancel,
    onOk
}) => {
  
  const onCancelClickButton = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> & React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onCancel?.(e)
  }

  const onOkClickButton = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> & React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onOk?.(e);
  }

  return (
    <Modal 
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      maskClosable={maskClosable}
      footer={[]}
    >
        {children}
        {footerComponent}
        <GRFlexView>
          <GRButton onClick={onCancelClickButton} key={"modal-cancel-button"}>
            {cancelButtonText}
          </GRButton>,
          <GRButton onClick={onOkClickButton} key={"modal-ok-button"}>
            {okButtonText}
          </GRButton>
        </GRFlexView>
    </Modal>
  )
}

export default GRModal;
