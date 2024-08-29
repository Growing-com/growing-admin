import { MoreOutlined } from "@ant-design/icons";
import GRAlert from "@component/atom/alert/GRAlert";
import GRButton from "@component/atom/button/GRButton";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRInfoBadge from "@component/molecule/GRInfoBadge";
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormTitle from "@component/molecule/form/GRFormTitle";
import GRAlertModal from "@component/molecule/modal/GRAlertModal";
import HeaderView from "@component/molecule/view/HeaderView";
import { NewFamilyLineUpModal } from "@component/pages/department/management/newfamily/NewFamilyLineUpModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Divider, Dropdown, MenuProps } from "antd";
import queryKeys from "api/queryKeys";
import { getNewFamily, updateNewFamily } from "apiV2/newFamily";
import { useNewFamilyLineOutMutate } from "apiV2/newFamily/mutate/useNewfamilyLineOutMutate";
import {
  tLineUpNewFamilyV2,
  tNewFamilyEtcV2,
  tNewFamilyV2
} from "apiV2/newFamily/type";
import {
  BELIEVE_STATUS_OPTIONS,
  SEX_OPTIONS,
  THERE_OPTIONS,
  VISIT_REASON_OPTIONS,
  YES_NO_OPTIONS
} from "config/const";
import dayjs, { Dayjs } from "dayjs";
import useTerm from "hooks/api/term/useTerm";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
import { convertDateStringByDefaultForm } from "utils/DateUtils";
import { handleError } from "utils/error";
import { REGEXP_GRADE_NUM, REGEXP_PHONE_HYPHEN_PATTERN } from "utils/regexp";

const FORM_TITLE_WIDTH = 10;

type tNewFamilyEtcForm = {
  hasCertaintityOfSalvation: string;
  isFirstChurch: string;
} & Omit<tNewFamilyEtcV2, "hasCertaintityOfSalvation" | "isFirstChurch">;

type tNewFamilyForm = {
  visitDate: Dayjs;
  birth: Dayjs;
  etc: tNewFamilyEtcForm;
} & Omit<tNewFamilyV2, "visitDate" | "birth" | "etc">;

const ManagementNewFamilyUpdatePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const [isOpenLineupModal, setIsOpenLineupModal] = useState(false);
  const [isOpenLineOutModal, setIsOpenLineOutModal] = useState(false);
  const [newFamilyLineUpData, setNewFamilyLineUpData] = useState<
    tLineUpNewFamilyV2[]
  >([]);
  const { control, handleSubmit, reset } = useForm<tNewFamilyForm>();

  const { termNewFamilyLeader, termNewFamilyLeaderOptions } = useTerm({
    termId: 1
  });
  const { lineOutNewFamilyMutateAsync } = useNewFamilyLineOutMutate();

  const numericId = id ? Number(id) : null;

  const { data: newFamilyDetailData } = useQuery(
    [queryKeys.NEW_FAMILY_DETAIL_V2, numericId],
    async () => {
      if (numericId === null || isNaN(numericId)) {
        throw new Error("Invalid ID");
      }
      return await getNewFamily(numericId);
    },
    {
      select: _data => _data.content,
      enabled: numericId !== null,
      onSuccess: data => {
        reset({
          ...data,
          etc: {
            ...data.etc,
            isFirstChurch: data.etc.isFirstChurch ? "true" : "false",
            hasCertaintityOfSalvation: data.etc.hasCertaintityOfSalvation
              ? "true"
              : "false"
          },

          // 달력의 경우 setValue를 하기 위해서는 dayjs로 변환해야 한다.
          birth:
            data.birth && data?.birth !== "1970-01-01"
              ? dayjs(data.birth)
              : undefined,
          visitDate:
            data?.visitDate && data?.visitDate !== "1970-01-01"
              ? dayjs(data?.visitDate)
              : undefined,
          newFamilyGroupId: termNewFamilyLeader?.find(
            leader =>
              data.newFamilyGroupLeaderName === leader.newFamilyGroupLeaderName
          )?.newFamilyGroupId
        });
        setNewFamilyLineUpData([data]);
      },
      onError: error => {
        console.log("새가족 정보가 로드되지 않았습니다.");
        console.log(error);
      }
    }
  );

  const { mutateAsync } = useMutation(updateNewFamily, {
    onError: error => {
      handleError(error, "지체 수정 오류");
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.NEW_FAMILY_V2]);
      GRAlert.success("지체 수정 완료");
    }
  });

  const convertStringToBoolean = (string: string) => {
    return string === "true";
  };

  const onUpdateNewFamily = handleSubmit(async (_value: tNewFamilyForm) => {
    await mutateAsync({
      ..._value,
      etc: {
        ..._value.etc,
        isFirstChurch: convertStringToBoolean(_value.etc.isFirstChurch),
        hasCertaintityOfSalvation: convertStringToBoolean(
          _value.etc.hasCertaintityOfSalvation
        )
      },
      birth: convertDateStringByDefaultForm(_value.birth as unknown as Dayjs),
      visitDate: convertDateStringByDefaultForm(
        _value.visitDate as unknown as Dayjs
      )
    });
  });

  const onOkLineOutClickButton = async () => {
    if (newFamilyDetailData) {
      try {
        await lineOutNewFamilyMutateAsync(newFamilyDetailData.newFamilyId);
        router.back();
      } catch (error) {
        handleError(error, "라인아웃 에러");
      }
    } else {
      console.error("새가족 정보를 불러오지 못했습니다.");
    }
  };

  const onClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "LineUp":
        setIsOpenLineupModal(true);
        break;
      case "LineOut":
        setIsOpenLineOutModal(true);
        break;
      default:
        break;
    }
  };

  // style을 적용하고 싶으면 label에 컴포넌트를 넣고 적용
  const items: MenuProps["items"] = [
    {
      label: "라인업",
      key: "LineUp"
    },
    {
      label: "라인아웃",
      key: "LineOut",
      danger: true
    }
  ];

  return (
    <>
      <HeaderView
        title={"새가족 수정"}
        showIcon={false}
        disabledBackbutton={true}
        headerComponent={
          <Dropdown
            menu={{ items, onClick }}
            trigger={["click"]}
            placement={"bottomRight"}
            overlayStyle={{ minWidth: "90px" }}
            overlayClassName="custom-dropdown"
          >
            <GRButton buttonType={"primary"}>
              <MoreOutlined
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: Color.white
                }}
                rev={undefined}
              />
            </GRButton>
          </Dropdown>
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
                textType={"name"}
                title={"이름"}
                fieldName={"name"}
                control={control}
                placeholder={"이름을 작성해 주세요"}
                rules={{ required: "이름은 필수입니다." }}
                containStyle={{ marginRight: "1rem" }}
              />
              <GRFormItem
                type={"text"}
                textType={"number"}
                title={"학년"}
                fieldName={"grade"}
                control={control}
                placeholder={"학년 숫자만 작성해주세요"}
                maxLength={2}
                rules={{
                  required: "학년은 필수 입니다.",
                  pattern: {
                    value: REGEXP_GRADE_NUM,
                    message: "1학년부터 19학년까지 입력하세요."
                  }
                }}
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
                rules={{
                  required: {
                    value: true,
                    message: "전화번호는 필수입니다."
                  },
                  pattern: {
                    value: REGEXP_PHONE_HYPHEN_PATTERN,
                    message: "010-1234-5678 형식으로 입력하세요."
                  }
                }}
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
                rules={{ required: "방문일은 필수 입니다." }}
              />
              <GRFormItem
                type={"radio"}
                title={"성별"}
                fieldName={"sex"}
                control={control}
                options={SEX_OPTIONS}
                rules={{ required: "성별은 필수 입니다." }}
              />
            </GRFlexView>
            <GRFlexView
              marginbottom={GRStylesConfig.BASE_MARGIN}
              flexDirection="row"
            >
              <GRFormTitle title={"학교/학과/학년"} width={FORM_TITLE_WIDTH} />
              <GRFormItem
                type={"text"}
                textType={"input"}
                fieldName={"etc.school"}
                control={control}
                placeholder={"학교/학과/학년 을 작성해 주세요"}
              />
            </GRFlexView>
            <GRFlexView
              marginbottom={GRStylesConfig.BASE_MARGIN}
              flexDirection="row"
            >
              <GRFormTitle title={"현재 사는 곳"} width={FORM_TITLE_WIDTH} />
              <GRFormItem
                type={"text"}
                textType={"input"}
                fieldName={"etc.address"}
                control={control}
                placeholder={"현재 사는 곳을 작성해 주세요"}
              />
            </GRFlexView>
            <GRFlexView
              marginbottom={GRStylesConfig.BASE_MARGIN}
              flexDirection="row"
            >
              <GRFormTitle title={"인도자"} width={FORM_TITLE_WIDTH} />
              <GRFormItem
                type={"text"}
                textType={"input"}
                fieldName={"etc.introducer"}
                control={control}
                placeholder={"인도자을 작성해 주세요"}
              />
            </GRFlexView>
            <GRFlexView
              marginbottom={GRStylesConfig.BASE_MARGIN}
              flexDirection="row"
            >
              <GRFormTitle title={"교회가 처음"} width={FORM_TITLE_WIDTH} />
              <GRFormItem
                type={"radio"}
                fieldName={"etc.isFirstChurch"}
                control={control}
                options={YES_NO_OPTIONS}
              />
            </GRFlexView>
            <GRFlexView
              marginbottom={GRStylesConfig.BASE_MARGIN}
              flexDirection="row"
            >
              <GRFormTitle
                title={"사랑의 교회 대학부에 오게 된 이유"}
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
                width={FORM_TITLE_WIDTH}
              />
              <GRFormItem
                type={"radio"}
                fieldName={"etc.hasCertaintityOfSalvation"}
                control={control}
                options={THERE_OPTIONS}
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
                title={"순장"}
                type={"select"}
                textType={"input"}
                fieldName={"newFamilyGroupId"}
                control={control}
                placeholder={"새가족 순장을 선택해 주세요"}
                containStyle={{ marginRight: "1rem" }}
                options={termNewFamilyLeaderOptions}
              />
            </GRFlexView>
            <Divider />
            <GRFlexView>
              <GRButtonText
                marginright={GRStylesConfig.BASE_MARGIN}
                block
                onClick={onUpdateNewFamily}
              >
                수정
              </GRButtonText>
            </GRFlexView>
          </GRView>
        </GRFlexView>
      </GRContainerView>
      {/* 라인업 모달 */}
      {isOpenLineupModal && (
        <NewFamilyLineUpModal
          open={isOpenLineupModal}
          onClickClose={() => setIsOpenLineupModal(false)}
          selectNewFamily={newFamilyLineUpData}
        />
      )}
      {/* 라인아웃 모달 */}
      {isOpenLineOutModal && (
        <GRAlertModal
          open={isOpenLineOutModal}
          description={`${newFamilyDetailData?.name}을 라인 아웃 하시겠습니까?`}
          onCancelClickButton={() => setIsOpenLineOutModal(false)}
          onOkClickButton={onOkLineOutClickButton}
        />
      )}
    </>
  );
};

export default ManagementNewFamilyUpdatePage;
