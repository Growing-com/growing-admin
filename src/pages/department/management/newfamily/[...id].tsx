import GRAlert from "@component/atom/alert/GRAlert";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import HeaderView from "@component/molecule/view/HeaderView";
import { useUserMutate } from "api/account/mutate/useUserMutate";
import { SEX_OPTIONS } from "config/const";
import dayjs from "dayjs";
import { useTermInfoOptionQueries } from "hooks/queries/term/useTermInfoOptionQueries";
import { trim } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";

const NewFamliyDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // 수정페이지랑 같이 사용할 경우 변수를 하나 생성해서 그 변수에 따라 조절하는 것이 좋아보임
  const isCreate = useMemo(() => {
    if (id) return id[0] === "create";
  }, [id]);

  const { newFamilyLeaderOptions } = useTermInfoOptionQueries();
  const { createUserMutateAsync } = useUserMutate();
  const { control, handleSubmit } = useForm();

  const onClickSubmit: SubmitHandler<FieldValues> = useCallback(
    async _item => {
      const _format = {
        ..._item,
        name: trim(_item?.name),
        ...(_item?.birth && {
          birth: dayjs(_item.birth).format(DEFAULT_DATE_FOMAT)
        }),
        ...(_item?.visitDate && {
          visitDate: dayjs(_item.visitDate).format(DEFAULT_DATE_FOMAT)
        }),
        termId: 1,
        visitTermId: 1
      };
      try {
        if (isCreate) {
          await createUserMutateAsync(_format);
        }
        GRAlert.success(isCreate ? "생성 성공" : "수정 성공");
        router.back();
      } catch (e: any) {
        GRAlert.error(
          `수정 실패, 다시 한번 시도해 주세요 ${
            e?.message ? `${e?.message}` : ""
          }`
        );
      }
    },
    [createUserMutateAsync, isCreate]
  );

  return (
    <>
      <HeaderView title={"지체 등록"} disabledBackbutton />
      <GRContainerView>
        <form onSubmit={handleSubmit(onClickSubmit)}>
          <GRFlexView>
            <GRFlexView flexDirection={"row"} style={{ marginBottom: "1rem" }}>
              <GRFormItem
                type={"text"}
                title={"이름"}
                fieldName={"name"}
                placeholder={"이름을 작성해 주세요"}
                control={control}
                required={true}
                containStyle={{ marginRight: "1rem" }}
              />
              <GRFormItem
                type={"text"}
                textType={"number"}
                title={"학년"}
                fieldName={"grade"}
                placeholder={"학년 숫자만 작성해주세요"}
                maxLength={2}
                control={control}
                required={true}
                containStyle={{ marginRight: "1rem" }}
              />
              <GRFormItem
                type={"radio"}
                title={"성별"}
                fieldName={"sex"}
                options={SEX_OPTIONS}
                control={control}
                required={true}
              />
            </GRFlexView>
            <GRFlexView flexDirection={"row"} style={{ marginBottom: "1rem" }}>
              <GRFormItem
                type={"text"}
                textType={"phoneNumber"}
                title={"전화번호"}
                fieldName={"phoneNumber"}
                placeholder={"- 없이 작성해 주세요"}
                maxLength={13}
                control={control}
                required={true}
                containStyle={{ marginRight: "1rem" }}
              />
              <GRFormItem
                type={"date"}
                pickerType={"basic"}
                title={"생년월일"}
                fieldName={"birth"}
                placeholder={"생년월일을 선택해 주세요"}
                control={control}
                containStyle={{ marginRight: "1rem" }}
              />
              <GRFormItem
                type={"date"}
                pickerType={"basic"}
                title={"방문일"}
                fieldName={"visitDate"}
                placeholder={"방문일을 선택해 주세요"}
                control={control}
              />
            </GRFlexView>
            <GRFlexView style={{ marginBottom: "1rem" }}>
              {/* Todo: 상세 페이지와 분기점 */}
              <GRFormItem
                type={"select"}
                title={"새가족 순장"}
                fieldName={"teamId"}
                control={control}
                options={newFamilyLeaderOptions}
                disabled={!isCreate}
                isShow={isCreate}
                placeholder={"새가족 리더를 선택해주세요"}
                required={true}
              />
            </GRFlexView>
            <GRFlexView style={{ marginBottom: "1rem" }}>
              <GRFormItem
                style={{
                  height: "8rem"
                }}
                type={"text"}
                textType={"textarea"}
                title={"기타 사항"}
                fieldName={"etc"}
                control={control}
                placeholder={"추가 내용이 있으면 작성해 주세요"}
              />
            </GRFlexView>
            <GRFlexView flexDirection={"row"} justifyContent={"flex-end"}>
              <GRButtonText htmlType={"submit"}>
                {isCreate ? "생성" : "수정"}
              </GRButtonText>
            </GRFlexView>
          </GRFlexView>
        </form>
      </GRContainerView>
    </>
  );
};

export default NewFamliyDetailPage;
