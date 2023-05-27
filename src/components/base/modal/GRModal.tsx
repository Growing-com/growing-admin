import { Modal, ModalProps } from 'antd';
import React, { useCallback, type FC, ReactNode } from 'react';
import { map } from 'lodash';
import GRButton from '../button/GRButton';
import GRFlexView from '../view/GRFlexView';

export type tGRModal = {
  footerComponent?: ReactNode;
  okButtonText?: string;
  cancelButtonText?: string;
} & ModalProps;

const GRModal: FC<tGRModal> = ({
    children,
    footerComponent,
    okButtonText,
    cancelButtonText,
    open,
    closable = false,
    onCancel,
    onOk,
    ...props
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
      closable={closable}
      footer={[]}
      {...props}
    >
        {children}
        {footerComponent}
    </Modal>
  )
}

export default GRModal;
