import GRModal from "@component/atom/modal/GRModal";
import GRText from "@component/atom/text/GRText";
import { FC } from "react";

type tNewFamilyPromoteModal = {
  open: boolean;
  onClose: () => void;
  newFamilyCount: number;
};

const NewFamilyPromoteModal: FC<tNewFamilyPromoteModal> = ({
  open,
  onClose,
  newFamilyCount
}) => {
  const onCancelClick = () => {
    onClose();
  };
  return (
    <GRModal
      onCancel={onCancelClick}
      open={open}
      showFooter={true}
      width={"23%"}
    >
      <GRText weight={'bold'}
      fontSize={'b4'}>{newFamilyCount}명을 새가족으로 등반 시키시겠습니까?</GRText>
    </GRModal>
  );
};

export default NewFamilyPromoteModal;
