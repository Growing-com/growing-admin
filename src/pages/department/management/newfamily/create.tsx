import GRButtonText from "@component/atom/button/GRTextButton";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import HeaderView from "@component/molecule/view/HeaderView";
import { SEX_OPTIONS } from "config/const";
import { NextPage } from "next";
import { useForm } from "react-hook-form";

const ManagementNewFamilyCreatePage: NextPage = () => {
  const { control, handleSubmit, reset } = useForm();

  const onClickCreateNewFamilyModal = () => {};

  return (
    <>
      <HeaderView
        title={"새가족 관리"}
        showIcon={false}
        disabledBackbutton={true}
        headerComponent={
          <GRButtonText
            onClick={onClickCreateNewFamilyModal}
            buttonType={"default"}
            size={"large"}
          >
            지체 등록
          </GRButtonText>
        }
      />
      <GRContainerView>
        <GRFlexView alignItems={"center"} flexDirection={"row"}>
          <GRFormItem
            type={"text"}
            textType={"input"}
            title={"이름"}
            fieldName={"name"}
            control={control}
            placeholder={"이름을 작성해 주세요"}
            required={true}
            containStyle={{ marginRight: "1rem" }}
          />
          <GRFormItem
            type={"text"}
            textType={"number"}
            title={"학년"}
            fieldName={"grade"}
            control={control}
            placeholder={"학년 숫자만 작성해주세요"}
            required={true}
            containStyle={{ marginRight: "1rem" }}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            type={"text"}
            textType={"phoneNumber"}
            title={"전화번호"}
            fieldName={"phoneNumber"}
            control={control}
            placeholder={"- 없이 작성해 주세요"}
            maxLength={13}
            required={true}
            containStyle={{ marginRight: "1rem" }}
          />
          <GRFormItem
            type={"date"}
            title={"생년월일"}
            fieldName={"birth"}
            pickerType={"basic"}
            control={control}
            placeholder={"생년월일을 선택해 주세요"}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            type={"date"}
            pickerType={"basic"}
            title={"방문일"}
            fieldName={"visitDate"}
            control={control}
            placeholder={"방문일을 선택해 주세요"}
          />
          <GRFormItem
            type={"radio"}
            title={"성별"}
            fieldName={"sex"}
            control={control}
            options={SEX_OPTIONS}
            required={true}
          />
        </GRFlexView>
        <GRFormItem
            type={"text"}
            textType={"input"}
            title={"학교/학과/학년"}
            fieldName={"name"}
            control={control}
            placeholder={"학교/학과/학년 을 작성해 주세요"}
            required={true}
            containStyle={{ marginRight: "1rem" }}
          />
          <GRFormItem
            type={"text"}
            textType={"input"}
            title={"현재 사는 곳 "}
            fieldName={"name"}
            control={control}
            placeholder={"현재 사는 곳을 작성해 주세요"}
            required={true}
            containStyle={{ marginRight: "1rem" }}
          />
          <GRFormItem
            type={"text"}
            textType={"input"}
            title={"인도자"}
            fieldName={"name"}
            control={control}
            placeholder={"인도자을 작성해 주세요"}
            required={true}
            containStyle={{ marginRight: "1rem" }}
          />
         
      </GRContainerView>
    </>
  );
};

export default ManagementNewFamilyCreatePage;
