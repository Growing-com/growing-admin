import { Modal, ModalProps } from 'antd';
import React, { useCallback, type FC, ReactNode } from 'react';
import { map } from 'lodash';
import GRButton from '../button/GRButton';

type tFooterComponent = {
  onClick: (e) => void;
  text: string;
}

type tGRModal = {
  footerComponent: tFooterComponent[];
} & ModalProps;

const GRModal: FC<tGRModal> = ({
    children,
    footerComponent,
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
      open={true}
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <GRButton onClick={onCancel}>
          cancel
        </GRButton>,
        <GRButton onClick={onOk}>
          Ok
        </GRButton>
      ]}
    >
        {children}
    </Modal>
  )
}

export default GRModal;
