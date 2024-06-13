import GRModal from "@component/atom/modal/GRModal";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import { tTermNewFamily } from "api/term/types";
import { FC } from "react";

type tNewFamilyPromoteModal = {
  open: boolean;
  onClose: () => void;
  newFamilyList: tTermNewFamily[];
};

const NewFamilyPromoteModal: FC<tNewFamilyPromoteModal> = ({
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
      width={"23%"}
    >
      <GRFlexView alignItems={"center"}>
        <GRText weight={"bold"} fontSize={"b4"}>
          {newFamilyList.length === 0
            ? `지체를 선택해주세요.`
            : `${newFamilyList.length} 명을 새가족으로 등반시키시겠습니까?`}
        </GRText>
      </GRFlexView>
    </GRModal>
  );
};

export default NewFamilyPromoteModal;
