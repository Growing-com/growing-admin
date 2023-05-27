import GRButton from '@component/base/button/GRButton';
import GRForm from '@component/modules/form/GRForm';
import GRFormModal from '@component/base/modal/GRFormModal';
import GRModal from '@component/base/modal/GRModal';
import GRText from '@component/base/text/GRText';
import GRTextInput from '@component/base/text/GRTextInput';
import GRFlexView from '@component/base/view/GRFlexView';
import GRView from '@component/base/view/GRView';
import React, { FC, useCallback } from 'react'
import { useForm } from "react-hook-form";

type tAccountModal = {
    open: boolean;
    onClick: () => void;
}

const AccountModal: FC<tAccountModal> = ({
    open,
    onClick,
}) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onOkClick = useCallback(() => {
        // onAccountModal?.()
    },[])

    return (
        <GRFormModal 
            open={open}
            footerComponent={undefined} 
            okButtonText={'완료'} 
            cancelButtonText={'취소'} 
            onOk={onOkClick}
            onCancel={onClick}
        >
            <GRFlexView flexDirection={"row"}>
                <GRText>이름</GRText>
                <GRTextInput {...register("name")}/>
                <GRText>비밀번호</GRText>
            </GRFlexView>
            <GRButton htmlType={"submit"}>
                완료
            </GRButton>
        </GRFormModal>
    )
}

export default AccountModal;
