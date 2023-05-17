import { Modal, ModalProps } from 'antd';
import React, { useCallback, type FC, ReactNode } from 'react';
import { map } from 'lodash';
import GRButton from '../button/GRButton';

type tFooterComponent = {
  onClick: (e) => void;
  text: string;
}

type tGRFormModal = {
  footerComponent: ReactNode;
  okButtonText: string;
  cancelButtonText: string;
} & ModalProps;

const GRFormModal: FC<tGRFormModal> = ({
    children,
    footerComponent,
    okButtonText,
    cancelButtonText,
    open,
    maskClosable = false,
    onCancel,
    onOk
}) => {
  
  const _footrComponent = useCallback(() =>{
      return map( footerComponent, (com: tFooterComponent) => {
        const { onClick, text } = com;
        return (
          <GRButton
            onClick={onClick}
          >
            {text ?? "!"}
          </GRButton>
        )
      })
  },[footerComponent])

  const onClickCancel = useCallback((e)=>{
    onCancel?.(e)
  },[onCancel])

  const onClickOk = useCallback((e)=>{
    onOk?.(e)
  },[onOk])

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
