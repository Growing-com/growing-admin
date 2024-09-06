import GRModal from "@component/atom/modal/GRModal";
import GRView from "@component/atom/view/GRView";
import { Descriptions } from "antd";
import { useUserDetailQuery } from "apiV1_prefix/account/queries/useUserDetailQuery";
import type { tAccount } from "apiV1_prefix/account/types";
import { SEX_NAME } from "config/const";
import dayjs from "dayjs";
import { FC, useCallback, useEffect, useState } from "react";
import { DEFAULT_DATE_FOMAT } from "utils/DateUtils";

type tUserHistoryModal = {
  userId?: number;
  open: boolean;
  onClose: () => void;
};

type tUserHistoryInfo = {
  birth: string;
} & Omit<tAccount, "visitDate" | "birth">;

const UserHistoryModal: FC<tUserHistoryModal> = ({ open, onClose, userId }) => {
  const { data: user } = useUserDetailQuery(userId);

  const [userInfo, setUserInfo] = useState<tUserHistoryInfo | undefined>();

  const onCloseModal = useCallback(() => {
    onClose?.();
    setUserInfo(Object.assign({}));
  }, [onClose]);

  useEffect(() => {
    if (user) {
      setUserInfo({
        ...user,
        birth: dayjs(user.birth).format(DEFAULT_DATE_FOMAT)
      });
    }
  }, [user]);

  return (
    <GRModal
      title={"정보"}
      open={open}
      onCancel={onCloseModal}
      width={"60%"}
      footer={[]}
    >
      <GRView>
        <Descriptions bordered>
          <Descriptions.Item label={"이름"}>{userInfo?.name}</Descriptions.Item>
          <Descriptions.Item label={"성별"}>
            {userInfo?.sex && SEX_NAME[userInfo?.sex]}
          </Descriptions.Item>
          <Descriptions.Item label={"전화번호"} span={2}>
            {userInfo?.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label={"생년월일"}>
            {userInfo?.birth !== "1970-01-01"
              ? dayjs(userInfo?.birth).format(DEFAULT_DATE_FOMAT)
              : "-"}
          </Descriptions.Item>
          <Descriptions.Item label={"학년"} span={2}>
            {userInfo?.grade}
          </Descriptions.Item>
          <Descriptions.Item label={"기타 사항"}>
            {userInfo?.etc}
          </Descriptions.Item>
        </Descriptions>
      </GRView>
    </GRModal>
  );
};

export default UserHistoryModal;
