import GRButtonText from "@component/atom/button/GRTextButton";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import HeaderView from "@component/molecule/view/HeaderView";
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
        <GRFlexView alignItems={"center"}>
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
      </GRContainerView>
    </>
  );
};

export default ManagementNewFamilyCreatePage;
