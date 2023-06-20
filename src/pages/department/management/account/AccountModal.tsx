import { tOptions } from "@component/base/dataEntry/dataEntryType";
import GRModal from "@component/base/modal/GRModal";
import GRText from "@component/base/text/GRText";
import GRFlexView from "@component/base/view/GRFlexView";
import GRView from "@component/base/view/GRView";
import GRFormItem, { tFormItemType } from "@component/modules/form/GRFormItem";
import { FC, useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Color } from "styles/colors";

type tAccountModal = {
  open: boolean;
  onClick: () => void;
};

type tFormItems = {
  title: string;
  fieldName: string;
  type: tFormItemType;
  options?: tOptions;
};

const GENDER_OPTIONS = [
  { label: "남", value: "M" },
  { label: "여", value: "W" }
];

const STATUS_OPTIONS = [
  { label: "리더", value: "leader" },
  { label: "코디", value: "cordi" }
];
const LEADER_OPTIONS = [
  { label: "이종민", value: "1123" },
  { label: "조예인", value: "123" }
];

const ROLES_OPTIONS = [
  { label: "관리자", value: "222" },
  { label: "코디", value: "444" }
];

const AccountModal: FC<tAccountModal> = ({ open, onClick }) => {
  const { control, handleSubmit } = useForm();

  const onOkClick = useCallback(() => {
    // onAccountModal?.()
  }, []);

  const formItems: Array<tFormItems[]> = [
    [
      { title: "이름", fieldName: "name", type: "input" },
      { title: "비밀번호", fieldName: "password", type: "input" }
    ],
    [
      { title: "전화번호", fieldName: "phoneNumber", type: "input" },
      {
        title: "성별",
        fieldName: "gender",
        type: "radio",
        options: GENDER_OPTIONS
      }
    ],
    [
      { title: "생년월일", fieldName: "birthday", type: "date" },
      { title: "학년", fieldName: "grade", type: "input" }
    ],
    [
      {
        title: "역할",
        fieldName: "leader",
        type: "select",
        options: STATUS_OPTIONS
      },
      {
        title: "리더",
        fieldName: "leader",
        type: "select",
        options: LEADER_OPTIONS
      }
    ],
    [
      {
        title: "권한",
        fieldName: "role",
        type: "select",
        options: ROLES_OPTIONS
      },
      {
        title: "활성화",
        fieldName: "active",
        type: "switch"
      }
    ]
  ];

  const onClickModalOk: SubmitHandler<FieldValues> = useCallback(_item => {
    console.log("_item", _item);
  }, []);

  return (
    <GRModal
      open={open}
      onCancel={onClick}
      onOk={handleSubmit(onClickModalOk)}
      title={"계정 생성"}
      modalOkButtonType={"submit"}
    >
      <GRView flexDirection={"row"}>
        <GRFlexView flexDirection={"row"}>
          <GRFormItem
            title={"아이디"}
            fieldName={"id"}
            control={control}
            type={"input"}
          />
          <GRFlexView justifyContent={"center"}>
            <GRText color={Color.grey80} marginleft={1} fontSize={"b7"}>
              * 아이디는 이름을 영문 타자로 자동 입력됩니다
            </GRText>
          </GRFlexView>
        </GRFlexView>
        {formItems.map((item, index) => (
          <GRFlexView key={`formItem-wrapper-${index}`} flexDirection={"row"}>
            {item.map(({ title, fieldName, ...props }) => (
              <GRFormItem
                key={`${title}-${fieldName}`}
                title={title}
                fieldName={fieldName}
                control={control}
                {...props}
              />
            ))}
          </GRFlexView>
        ))}
      </GRView>
    </GRModal>
  );
};

export default AccountModal;
