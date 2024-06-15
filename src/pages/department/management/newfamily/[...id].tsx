import GRButtonText from "@component/atom/button/GRTextButton";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import HeaderView from "@component/molecule/view/HeaderView";
import { SEX_OPTIONS } from "config/const";
import { useTermInfoOptionQueries } from "hooks/queries/term/useTermInfoOptionQueries";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

const NewFamliyDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const ids = useMemo(() => {
    return Array.isArray(id) ? id : [];
  }, [id]);
  const isCreate = useMemo(() => {
    const firstId = ids[0];
    return firstId === "create";
  }, [ids]);

  const { newFamilyLeaderOptions } = useTermInfoOptionQueries();
  const { control } = useForm();

  return (
    <>
      <HeaderView title={"지체 등록"} disabledBackbutton />
      <GRContainerView>
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
      </GRContainerView>
    </>
  );
};

export default NewFamliyDetailPage;
