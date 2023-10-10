import GRAlert from "@component/atom/alert/GRAlert";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRSelect from "@component/atom/dataEntry/GRSelect";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormTitle from "@component/molecule/form/GRFormTitle";
import GRFormModal from "@component/molecule/modal/GRFormModal";
import { Alert } from "antd";
import { useUserMutate } from "api/account/mutate/useUserMutate";
import { tAccount } from "api/account/types";
import { tTermNewFamily } from "api/term/types";
import { GENDER_OPTIONS } from "config/const";
import dayjs, { Dayjs } from "dayjs";
import { useTermInfoOptionQueries } from "hooks/queries/term/useTermInfoOptionQueries";
import { FC, useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import GRStylesConfig from "styles/GRStylesConfig";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";

type tNewFamilyDetailModal = {
  newFamily?: tTermNewFamily;
  open: boolean;
  onClose: () => void;
};

type tNewFamilyForm = {
  visitDate: Dayjs;
  birth: Dayjs;
} & Omit<tTermNewFamily, "visitDate" | "birth">;

const NewFamilyDetailModal: FC<tNewFamilyDetailModal> = ({
  open,
  onClose,
  newFamily
}) => {
  const [newFamilySelectedLeaderId, setNewFamilySelectedLeaderId] =
    useState<number>();
  const [disableSelectNewFamily] = useState<boolean>(false);

  const { control, handleSubmit, reset } = useForm<tNewFamilyForm>();

  const { updateUserMutateAsync } = useUserMutate();
  const { newFamilyLeaderOption } = useTermInfoOptionQueries();
  // const { mutateAsync: newFamilyLineUpMutateAsync } = useNewFamilyLineUp();

  const onCloseModal = useCallback(() => {
    onClose?.();
    reset();
  }, [onClose, reset]);

  const onClickModalOk: SubmitHandler<FieldValues> = useCallback(
    async _item => {
      const _format = {
        ..._item,
        birth: dayjs(_item.birth).format(DEFAULT_DATE_FOMAT),
        visitDate: dayjs(_item.visitDate).format(DEFAULT_DATE_FOMAT)
      };
      try {
        await updateUserMutateAsync({
          userId: newFamily?.userId,
          data: _format as tAccount
        });
        GRAlert.success("수정 성공");
        onCloseModal();
      } catch (e) {
        GRAlert.error("수정 실패, 다시 한번 시도해 주세요");
      }
    },
    [newFamily?.userId, onCloseModal, updateUserMutateAsync]
  );

  const onChangeNewFamilySelect = useCallback((_newFamilyLeader: number) => {
    setNewFamilySelectedLeaderId(_newFamilyLeader);
  }, []);

  const onClickLineUpButton = useCallback(async () => {
    console.log("newFamily", newFamily);
    if (!newFamilySelectedLeaderId) {
      GRAlert.error("새가족 리더를 선택해주세요");
      return;
    }
    // try {
    //   if (confirm("라인업 후에 변경 불가능합니다, 진행하시겠습니까?")) {
    //     // await newFamilyLineUpMutateAsync({
    //     //   teamId,
    //     //   teamMemberId,
    //     //   data
    //     // });
    //     setDisableSelectNewFamily(true);
    //   }
    // } catch (e) {
    //   GRAlert.error("라인업 오류");
    // }
  }, [newFamily, newFamilySelectedLeaderId]);

  useEffect(() => {
    if (newFamily) {
      reset({
        ...newFamily,
        birth: dayjs(newFamily.birth),
        visitDate: dayjs(newFamily.visitDate)
      });
    }
  }, [newFamily, reset]);

  return (
    <GRFormModal
      open={open}
      onCancel={onCloseModal}
      onSubmit={handleSubmit(onClickModalOk)}
      title={"새가족 상세"}
      width={"60%"}
      okButtonText={"수정"}
    >
      <GRView flexDirection={"row"}>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            type={"text"}
            textType={"input"}
            title={"이름"}
            fieldName={"name"}
            control={control}
            placeholder={"이름을 작성해 주세요"}
            disabled={true}
          />
          <GRFormItem
            type={"radio"}
            title={"성별"}
            fieldName={"sex"}
            control={control}
            options={GENDER_OPTIONS}
            disabled={true}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            type={"text"}
            textType={"input"}
            title={"전화번호"}
            fieldName={"phoneNumber"}
            control={control}
            placeholder={"- 없이 작성해 주세요"}
            maxLength={11}
            disabled={true}
          />
          <GRFormItem
            type={"date"}
            title={"생년월일"}
            fieldName={"birth"}
            pickerType={"basic"}
            control={control}
            placeholder={"생년월일을 선택해 주세요"}
            disabled={true}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            type={"text"}
            textType={"number"}
            title={"학년"}
            fieldName={"grade"}
            control={control}
            placeholder={"학년 숫자만 작성해주세요"}
            disabled={true}
          />
          <GRFormItem
            type={"date"}
            pickerType={"basic"}
            title={"방문일"}
            fieldName={"visitDate"}
            control={control}
            placeholder={"방문일을 선택해 주세요"}
            disabled={true}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFlexView flexDirection={"row"}>
            <GRFormTitle title={"라인업"} />
            <GRSelect
              style={{ flex: 1 }}
              value={newFamilySelectedLeaderId}
              options={newFamilyLeaderOption}
              onChange={onChangeNewFamilySelect}
              placeholder={"새가족 리더를 선택해주세요"}
              disabled={disableSelectNewFamily}
            />
            <GRButtonText
              marginleft={GRStylesConfig.BASE_MARGIN}
              onClick={onClickLineUpButton}
            >
              라인업
            </GRButtonText>
          </GRFlexView>
          <GRFlexView>
            <Alert
              type={"warning"}
              message={"새가족 라인업을 진행하면 변경 불가능합니다"}
              style={{ backgroundColor: "white" }}
              showIcon
              banner={true}
            />
          </GRFlexView>
        </GRFlexView>
        <GRFlexView>
          <GRFormItem
            type={"text"}
            textType={"textarea"}
            title={"추가 내용"}
            fieldName={"etc"}
            control={control}
            placeholder={"추가 내용이 있으면 작성해 주세요"}
          />
        </GRFlexView>
      </GRView>
    </GRFormModal>
  );
};

export default NewFamilyDetailModal;
