import { Modal, ModalProps } from 'antd';
import React, { useCallback, type FC, ReactNode } from 'react';
import { map } from 'lodash';
import GRButton from '../button/GRButton';

type tFooterComponent = {
  onClick: (e) => void;
  text: string;
}

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

  return (
    <Modal 
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      maskClosable={maskClosable}
      footer={[
        <GRButton onClick={onCancel} key={"modal-cancel-button"}>
          {cancelButtonText}
        </GRButton>,
        <GRButton onClick={onOk} key={"modal-ok-button"}>
          {okButtonText}
        </GRButton>
      ]}
    >
        {children}
        {footerComponent}
    </Modal>
  )
}

export default GRModal;