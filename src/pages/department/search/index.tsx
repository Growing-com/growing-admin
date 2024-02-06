import GRTable from "@component/atom/GRTable";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import HeaderView from "@component/molecule/view/HeaderView";
import SearchBar from "@component/templates/SearchBar";
import { Tag } from "antd";
import { ColumnType } from "antd/es/table";
import { tActiveUser } from "api/account/types";
import { DUTY, SEX_OPTIONS } from "config/const";
import useActiveUsers from "hooks/auth/useActiveUsers";
import { useForm } from "react-hook-form";
import { Color } from "styles/colors";
import { BAPTISM, DISCIPLE, TRAINING } from "utils/constants";

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
  const { activeUsers,refetch } = useActiveUsers();
  refetch();

  const { control } = useForm();
  const searchData = [];

  const onClickSearch = (_value?: string) => {
    console.log(_value)
  };

  // 이름,학년 ,성별,직분,생년 월일,전화  번호,제자 훈련,제자 학교,세례
  const columns: ColumnType<tActiveUser>[] = [
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
        const _trainList = record.trainings?.filter(
          training =>
            training.type === "DISCIPLE_SCHOOL_A" ||
            training.type === "DISCIPLE_SCHOOL_B"
        );
        return <GRText>{_trainList?.map( train =>  train.name ).join(',') ?? "-"}</GRText>;
      },
    },
    {
      title: "제자 훈련",
      dataIndex: "disciple_traing",
      key: "disciple_traing",
      align: "center",
      render: (_, record) => {
        const _discipleship = record.discipleship;
        return <GRText>{_discipleship?.name ?? "-"}</GRText>;
      }
    },
    {
      title: "세례",
      dataIndex: "baptism",
      key: "baptism",
      align: "center",
      render: (_, record) => {
        const _trainList = record.trainings?.filter(
          training =>
            training.type === "INFANT_BAPTISM" ||
            training.type === "MILITARY_BAPTISM" ||
            training.type === "NORMAL_BAPTISM"
        );
        return <GRText>{_trainList?.map( train =>  train.name ).join(',') ?? "-"}</GRText>;
      }
    },
    {
      title: "학습 | 입교",
      dataIndex: "baptism",
      key: "baptism2",
      align: "center",
      render: (_, record) => {
        const _trainList = record.trainings?.filter(
          training =>
            training.type === "CONFIRMATION" ||
            training.type === "PRE_BAPTISM"
        );
        return <GRText>{_trainList?.map( train =>  train.name ).join(',') ?? "-"}</GRText>;
      }
    }
  ];

  const onClickRow = () => {};

  return (
    <>
      <HeaderView
        title={"전체 검색"}
        subComponent={
          <SearchBar
            onClickSearch={onClickSearch}
            filterComponent={
            <>
              <GRFlexView flexDirection={"row"} alignItems={"center"}>
                <GRFormItem
                  title={"학년"}
                  type={"text"}
                  textType={"number"}
                  fieldName={"grade"}
                  control={control}
                  placeholder={"학년을 작성해주세요"}
                  containStyle={{ marginRight: "1rem" }}
                />
                <GRFormItem
                  title={"성별"}
                  type={"select"}
                  fieldName={"gender"}
                  control={control}
                  placeholder={"조건을 선택해주세요"}
                  containStyle={{ marginRight: "1rem" }}
                  options={SEX_OPTIONS}
                  mode={"multiple"}
                />
                <GRFormItem
                  title={"직분"}
                  type={"select"}
                  mode={"multiple"}
                  fieldName={"gender"}
                  control={control}
                  placeholder={"조건을 선택해주세요"}
                />
              </GRFlexView>
              <GRFlexView flexDirection={"row"} alignItems={"center"}>
                <GRFormItem
                  type={"select"}
                  title={"제자학교"}
                  mode={"multiple"}
                  fieldName={"training"}
                  control={control}
                  containStyle={{ marginRight: "1rem"}}
                  placeholder={"제자학교를 선택해주세요"}
                  options={DISCIPLE}
                  maxTagCount={"responsive"}
                />
                <GRFormItem
                  type={"select"}
                  title={"학습 입교"}
                  mode={"multiple"}
                  fieldName={"disciple"}
                  control={control}
                  containStyle={{ marginRight: "1rem"}}
                  placeholder={"제자반을 선택해주세요"}
                  options={TRAINING}
                  maxTagCount={"responsive"}
                />
                <GRFormItem
                  type={"select"}
                  title={"세례"}
                  mode={"multiple"}
                  fieldName={"baptism"}
                  control={control}
                  placeholder={"세례을 선택해주세요"}
                  options={BAPTISM}
                  maxTagCount={"responsive"}
                />
              </GRFlexView>
              <GRFlexView flexDirection={"row"} alignItems={"center"}>
                <GRFormItem
                  type={"date"}
                  title={"생년월일"}
                  fieldName={"birthday"}
                  control={control}
                  picker={"month"}
                />
                <GRFlexView flex={0.5}>
                  <></>
                </GRFlexView>
              </GRFlexView>
              </>
            }
          />
        }
      />
      <GRContainerView>
        <GRView  backgroundColor={Color.white}>
          <GRTable
              rowKey={"id"}
              columns={columns}
              data={activeUsers}
              pagination={{
                total: searchData?.length,
                defaultPageSize: 10,
                position: ["bottomCenter"]
              }}
              scroll={{  x: 1300 }}
              onRow={() => ({
                onClick: () => onClickRow()
              })}
          />
        </GRView>
      </GRContainerView>
    </>
  );
};

export default SearchPage;
