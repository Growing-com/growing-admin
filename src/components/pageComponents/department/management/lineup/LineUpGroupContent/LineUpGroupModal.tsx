import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormModal from "@component/molecule/modal/GRFormModal";
import TableInfoHeader from "@component/templates/table/TableInfoHeader";
import { AutoComplete, Divider, Input } from "antd";
import { tTermNewFamily } from "api/term/types";
import { Dayjs } from "dayjs";
import { FC } from "react";
import GRStylesConfig from "styles/GRStylesConfig";

type tLineUpGroupModal = {
  newFamily?: tTermNewFamily;
  open: boolean;
  onClose: () => void;
  onRegister: () => void;
};

type tNewFamilyForm = {
  visitDate: Dayjs;
  birth: Dayjs;
} & Omit<tTermNewFamily, "visitDate" | "birth">;

const emptyValues = {
  name: "",
  sex: "MALE",
  phoneNumber: "",
  birth: "",
  visitDate: "",
  etc: "",
  grade: "",
  teamId: undefined
} as unknown as tNewFamilyForm;

const LineUpGroupModal: FC<tLineUpGroupModal> = ({
  open,
  onClose,
  newFamily,
  onRegister
}) => {
  return (
    <GRFormModal
      open={open}
      onCancel={onCloseModal}
      onSubmit={handleSubmit(onClickModalOk)}
      title={
        <GRFlexView flexDirection={"row"} justifyContent={"space-between"}>
          <GRText weight={"bold"}></GRText>
        </GRFlexView>
      }
      width={"60%"}
      okButtonText={isCreate ? "등록" : "수정"}
      maskClosable={false}
    >
      <GRView flexDirection={"row"}>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            type={"text"}
            textType={"input"}
            title={"이름"}
            fieldName={"name"}
            control={control}
            placeholder={"이름을 작성해 주세요"}
            required={true}
            containStyle={{ marginRight: "1rem" }}
          />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            type={"text"}
            textType={"phoneNumber"}
            title={"전화번호"}
            fieldName={"phoneNumber"}
            control={control}
            placeholder={"- 없이 작성해 주세요"}
            maxLength={13}
            required={true}
            containStyle={{ marginRight: "1rem" }}
          />
        </GRFlexView>
        <Divider style={{ margin: "1rem 0rem 1.5rem 0rem " }} />
        <GRFlexView
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          marginbottom={GRStylesConfig.BASE_MARGIN}
        >
          <TableInfoHeader
            title={"명부 리스트"}
            count={traingRosterlist?.length ?? 0}
            totalCount={traingRosterlist?.length ?? 0}
          />
          <AutoComplete
            style={{ width: 200 }}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
            value={searchValue}
          >
            <Input.Search
              placeholder={"이름 검색"}
              enterButton={"추가"}
              onSearch={handleSearch}
              allowClear={true}
            />
          </AutoComplete>
        </GRFlexView>
        <GRView height={13}>
          <GRTable
            data={traingRosterlist}
            scroll={{ y: "10rem" }}
            columns={columns}
            isHoverTable={false}
            marginbottom={GRStylesConfig.BASE_MARGIN}
          />
        </GRView>
      </GRView>
    </GRFormModal>
  );
};

export default LineUpGroupModal;
