import GRButtonText from "@component/atom/button/GRTextButton";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import HeaderView from "@component/molecule/view/HeaderView";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LineUpContent from "./LineUpContent";
import LineUpTable from "./LineUpTable";

const ManagementLineUpPage = () => {
  const onClickCreateLineUpModal = () => {};

  return (
    <>
      <HeaderView
        title={"라인업 관리"}
        headerComponent={
          <GRButtonText
            onClick={onClickCreateLineUpModal}
            buttonType={"default"}
            size={"large"}
          >
            라인업 생성
          </GRButtonText>
        }
      />
      <DndProvider backend={HTML5Backend}>
        <GRContainerView>
          <GRFlexView flexDirection="row">
            <GRFlexView
              flexDirection={"row"}
              style={{
                flexWrap: "wrap"
              }}
            >
              <LineUpTable />
              <LineUpContent />
            </GRFlexView>
          </GRFlexView>
        </GRContainerView>
      </DndProvider>
    </>
  );
};

export default ManagementLineUpPage;
