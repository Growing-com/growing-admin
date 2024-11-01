import GRAlert from "@component/atom/alert/GRAlert";
import GRTextButton from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRInfoBadge from "@component/molecule/GRInfoBadge";
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormTitle from "@component/molecule/form/GRFormTitle";
import HeaderView from "@component/molecule/view/HeaderView";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Divider } from "antd";
import { getNewfamily, updateNewfamily } from "api/newfamily";
import { tNewfamily } from "api/newfamily/type";
import queryKeys from "api/queryKeys";
import {
  BELIEVE_STATUS_OPTIONS,
  SEX_OPTIONS,
  THERE_OPTIONS,
  VISIT_REASON_OPTIONS,
  YES_NO_OPTIONS
} from "config/const";
import dayjs, { Dayjs } from "dayjs";
import { useCurrentTermInfoOptionQueries } from "hooks/queries/term/useCurrentTermInfoOptionQueries";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import GRStylesConfig from "styles/GRStylesConfig";
import { convertDateStringByDefaultForm } from "utils/DateUtils";
import { handleError } from "utils/error";
import { REGEXP_GRADE_NUM, REGEXP_PHONE_HYPHEN_PATTERN } from "utils/regexp";

type tNewFamilyForm = {
  visitDate: Dayjs;
  birth: Dayjs;
} & Omit<tNewfamily, "visitDate" | "birth">;

const NewfamilyUpdatePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset } = useForm<tNewFamilyForm>();

  const { currentTermNewFamilyLeaderOptions } =
    useCurrentTermInfoOptionQueries();

  const numericId = id ? Number(id) : null;

  const { data: newFamilyDetailData } = useQuery(
    [queryKeys.NEW_FAMILY_DETAIL, id],
    async () => {
      if (numericId === null || isNaN(numericId)) {
        throw new Error("Invalid ID");
      }
      return await getNewfamily(numericId);
    },
    {
      select: _data => _data.content,
      enabled: numericId !== null,
      onSuccess: data => {
        reset({
          ...data,

          // 달력의 경우 setValue를 하기 위해서는 dayjs로 변환해야 한다.
          birth:
            data.birth && data?.birth !== "1970-01-01"
              ? dayjs(data.birth)
              : undefined,
          visitDate:
            data?.visitDate && data?.visitDate !== "1970-01-01"
              ? dayjs(data?.visitDate)
              : undefined
        });
      },
      onError: error => {
        handleError(error, "새가족 정보가 로드되지 않았습니다.");
      }
    }
  );

  const { mutateAsync } = useMutation(updateNewfamily, {
    onError: error => {
      handleError(error, "지체 수정 오류");
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.NEW_FAMILY]);
      queryClient.invalidateQueries([queryKeys.NEW_FAMILY, id]);
      GRAlert.success("지체 수정 완료");
    }
  });

  const onUpdateNewFamily = handleSubmit(async (_value: tNewFamilyForm) => {
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
      <HeaderView title={"새가족 수정"} disabledBackbutton={true} />
      <GRContainerView>
        <GRFlexView alignItems="center" style={{ overflow: "auto" }}>
          <GRView style={{ maxWidth: "60rem", width: "100%" }}>
            <GRFlexView yGap={GRStylesConfig.BASE_LONG_MARGIN}>
              <GRFlexView
                flexDirection={"row"}
                marginbottom={GRStylesConfig.BASE_MARGIN}
                xGap={GRStylesConfig.FORM_BLOCK_BASE_MARGIN}
                alignItems={"center"}
              >
                <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
                  <GRFormTitle title={"이름"} required={true} />
                  <GRFormItem
                    type={"text"}
                    textType={"name"}
                    fieldName={"name"}
                    control={control}
                    placeholder={"이름을 작성해 주세요"}
                    rules={{ required: "이름은 필수입니다." }}
                  />
                </GRFlexView>
                <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
                  <GRFormTitle title={"학년"} required={true} />
                  <GRFormItem
                    type={"text"}
                    textType={"number"}
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
                <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
                  <GRFormTitle title={"전화번호"} required={true} />
                  <GRFormItem
                    type={"text"}
                    textType={"phoneNumber"}
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
                  />
                </GRFlexView>
                <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
                  <GRFormTitle title={"방문일"} required={true} />
                  <GRFormItem
                    type={"date"}
                    pickerType={"basic"}
                    fieldName={"visitDate"}
                    control={control}
                    placeholder={"방문일을 선택해 주세요"}
                    rules={{ required: "방문일은 필수 입니다." }}
                  />
                </GRFlexView>
              </GRFlexView>
              <GRFlexView
                marginbottom={GRStylesConfig.FORM_BLOCK_BASE_MARGIN}
                flexDirection={"row"}
                xGap={GRStylesConfig.FORM_BLOCK_BASE_MARGIN}
              >
                <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
                  <GRFormTitle title={"성별"} required={true} />
                  <GRFormItem
                    type={"radio"}
                    options={SEX_OPTIONS}
                    fieldName={"sex"}
                    control={control}
                    rules={{ required: "성별은 필수 입니다." }}
                  />
                </GRFlexView>
                <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
                  <GRFormTitle title={"생년월일"} />
                  <GRFormItem
                    type={"date"}
                    pickerType={"basic"}
                    fieldName={"birth"}
                    control={control}
                    placeholder={"생년월일을 선택해 주세요"}
                  />
                </GRFlexView>
                <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
                  <GRFormTitle title={"학교/학과/학년"} />
                  <GRFormItem
                    type={"text"}
                    textType={"input"}
                    fieldName={"etc.school"}
                    control={control}
                    placeholder={"학교/학과/학년을 작성해 주세요"}
                  />
                </GRFlexView>
                <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
                  <GRFormTitle title={"인도자"} />
                  <GRFormItem
                    type={"text"}
                    textType={"input"}
                    fieldName={"etc.introducer"}
                    control={control}
                    placeholder={"인도자를 작성해 주세요"}
                  />
                </GRFlexView>
              </GRFlexView>
              <GRFlexView
                marginbottom={GRStylesConfig.BASE_MARGIN}
                flexDirection={"row"}
                xGap={GRStylesConfig.FORM_BLOCK_BASE_MARGIN}
              >
                <GRFlexView flexDirection={"row"}>
                  <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
                    <GRFormTitle title={"교회가 처음"} />
                    <GRFormItem
                      type={"radio"}
                      options={YES_NO_OPTIONS}
                      fieldName={"etc.isFirstChurch"}
                      control={control}
                    />
                  </GRFlexView>
                  <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
                    <GRFormTitle title={"이전에 다닌 교회"} />
                    <GRFormItem
                      type={"text"}
                      textType={"input"}
                      fieldName={"etc.latestChurch"}
                      control={control}
                      placeholder={"전에 다닌 교회를 작성해주세요"}
                    />
                  </GRFlexView>
                </GRFlexView>
                <GRFlexView>
                  <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
                    <GRFormTitle title={"사랑의 교회 대학부에 오게 된 이유"} />
                    <GRFormItem
                      type={"select"}
                      options={VISIT_REASON_OPTIONS}
                      fieldName={"etc.visitReason"}
                      control={control}
                      placeholder={"답을 선택해주세요"}
                    />
                  </GRFlexView>
                </GRFlexView>
              </GRFlexView>
              <GRFlexView

                marginbottom={GRStylesConfig.FORM_BLOCK_BASE_MARGIN}
                flexDirection={"row"}
                xGap={GRStylesConfig.FORM_BLOCK_BASE_MARGIN}
              >
                <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
                  <GRFormTitle title={"나는 예수님을 (   )"} />
                  <GRFormItem
                    type={"select"}
                    options={BELIEVE_STATUS_OPTIONS}
                    fieldName={"etc.relationshipWithJesus"}
                    control={control}
                    placeholder={"답을 선택해주세요"}
                  />
                </GRFlexView>
                <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
                  <GRFormTitle title={"나는 구원의 확신이 (   )"} />
                  <GRFormItem
                    type={"radio"}
                    options={THERE_OPTIONS}
                    fieldName={"etc.hasCertaintityOfSalvation"}
                    control={control}
                  />
                </GRFlexView>
              </GRFlexView>
              <GRFlexView marginbottom={GRStylesConfig.BASE_MARGIN}>
                <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
                  <GRFormTitle title={"기타 사항"} />
                  <GRFormItem
                    type={"text"}
                    textType={"textarea"}
                    fieldName={"etc.comment"}
                    control={control}
                    placeholder={"추가 내용이 있으면 작성해 주세요"}
                    style={{
                      height: "5rem"
                    }}
                  />
                </GRFlexView>
              </GRFlexView>
              <GRFlexView marginbottom={GRStylesConfig.BASE_MARGIN}>
                <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
                  <GRFormTitle title={"새가족 순원 기록지"} />
                  <GRFormItem
                    type={"text"}
                    textType={"textarea"}
                    fieldName={"etc.lineUpMemo"}
                    control={control}
                    placeholder={"라인업에 참고할 사항을 입력해 주세요"}
                    style={{
                      height: "5rem"
                    }}
                  />
                </GRFlexView>
              </GRFlexView>
            </GRFlexView>
            <Divider />
            <GRFlexView
              flexDirection={"row"}
              alignItems={"center"}
              marginbottom={GRStylesConfig.BASE_LONG_MARGIN}
            >
              <GRText weight={"bold"} fontSize={"b4"} marginright={0.5}>
                라인업
              </GRText>
              <GRInfoBadge infoMessage={"바로 라인업할 경우 넣어주세요"} />
            </GRFlexView>
            <GRFlexView
              marginbottom={GRStylesConfig.BASE_MARGIN}
              flexDirection={"row"}
            >
              <GRFlexView yGap={GRStylesConfig.BASE_MARGIN}>
                <GRFormTitle title={"새가족 순장"} />
                <GRFormItem
                  type={"select"}
                  textType={"input"}
                  fieldName={"newFamilyGroupId"}
                  control={control}
                  placeholder={"새가족 순장을 선택해 주세요"}
                  options={currentTermNewFamilyLeaderOptions}
                />
              </GRFlexView>
            </GRFlexView>
            <Divider />
            <GRFlexView>
              <GRTextButton
                marginright={GRStylesConfig.BASE_MARGIN}
                block
                onClick={onUpdateNewFamily}
              >
                수정
              </GRTextButton>
            </GRFlexView>
          </GRView>
        </GRFlexView>
      </GRContainerView>
    </>
  );
};

export default NewfamilyUpdatePage;
