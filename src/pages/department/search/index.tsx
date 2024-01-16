import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import HeaderView from "@component/molecule/view/HeaderView";
import SearchBar from "@component/templates/SearchBar";
import { Tag } from "antd";
import { ColumnType } from "antd/es/table";
import { DUTY } from "config/const";
import { useForm } from "react-hook-form";
const DISCIPLE_SCHOOL_OPTIONS = [
  { label: "전체", value: "0" },
  { label: "제자 학교 A", value: "1" },
  { label: "제자 학교 B", value: "2" }
];
const DISCIPLE_TRAINING_OPTIONS = [
  { label: "전체", value: "0" },
  { label: "하나라", value: "3" },
  { label: "달무리", value: "4" }
];
const BAPTISM_OPTIONS = [
  { label: "전체", value: "0" },
  { label: "유아 세례", value: "5" },
  { label: "세례 ( 성인 세례 )", value: "6" },
  { label: "입교", value: "7" },
  { label: "학습", value: "8" },
  { label: "군대 세례 ", value: "9" }
];

const DUMP_DATA = [
  {
    name: "이종민",
    grade: 11,
    sex: "MALE",
    phoneNumber: "010-5485-9349",
    duty: "MEMBER",
    birth: "1991-05-20",
    disciple_school: ["제자 학교 A", "제자 학교 B"],
    disciple_traing: ["2023-1학기 하나라"],
    baptism: ["유아 세례", "세례", "입교", "학습"]
  },
  {
    name: "이종민",
    grade: 11,
    sex: "MALE",
    phoneNumber: "010-5485-9349",
    duty: "MEMBER",
    birth: "1991-05-20",
    disciple_school: ["제자 학교 A", "제자 학교 B"],
    disciple_traing: ["2023-1학기 하나라"],
    baptism: ["유아 세례", "세례", "입교", "학습"]
  }
];

const SearchPage = () => {
  const { control, watch } = useForm();
  const searchData = [];
  const onClickSearch = () => {};
  // 이름,학년 ,성별,직분,생년 월일,전화  번호,제자 훈련,제자 학교,세례
  const columns: ColumnType<any>[] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "5rem"
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      width: "5rem",
      sorter: (a, b) => a.grade - b.grade
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
      title: "직분",
      key: "duty",
      dataIndex: "tags",
      align: "center",
      width: "5rem",
      render: (_, item) => {
        if (!item?.duty) return;
        const _duty = DUTY.find(duty => duty.key === item.duty);
        return (
          <Tag color={_duty?.color} key={`duty_key_${_duty?.key}`}>
            {_duty?.value ?? ""}
          </Tag>
        );
      }
    },
    {
      title: "생년월일",
      key: "birth",
      dataIndex: "birth",
      align: "center",
      render: (_, record) => {
        return record?.birth !== "1970-01-01" ? record?.birth : "-";
      }
    },
    {
      title: "제자 학교",
      dataIndex: "disciple_school",
      key: "disciple_school",
      align: "center",
      width: "5rem",
      ellipsis: true,
      render: (_, record) => {
        return <GRText>{record.disciple_school.join(",")}</GRText>;
      }
    },
    {
      title: "제자 훈련",
      dataIndex: "disciple_traing",
      key: "disciple_traing",
      align: "center"
    },
    {
      title: "세례",
      dataIndex: "baptism",
      key: "baptism",
      align: "center"
    }
  ];

  const onClickRow = () => {};

  return (
    <>
      <HeaderView
        title={"검색"}
        subComponent={
          <SearchBar
            onClickSearch={onClickSearch}
            filterComponent={
              <>
                <GRFlexView flexDirection={"row"} alignItems={"center"}>
                  <GRFormItem
                    title={"제자 학교"}
                    type={"select"}
                    fieldName={"searchType"}
                    control={control}
                    options={DISCIPLE_SCHOOL_OPTIONS}
                    placeholder={"제자 학교를 선택해주세요"}
                  />
                  <GRFormItem
                    title={"제자 훈련"}
                    type={"select"}
                    fieldName={"searchType"}
                    control={control}
                    options={DISCIPLE_TRAINING_OPTIONS}
                    placeholder={"제자 훈련을 선택해주세요"}
                  />
                  <GRFormItem
                    title={"세례"}
                    type={"select"}
                    fieldName={"searchType"}
                    control={control}
                    options={BAPTISM_OPTIONS}
                    placeholder={"세례를 선택해주세요"}
                  />
                </GRFlexView>
                <GRFlexView flexDirection={"row"} alignItems={"center"}>
                  <GRFormItem
                    title={"학년"}
                    type={"text"}
                    textType={"number"}
                    fieldName={"searchType"}
                    control={control}
                    placeholder={"학년을 작성해주세요"}
                  />
                  <GRFormItem
                    title={"성별"}
                    type={"select"}
                    fieldName={"searchType"}
                    control={control}
                    placeholder={"조건을 선택해주세요"}
                  />
                  <GRFormItem
                    type={"date"}
                    title={"생년월일"}
                    fieldName={"sex"}
                    control={control}
                    picker={"month"}
                    placeholder={["시작달", "종료달"]}
                  />
                </GRFlexView>
              </>
            }
          />
        }
      />
      <GRContainerView>
        <GRTable
          rowKey={"id"}
          columns={columns}
          data={DUMP_DATA}
          pagination={{
            total: searchData?.length,
            defaultPageSize: 20,
            position: ["bottomCenter"]
          }}
          onRow={record => ({
            onClick: () => onClickRow()
          })}
        />
      </GRContainerView>
    </>
  );
};

export default SearchPage;
