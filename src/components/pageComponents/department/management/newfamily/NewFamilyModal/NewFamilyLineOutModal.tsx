import GRModal from "@component/atom/modal/GRModal";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import { tTermNewFamily } from "api/term/types";
import { FC } from "react";

type tNewFamilyLineOutModal = {
  open: boolean;
  onClose: () => void;
  newFamilyList: tTermNewFamily[];
};

const NewFamilyLineOutModal: FC<tNewFamilyLineOutModal> = ({
  open,
  onClose,
  newFamilyList
}) => {
  const onCancelClick = () => {
    onClose();
  };
  return (
    <GRModal
      onCancel={onCancelClick}
      open={open}
      showFooter={true}
      footerJustifyContent={"center"}
      width={"25%"}
    >
      <GRFlexView alignItems={"center"}>
        {/* 지체 이름을 나열? 아니면 개인? */}
        <GRText weight={"bold"} fontSize={"b4"}>
          {newFamilyList.length === 0
            ? `지체를 선택해주세요.`
            : `${newFamilyList.length} 명을 라인아웃 시키겠습니까?`}
        </GRText>
      </GRFlexView>
    </GRModal>
  );
};

export default NewFamilyLineOutModal;
