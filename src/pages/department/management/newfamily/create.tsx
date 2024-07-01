import { MoreOutlined } from "@ant-design/icons";
import GRButton from "@component/atom/button/GRButton";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRInfoBadge from "@component/molecule/GRInfoBadge";
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormTitle from "@component/molecule/form/GRFormTitle";
import HeaderView from "@component/molecule/view/HeaderView";
import { useMutation } from "@tanstack/react-query";
import { Divider } from "antd";
import { createNewFamily } from "apiV2/newFamily";
import { tNewFamilyV2 } from "apiV2/newFamily/type";
import {
  BELIEVE_STATUS_OPTIONS,
  SEX_OPTIONS,
  THERE_OPTIONS,
  VISIT_REASON_OPTIONS,
  YES_NO_OPTIONS
} from "config/const";
import { Dayjs } from "dayjs";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
import { convertDateStringByDefaultForm } from "utils/DateUtils";

const FORM_TITLE_WIDTH = 10;

const ManagementNewFamilyCreatePage: NextPage = () => {
  const { control, handleSubmit, reset } = useForm<tNewFamilyV2>();
  const router = useRouter();

  const { mutateAsync } = useMutation(createNewFamily, {
    onError: error => {
      console.log("error", error);
    },
    onSuccess: () => {
      router.back();
    }
  });

  const onClickCreateNewFamilyModal = () => {};

  const onRegisterNewFamily = handleSubmit(async (_value: tNewFamilyV2) => {
    await mutateAsync({
      ..._value,
      birth: convertDateStringByDefaultForm(_value.birth as unknown as Dayjs),
      visitDate: convertDateStringByDefaultForm(
        _value.visitDate as unknown as Dayjs
      )
    });
  });

  return (
    <>
      <HeaderView
        title={"새가족 등록"}
        showIcon={false}
        disabledBackbutton={true}
        headerComponent={
          <>
            <GRButton
              onClick={onClickCreateNewFamilyModal}
              buttonType={"primary"}
            >
              <MoreOutlined
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: Color.white
                }}
                rev={undefined}
              />
            </GRButton>
          </>
        }
      />
      <GRContainerView>
        <GRFlexView alignItems="center">
          <GRView>
            <GRFlexView
              flexDirection={"row"}
              marginbottom={GRStylesConfig.BASE_MARGIN}
            >
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
              />
            </GRFlexView>
            <GRFlexView
              flexDirection={"row"}
              marginbottom={GRStylesConfig.BASE_MARGIN}
            >
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
            <GRFlexView
              flexDirection={"row"}
              marginbottom={GRStylesConfig.BASE_MARGIN}
            >
              <GRFormItem
                type={"date"}
                pickerType={"basic"}
                title={"방문일"}
                fieldName={"visitDate"}
                control={control}
                placeholder={"방문일을 선택해 주세요"}
                containStyle={{ marginRight: "1rem" }}
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
            <GRFlexView
              marginbottom={GRStylesConfig.BASE_MARGIN}
              flexDirection="row"
            >
              <GRFormTitle
                title={"학교/학과/학년"}
                required={true}
                width={FORM_TITLE_WIDTH}
              />
              <GRFormItem
                type={"text"}
                textType={"input"}
                fieldName={"etc.school"}
                control={control}
                placeholder={"학교/학과/학년 을 작성해 주세요"}
                required={true}
              />
            </GRFlexView>
            <GRFlexView
              marginbottom={GRStylesConfig.BASE_MARGIN}
              flexDirection="row"
            >
              <GRFormTitle
                title={"현재 사는 곳"}
                required={true}
                width={FORM_TITLE_WIDTH}
              />
              <GRFormItem
                type={"text"}
                textType={"input"}
                fieldName={"etc.address"}
                control={control}
                placeholder={"현재 사는 곳을 작성해 주세요"}
                required={true}
              />
            </GRFlexView>
            <GRFlexView
              marginbottom={GRStylesConfig.BASE_MARGIN}
              flexDirection="row"
            >
              <GRFormTitle
                title={"인도자"}
                required={true}
                width={FORM_TITLE_WIDTH}
              />
              <GRFormItem
                type={"text"}
                textType={"input"}
                fieldName={"etc.introducer"}
                control={control}
                placeholder={"인도자을 작성해 주세요"}
                required={true}
              />
            </GRFlexView>
            <GRFlexView
              marginbottom={GRStylesConfig.BASE_MARGIN}
              flexDirection="row"
            >
              <GRFormTitle
                title={"교회가 처음"}
                required={true}
                width={FORM_TITLE_WIDTH}
              />
              <GRFormItem
                type={"radio"}
                fieldName={"etc.isFirstChurch"}
                control={control}
                options={YES_NO_OPTIONS}
                required={true}
              />
            </GRFlexView>
            <GRFlexView
              marginbottom={GRStylesConfig.BASE_MARGIN}
              flexDirection="row"
            >
              <GRFormTitle
                title={"사랑의 교회 대학부에 오게 된 이유"}
                required={true}
                width={FORM_TITLE_WIDTH}
              />
              <GRFormItem
                type={"select"}
                fieldName={"etc.visitReason"}
                control={control}
                options={VISIT_REASON_OPTIONS}
                placeholder={
                  "사랑의 교회 대학부에 오게 된 이유를 선택해 주세요"
                }
              />
            </GRFlexView>
            <GRFlexView
              marginbottom={GRStylesConfig.BASE_MARGIN}
              flexDirection="row"
            >
              <GRFormTitle
                title={"나는 예수님을 (   )"}
                required={true}
                width={FORM_TITLE_WIDTH}
              />
              <GRFormItem
                type={"select"}
                fieldName={"etc.relationshipWithJesus"}
                control={control}
                options={BELIEVE_STATUS_OPTIONS}
                placeholder={
                  "사랑의 교회 대학부에 오게 된 이유를 선택해 주세요"
                }
              />
            </GRFlexView>
            <GRFlexView
              marginbottom={GRStylesConfig.BASE_MARGIN}
              flexDirection="row"
            >
              <GRFormTitle
                title={"나는 구원의 확신이 (   )"}
                required={true}
                width={FORM_TITLE_WIDTH}
              />
              <GRFormItem
                type={"radio"}
                fieldName={"etc.hasCertaintityOfSalvation"}
                control={control}
                options={THERE_OPTIONS}
                required={true}
              />
            </GRFlexView>
            <GRFlexView marginbottom={GRStylesConfig.BASE_MARGIN}>
              <GRFormItem
                title={"기타 사항"}
                type={"text"}
                textType={"textarea"}
                fieldName={"etc.comment"}
                control={control}
                placeholder={"추가 내용이 있으면 작성해 주세요"}
                style={{
                  height: "8rem"
                }}
              />
            </GRFlexView>
            <Divider />
            <GRFlexView
              flexDirection={"row"}
              alignItems={"center"}
              marginbottom={GRStylesConfig.BASE_MARGIN}
            >
              <GRText weight={"bold"} fontSize={"b4"} marginright={0.5}>
                라인업
              </GRText>
              <GRInfoBadge infoMessage={"바로 라인업 할 경우 넣어주세요"} />
            </GRFlexView>
            <GRFlexView
              marginbottom={GRStylesConfig.BASE_MARGIN}
              flexDirection="row"
            >
              <GRFormItem
                title={"나무"}
                type={"text"}
                textType={"input"}
                fieldName={"name"}
                control={control}
                placeholder={"인도자을 작성해 주세요"}
                required={true}
                containStyle={{ marginRight: "1rem" }}
              />
              <GRFormItem
                title={"순장"}
                type={"text"}
                textType={"input"}
                fieldName={"name"}
                control={control}
                placeholder={"인도자을 작성해 주세요"}
                required={true}
                containStyle={{ marginRight: "1rem" }}
              />
            </GRFlexView>
            <Divider />
            <GRFlexView>
              <GRButtonText
                marginright={GRStylesConfig.BASE_MARGIN}
                block
                onClick={onRegisterNewFamily}
              >
                등록
              </GRButtonText>
            </GRFlexView>
          </GRView>
        </GRFlexView>
      </GRContainerView>
    </>
  );
};

export default ManagementNewFamilyCreatePage;
