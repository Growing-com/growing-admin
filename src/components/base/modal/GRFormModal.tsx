import { Modal, ModalProps } from 'antd';
import React, { useCallback, type FC, ReactNode } from 'react';
import { map } from 'lodash';
import GRButton from '../button/GRButton';

type tGRFormModal = {
  footerComponent: ReactNode;
  okButtonText: string;
  cancelButtonText: string;
} & ModalProps;

const GRFormModal: FC<tGRFormModal> = ({
    children,
    open,
    maskClosable = false,
    onCancel,
    onOk
}) => {
  
  return (
    <Modal 
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      maskClosable={maskClosable}
      footer={[]}
    >
        {children}
    </Modal>
  )
}

export default GRFormModal;
