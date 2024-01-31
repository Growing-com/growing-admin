import GRTable from "@component/atom/GRTable";
import GRAlert from "@component/atom/alert/GRAlert";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormModal from "@component/molecule/modal/GRFormModal";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import TableInfoHeader from "@component/templates/table/TableInfoHeader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AutoComplete, Divider, Input, SelectProps } from "antd";
import { ColumnType } from "antd/es/table";
import { tActiveUser } from "api/account/types";
import queryKeys from "api/queryKeys";
import { tTermNewFamily } from "api/term/types";
import { createTraining, getTrainingDetail } from "api/training";
import { tTrainingDetail, tTrainingType } from "api/training/type";
import { Dayjs } from "dayjs";
import useActiveUsers from "hooks/auth/useActiveUsers";
import { concat } from "lodash";
import { FC, useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import GRStylesConfig from "styles/GRStylesConfig";
import { TRAINING_MAIN_TITLE } from "utils/constants";

type tTrainingRosterModal = {
  open: boolean;
  onClose: () => void;
  onRegister?: () => void;
  trainingId?: number;
};

const TrainingRosterModal: FC<tTrainingRosterModal> = ({
  open,
  onClose,
  trainingId
}) => {
  const { control, handleSubmit, reset } = useForm<any>();

  const { data: trainingDetail } = useQuery(
    [queryKeys.TRAINING_MEMBERS, trainingId],
    async () => await getTrainingDetail(trainingId),
    { enabled: !!trainingId, select: _data => _data.content }
  );
  console.log("trainingId", trainingId);
  console.log("trainingDetail", trainingDetail);
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
  const [traingRosterlist, setTraingRosterlist] = useState<tActiveUser[]>([]);
  const { findUserByName, searchUserByName } = useActiveUsers();

  const { mutateAsync: createTrainingMutateAsync } =
    useMutation(createTraining);

  const onCloseModal = () => {
    onClose();
  };

  const onClickModalOk: SubmitHandler<FieldValues> = async _item => {
    await createTrainingMutateAsync({
      type: _item.type,
      name: _item.name,
      startDate: _item.rangeDate[0],
      endDate: _item.rangeDate[1],
      etc: _item.etc,
      userIds: traingRosterlist.map(roster => roster.id)
    });
    onCloseModal();
  };

  const columns: ColumnType<any>[] = useMemo(
    () => [
      {
        title: "이름",
        dataIndex: "name",
        key: "name",
        align: "center",
        fixed: "left",
        width: "5rem"
      },
      {
        title: "학년",
        dataIndex: "grade",
        key: "grade",
        align: "center",
        fixed: "left",
        width: "5rem"
      },
      {
        title: "성별",
        dataIndex: "sex",
        key: "sex",
        align: "center",
        width: "5rem",
        render: (_, record) => <ColumSexRender sexData={record.sex} />
      },
      {
        title: "전화번호",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        align: "center"
      },
      {
        title: "삭제",
        align: "center",
        render: () => <GRText>삭제</GRText>
      }
    ],
    []
  );

  const handleSearch = (value: string) => {
    console.log("value", value);
    // console.log("activeUsers", activeUsers);
    const filterUser = searchUserByName(value).map(user => ({
      label: user.name,
      value: user.name
    }));
    console.log("filterUser", filterUser);

    setOptions(!value ? [] : filterUser);
  };

  const onSelect = (_name: string) => {
    const findUser = findUserByName(_name);
    if (findUser && traingRosterlist.includes(findUser)) {
      return GRAlert.error("이미 추가 되었습니다.");
    }

    if (findUser) {
      setTraingRosterlist(concat([findUser], traingRosterlist));
    }
  };

  useEffect(() => {
    if (!!trainingDetail?.id) {
      reset({
        ...trainingDetail
      });
    } else {
      reset();
    }
  }, [trainingDetail, reset]);

  return (
    <GRFormModal
      open={open}
      onCancel={onCloseModal}
      onSubmit={handleSubmit(onClickModalOk)}
      title={"명부 생성"}
      width={"50%"}
      okButtonText={"등록"}
      maskClosable={false}
    >
      <GRView flexDirection={"row"}>
        <GRView>
          <GRFlexView flexDirection={"row"}>
            <GRFormItem
              type={"select"}
              title={"훈련 종류"}
              fieldName={"type"}
              control={control}
              options={TRAINING_MAIN_TITLE}
              placeholder={"훈련을 선택해주세요"}
              required={true}
              containStyle={{ marginRight: "1rem" }}
            />
            <GRFormItem
              type={"text"}
              textType={"input"}
              title={"훈련 이름"}
              fieldName={"name"}
              control={control}
              placeholder={"훈련 이름을 작성해 주세요"}
              required={true}
            />
          </GRFlexView>
          <GRFlexView flexDirection={"row"}>
            <GRFormItem
              title={"훈련 기간"}
              type={"date"}
              fieldName={"rangeDate"}
              control={control}
              pickerType={"range"}
              required={true}
            />
          </GRFlexView>
          <GRFlexView flexDirection={"row"}>
            <GRFormItem
              type={"text"}
              textType={"textarea"}
              title={"메모"}
              fieldName={"etc"}
              control={control}
              placeholder={"추가 내용이 있으면 작성해 주세요"}
              style={{
                height: "8rem"
              }}
            />
          </GRFlexView>
        </GRView>
        <Divider style={{ margin: "1rem 0rem 1.5rem 0rem " }} />
        <GRFlexView
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          marginbottom={GRStylesConfig.BASE_MARGIN}
        >
          <TableInfoHeader
            title={"명부 리스트"}
            count={traingRosterlist.length}
            totalCount={traingRosterlist.length}
          />
          <AutoComplete
            popupMatchSelectWidth={252}
            style={{ width: 200 }}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
          >
            <Input.Search
              placeholder={"이름 검색"}
              enterButton={"추가"}
              onSearch={handleSearch}
            />
          </AutoComplete>
        </GRFlexView>
        <GRFlexView>
          <GRTable
            data={traingRosterlist}
            scroll={{ y: "10rem" }}
            columns={columns}
            isHoverTable={false}
            marginbottom={GRStylesConfig.BASE_MARGIN}
          />
        </GRFlexView>
      </GRView>
    </GRFormModal>
  );
};

export default TrainingRosterModal;
