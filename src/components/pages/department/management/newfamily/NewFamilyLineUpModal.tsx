import GRTable from "@component/atom/GRTable";
import GRDatePicker from "@component/atom/dataEntry/GRDatePicker";
import GRSelect from "@component/atom/dataEntry/GRSelect";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormModal from "@component/molecule/modal/GRFormModal";
import { Checkbox } from "antd";
import { ColumnType } from "antd/es/table";
import { tNewFamilyV2 } from "apiV2/newFamily/type";
import useTerm from "hooks/api/term/useTerm";
import { concat } from "lodash";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import GRStylesConfig from "styles/GRStylesConfig";

type tNewFamilyLineUpModal = {
  open: boolean;
  onClickClose: () => void;
  selectNewFamily: tNewFamilyV2[];
};
export const NewFamilyLineUpModal: FC<tNewFamilyLineUpModal> = ({
  open,
  onClickClose,
  selectNewFamily
}) => {
  console.log("selectNewFamily", selectNewFamily);
  const [selectedLeaderId, setSelectedLeaderId] = useState<number>();
  const [selectPromteDate, setSelectPromteDate] = useState<number[]>([]);

  const { control, handleSubmit, reset } = useForm();
  const { termSamllGroupLeaderOptions } = useTerm({ termId: 1 });

  const columns: ColumnType<tNewFamilyV2>[] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center"
    },
    {
      title: "등반 여부",
      dataIndex: "promote",
      key: "promote",
      align: "center",
      render: (_, _item) => {
        return (
          <Checkbox
            onChange={value => {
              if (value.target.checked) {
                setSelectPromteDate(pre => concat(pre, [_item.newFamilyId]));
              } else {
                setSelectPromteDate(pre =>
                  pre.filter(item => item !== _item.newFamilyId)
                );
              }
            }}
          />
        );
      }
    },
    {
      title: "등반일",
      dataIndex: "promoteDate",
      key: "promoteDate",
      align: "center",
      render: (_, _item) => {
        const includeNewFamilyId = selectPromteDate.includes(_item.newFamilyId);
        return (
          <GRFlexView>
            <GRDatePicker
              pickerType={"basic"}
              disabled={!includeNewFamilyId}
              placeholder={
                !includeNewFamilyId ? "등반 여부를 선택해주세요" : "등반일 선택"
              }
            />
          </GRFlexView>
        );
      }
    },
    {
      title: "순장",
      dataIndex: "leader",
      key: "leader",
      align: "center",
      render: (_, _item) => {
        return (
          <GRFlexView>
            <GRSelect
              value={selectedLeaderId}
              options={termSamllGroupLeaderOptions}
              onChange={() => {}}
              placeholder={"리더 선택"}
            />
          </GRFlexView>
        );
      }
    }
  ];

  const onCloseModal = () => {
    onClickClose();
  };

  const onClickModalOk = item => {
    console.log("item", item);
  };

  return (
    <GRFormModal
      open={open}
      onCancel={onCloseModal}
      onSubmit={handleSubmit(onClickModalOk)}
      title={"새가족 라인업"}
      width={"60%"}
      maskClosable={false}
    >
      <GRView flexDirection={"row"} marginbottom={GRStylesConfig.BASE_MARGIN}>
        <GRTable columns={columns} data={selectNewFamily} />
      </GRView>
    </GRFormModal>
  );
};
