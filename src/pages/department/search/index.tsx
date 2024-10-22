import GRTable from "@component/atom/GRTable";
import GRTextButton from "@component/atom/button/GRTextButton";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormTitle from "@component/molecule/form/GRFormTitle";
import HeaderView from "@component/molecule/view/HeaderView";
import { MONTHS_OPTIONS } from "config/const";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";

const SearchPage: NextPage = () => {
  const { control, handleSubmit, reset } = useForm();

  return (
    <>
      <HeaderView
        title={"전체 검색"}
        subComponent={
          <GRFlexView flexDirection={"row"} xGap={1}>
            <GRFlexView>
              <GRFlexView flexDirection={"row"}>
                <GRFlexView
                  flexDirection={"row"}
                  marginbottom={GRStylesConfig.BASE_MARGIN}
                  xGap={1}
                >
                  <GRFlexView flexDirection={"row"} alignItems={"center"}>
                    <GRFormTitle title={"나무"} width={4} />
                    <GRFormItem
                      mode={"multiple"}
                      type={"select"}
                      fieldName={"codyId"}
                      control={control}
                      //   options={cordiSelectItem}
                      placeholder={"나무를 선택해주세요"}
                      showSearch
                      optionFilterProp={"label"}
                    />
                  </GRFlexView>
                  <GRFlexView flexDirection={"row"} alignItems={"center"}>
                    <GRFormTitle title={"리더"} width={4} />
                    <GRFormItem
                      mode={"multiple"}
                      type={"select"}
                      fieldName={"smallGroupId"}
                      control={control}
                      //   options={cordiSelectItem}
                      placeholder={"리더를 선택해주세요"}
                      showSearch
                      optionFilterProp={"label"}
                    />
                  </GRFlexView>
                </GRFlexView>
              </GRFlexView>
              <GRFlexView
                flexDirection={"row"}
                marginbottom={GRStylesConfig.BASE_MARGIN}
                xGap={1}
              >
                <GRFlexView flexDirection={"row"} alignItems={"center"}>
                  <GRFormTitle title={"이름"} width={4} />
                  <GRFormItem
                    type={"text"}
                    textType={"input"}
                    fieldName={"name"}
                    control={control}
                    placeholder={"이름을 작성해주세요"}
                  />
                </GRFlexView>
                <GRFlexView flexDirection={"row"} alignItems={"center"}>
                  <GRFormTitle title={"전화번호"} width={4} />
                  <GRFormItem
                    type={"text"}
                    textType={"number"}
                    fieldName={"phoneNumber"}
                    control={control}
                    placeholder={"전화 번호를 작성해주세요"}
                  />
                </GRFlexView>
              </GRFlexView>
              <GRFlexView
                flexDirection={"row"}
                marginbottom={GRStylesConfig.BASE_MARGIN}
                xGap={1}
              >
                <GRFlexView flexDirection={"row"} alignItems={"center"}>
                  <GRFormTitle title={"학년"} width={4} />
                  <GRFormItem
                    type={"text"}
                    textType={"number"}
                    fieldName={"grade"}
                    control={control}
                    placeholder={"학년을 작성해주세요"}
                  />
                </GRFlexView>
                <GRFlexView flexDirection={"row"} alignItems={"center"}>
                  <GRFormTitle title={"생년월일"} width={4} />
                  <GRFormItem
                    type={"select"}
                    fieldName={"birth"}
                    control={control}
                    mode={"multiple"}
                    placeholder={"생년 월일을 여러 개 선택할 수 있습니다"}
                    options={MONTHS_OPTIONS}
                  />
                </GRFlexView>
              </GRFlexView>
            </GRFlexView>
            <GRView isFlex flexDirection={"column"}>
              <GRFlexView>
                <GRTextButton
                  //   onClick={onClickSearch}
                  size={"large"}
                  marginbottom={GRStylesConfig.BASE_MARGIN}
                >
                  검색
                </GRTextButton>
                <GRTextButton
                  //   onClick={onClickResetSearch}
                  buttonType={"cancel"}
                  size={"large"}
                >
                  초기화
                </GRTextButton>
              </GRFlexView>
            </GRView>
          </GRFlexView>
        }
      />
      <GRContainerView>
        <GRView backgroundColor={Color.white}>
          <GRTable
            rowKey={"userId"}
            // columns={columns}
            // data={searchTotal}
            // pagination={{
            //   total: searchTotal?.length,
            //   position: ["bottomCenter"],
            //   current: currentPage,
            //   onChange: page => setCurrentPage(page)
            // }}
            // scroll={{ x: 1300 }}
          />
        </GRView>
      </GRContainerView>
    </>
  );
};

export default SearchPage;
