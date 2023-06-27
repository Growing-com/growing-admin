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
  placeholder?: string;
  required?: boolean;
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
      {
        title: "이름",
        fieldName: "name",
        type: "input",
        placeholder: "이름을 작성해 주세요",
        required: true
      },
      {
        title: "비밀번호",
        fieldName: "password",
        type: "input",
        placeholder: "비밀번호를 작성해 주세요",
        required: true
      }
    ],
    [
      {
        title: "전화번호",
        fieldName: "phoneNumber",
        type: "input",
        placeholder: "- 없이 작성해 주세요"
      },
      {
        title: "성별",
        fieldName: "gender",
        type: "radio",
        options: GENDER_OPTIONS
      }
    ],
    [
      {
        title: "생년월일",
        fieldName: "birthday",
        type: "date",
        placeholder: "생년월일을 선택해 주세요"
      },
      {
        title: "학년",
        fieldName: "grade",
        type: "input",
        placeholder: "학년 숫자만 작성해주세요"
      }
    ],
    [
      {
        title: "직분",
        fieldName: "leader",
        type: "select",
        options: STATUS_OPTIONS,
        placeholder: "부서에서의 직분을 선택해주세요"
      },
      {
        title: "리더",
        fieldName: "leader",
        type: "select",
        options: LEADER_OPTIONS,
        placeholder: "부서에서의 직분을 선택해주세요"
      }
    ],
    [
      {
        title: "역할",
        fieldName: "role",
        type: "select",
        options: ROLES_OPTIONS,
        placeholder: "웹 사용 역할을 선택해 주세요"
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
      width={"60%"}
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
