import GRTable from "@component/atom/GRTable";
import GRAlert from "@component/atom/alert/GRAlert";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRSelect from "@component/atom/dataEntry/GRSelect";
import GRModal from "@component/atom/modal/GRModal";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import { ColumnType } from "antd/es/table";
import { tUser } from "api/account/types";
import useDispatchMutate from "api/management/user/mutate/useDispatchMutate";
import { DISPATCH_STATUS } from "common/enum";
import { DISPATCH_TYPE_OPTIONS, SEX_NAME } from "config/const";
import { Dayjs } from "dayjs";
import { FC, useEffect, useState } from "react";
import { convertDateStringByDefaultForm } from "utils/DateUtils";

type tDispatchForm = tUser & {
  type?: string;
  sendDate?: string;
  returnDate?: string;
};

type tUserDispatchModal = {
  open: boolean;
  onClickClose: () => void;
  resetSelection: () => void;
  selectedUser: tUser[];
};

const UserDispatchModal: FC<tUserDispatchModal> = ({
  open,
  onClickClose,
  resetSelection,
  selectedUser
}) => {
  const [selectFormData, setSelectFormData] = useState<tDispatchForm[]>([]);

  const { dispatchMutate } = useDispatchMutate(onClickClose, resetSelection);

  const validateGraduate = () => {
    const isValid = selectFormData.every(user => {
      if (user.type === undefined || user.type === null) {
        GRAlert.error(`${user.name}의 파송 종류를 선택해 주세요`);
        return false;
      }
      if (user.sendDate === undefined || user.sendDate === null) {
        GRAlert.error(`${user.name}의 파송일을 선택해 주세요`);
        return false;
      }
      return true;
    });

    return isValid;
  };

  const onOkGraduateButton = async () => {
    if (!validateGraduate()) {
      return;
    }

    const _userData = selectFormData.map(
      ({ userId, type, sendDate, returnDate }) => ({
        userId,
        type: type as DISPATCH_STATUS,
        sendDate: sendDate as string,
        returnDate: returnDate as string
      })
    );
    console.log(_userData);
    await dispatchMutate(_userData);
  };

  const insertDataInFormResult = (
    _teamMemberId: number,
    key: string,
    value: any
  ) => {
    const _formResult = selectFormData.map(result => {
      if (_teamMemberId === result.userId) {
        return {
          ...result,
          [key]: value
        };
      }
      return result;
    });
    setSelectFormData(_formResult);
  };

  const columns: ColumnType<tUser>[] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "4rem",
      minWidth: 55
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      width: "3rem",
      minWidth: 40,
      render: (_, item) => {
        if (!item?.sex) return;
        return <GRText>{SEX_NAME[item?.sex]}</GRText>;
      }
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      width: "3rem",
      minWidth: 40
    },
    {
      title: "일반 순장",
      align: "center",
      dataIndex: "leaderName",
      width: "5rem",
      minWidth: 65
    },
    {
      title: "파송 종류",
      dataIndex: "type",
      key: "type",
      align: "center",
      width: "10rem",
      render: (_, _item) => {
        return (
          <GRFlexView>
            <GRSelect
              options={DISPATCH_TYPE_OPTIONS}
              placeholder={"파송 종류 선택"}
              onChange={value => {
                insertDataInFormResult(_item.userId, "type", value);
              }}
              style={{ textAlign: "center" }}
              dropdownStyle={{ textAlign: "center" }}
            />
          </GRFlexView>
        );
      }
    },
    {
      title: "파송일",
      dataIndex: "sendDate",
      key: "sendDate",
      align: "center",
      width: "10rem",
      render: (_, _item) => {
        return (
          <GRFlexView>
            <GRDatePicker
              pickerType={"basic"}
              placeholder={"파송일 선택"}
              onChange={value => {
                insertDataInFormResult(
                  _item.userId,
                  "sendDate",
                  convertDateStringByDefaultForm(value as Dayjs)
                );
              }}
            />
          </GRFlexView>
        );
      }
    },
    {
      title: "복귀일",
      dataIndex: "returnDate",
      key: "returnDate",
      align: "center",
      width: "10rem",
      render: (_, _item) => {
        return (
          <GRFlexView>
            <GRDatePicker
              pickerType={"basic"}
              placeholder={"복귀일 선택"}
              onChange={value => {
                insertDataInFormResult(
                  _item.userId,
                  "returnDate",
                  convertDateStringByDefaultForm(value as Dayjs)
                );
              }}
              disabledDate={() => false}
            />
          </GRFlexView>
        );
      }
    }
  ];

  const onCloseModal = () => {
    onClickClose();
  };

  useEffect(() => {
    setSelectFormData(selectedUser);
  }, [selectedUser]);

  return (
    <GRModal
      open={open}
      onCancel={onCloseModal}
      onOk={onOkGraduateButton}
      title={"파송"}
      width={"60%"}
      maskClosable={false}
    >
      <GRTable
        rowKey={"userId"}
        columns={columns}
        data={selectedUser}
        scroll={{ x: true }}
        tableLayout={"auto"}
      />
    </GRModal>
  );
};

export default UserDispatchModal;
