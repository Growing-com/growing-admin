import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import HeaderView from "@component/molecule/view/HeaderView";

import GRText from "@component/atom/text/GRText";
import GRInfoBadge from "@component/molecule/GRInfoBadge";
import GRFormItem from "@component/molecule/form/GRFormItem";
import DragPreview from "@component/pageComponents/department/management/lineup/DragPreview";
import LineUpContent from "@component/pageComponents/department/management/lineup/LineUpContent";
import LineUpGroupContent from "@component/pageComponents/department/management/lineup/LineUpGroupContent/LineUpGroupContent";
import LineUpTable from "@component/pageComponents/department/management/lineup/LineUpTable/LineUpTable";
import { Steps } from "antd";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useForm } from "react-hook-form";
import GRStylesConfig from "styles/GRStylesConfig";

const STEP_GROUP = 0;
const STEP_TABLE = 1;

const ManagementLineUpCreatePage = () => {
  const onClickCreateLineUpModal = () => {};
  const { control } = useForm();

  const [current, setCurrent] = useState(0);

  const onChange = (current: number) => {
    setCurrent(current);
  };

  return (
    <>
      <HeaderView title={"라인업 관리"} />
      <GRContainerView>
        <GRFlexView marginbottom={GRStylesConfig.BASE_LONG_MARGIN}>
          <Steps
            current={current}
            onChange={onChange}
            items={[
              {
                title: "Step 1"
              },
              {
                title: "Step 2"
              },
              {
                title: "Step 3"
              },
              {
                title: "Step 4"
              }
            ]}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            type={"text"}
            fieldName={"termTitle"}
            textType={"input"}
            title={"텀 제목"}
            control={control}
            placeholder={"텀 제목을 입력해주세요 예 ) 2023-02"}
            required={true}
            containStyle={{ marginRight: "1rem" }}
          />
          <GRFormItem
            title={"텀 기간"}
            type={"date"}
            fieldName={"termRage"}
            control={control}
            pickerType={"range"}
            required={true}
            disabledDate={() => false}
          />
        </GRFlexView>
        <GRFlexView>
          <GRFormItem
            type={"text"}
            textType={"textarea"}
            title={"기타 사항"}
            fieldName={"etc"}
            control={control}
            placeholder={"추가 내용이 있으면 작성해 주세요"}
            style={{
              height: "8rem"
            }}
          />
        </GRFlexView>
      </GRContainerView>
      <GRContainerView>
        <GRFlexView
          flexDirection={"row"}
          alignItems={"center"}
          marginbottom={GRStylesConfig.BASE_MARGIN}
        >
          <GRText weight={"bold"} fontSize={"b2"} marginright={0.5}>
            그룹 지정
          </GRText>
          <GRInfoBadge
            infoMessage={"라인업 하기 전에 그룹화 하기 위한 작업입니다"}
          />
        </GRFlexView>
        <GRFlexView flexDirection="row">
          <GRFlexView
            flexDirection={"row"}
            style={{
              flexWrap: "wrap"
            }}
          >
            <DndProvider backend={HTML5Backend}>
              <DragPreview />
              <LineUpTable />
              {current === STEP_GROUP && <LineUpGroupContent />}
              {current === STEP_TABLE && <LineUpContent />}
            </DndProvider>
          </GRFlexView>
        </GRFlexView>
      </GRContainerView>
    </>
  );
};

export default ManagementLineUpCreatePage;
