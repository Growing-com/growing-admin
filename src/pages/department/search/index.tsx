import GRTable from "@component/atom/GRTable";
import GRAlert from "@component/atom/alert/GRAlert";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import ExcelButton from "@component/molecule/button/ExcelButton";
import GRFormItem from "@component/molecule/form/GRFormItem";
import ColumSexRender from "@component/molecule/table/ColumSexRender";
import HeaderView from "@component/molecule/view/HeaderView";
import TableInfoHeader from "@component/templates/table/TableInfoHeader";
import { Tag } from "antd";
import { ColumnType, TableProps } from "antd/es/table";
import { tActiveUser } from "api/account/types";
import { DUTY, MONTHS_OPTIONS, SEX_OPTIONS } from "config/const";
import dayjs from "dayjs";
import useActiveUsers from "hooks/auth/useActiveUsers";
import { includes, isEmpty } from "lodash";
import ExportExcelOfJson from "modules/excel/ExportExcelOfJson";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Color } from "styles/colors";
import {
  BAPTISM_FILTER,
  CONFIRMATION_FILTER,
  DISCIPLE_FILTER,
  DISCIPLE_SCHOOL_FILTER,
  DUTY_FILTER,
  PRE_BAPTISM_FILTER
} from "utils/constants";
import { koreanSorter } from "utils/sorter";

type OnChange = NonNullable<TableProps<tActiveUser>["onChange"]>;
type Filters = Parameters<OnChange>[1];

const SearchPage = () => {
  const { activeUsers, refetch } = useActiveUsers();
  const { control, handleSubmit } = useForm();

  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [searchTotal, setSearchTotal] = useState<tActiveUser[]>([]);
  const [filteredSearchData, setFilteredSearchData] = useState<tActiveUser[]>(
    []
  );

  const onClickSearch: SubmitHandler<FieldValues> = async _item => {
    let _filterData = activeUsers;
    if (_item.name) {
      _filterData = activeUsers.filter(
        user => user.name.indexOf(_item.name) !== -1
      );
    }

    if (_item.phoneNumber) {
      _filterData = _filterData.filter(
        user => user.phoneNumber.indexOf(_item.phoneNumber) !== -1
      );
    }

    if (_item.grade) {
      _filterData = _filterData.filter(user => user.grade === _item.grade);
    }

    if (!!_item.birth.length) {
      _filterData = _filterData.filter(user => {
        if (user.birth && user.birth !== "1970-01-01") {
          const _month = dayjs(user.birth).month() + 1;
          return includes(_item.birth, String(_month));
        }
      });
    }
    setSearchTotal(_filterData);
  };

  const convertData = (_searchTotal: tActiveUser[]) => {
    return _searchTotal.map(data => {
      const _disciple_school: string[] = [];
      const _baptism: string[] = [];
      const _prebaptism: string[] = [];
      const _confirmation: string[] = [];
      data.trainings.forEach(training => {
        if (
          training.type === "DISCIPLE_SCHOOL_A" ||
          training.type === "DISCIPLE_SCHOOL_B"
        ) {
          _disciple_school.push(training.name);
        }
        if (
          training.type === "INFANT_BAPTISM" ||
          training.type === "MILITARY_BAPTISM" ||
          training.type === "NORMAL_BAPTISM"
        ) {
          _baptism.push(training.name);
        }
        if (training.type === "PRE_BAPTISM") {
          _prebaptism.push(training.name);
        }
        if (training.type === "CONFIRMATION") {
          _confirmation.push(training.name);
        }
      });
      return {
        name: data.name,
        grade: data.grade,
        sex: SEX_OPTIONS.find(_sex => _sex.value === data.sex)?.label,
        phoneNumber: data.phoneNumber,
        birth: data.birth,
        duty: DUTY.find(_duty => _duty.key === data.duty)?.value,
        disciple_school: _disciple_school.join(","),
        discipleship: data.discipleship?.name,
        baptism: _baptism.join(","),
        prebaptism: _prebaptism.join(","),
        confirmation: _confirmation.join(",")
      };
    });
  };

  const onClickExcel = async () => {
    try {
      if (!filteredSearchData?.length) {
        throw new Error("추출 데이터가 없습니다");
      }
      await ExportExcelOfJson({
        data: convertData(filteredSearchData),
        headerTitle: [
          "이름",
          "학년",
          "성별",
          "전화번호",
          "생년월일",
          "직분",
          "제자 학교",
          "제자 훈련",
          "세례",
          "학습",
          "입교"
        ],
        fileName: "전체 인원"
      });
      return GRAlert.success("엑셀 추출 성공");
    } catch (e) {
      GRAlert.error("엑셀 추출 실패");
    }
  };

  const onClickFilterReset = () => {
    setFilteredSearchData(searchTotal);
    setFilteredInfo({});
  };

  const onFilterTraining = (
    value: string | number | boolean,
    record: tActiveUser
  ) => {
    if (!value) return record.trainings.length === 0;
    const _training = record.trainings?.filter(
      training => training.type === value
    );
    return !!_training.length;
  };

  const columns: ColumnType<tActiveUser>[] = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "5rem",
      sorter: (a, b) => koreanSorter(a.name, b.name)
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
      title: "생년월일",
      key: "birth",
      dataIndex: "birth",
      align: "center",
      render: (_, record) => {
        return record?.birth !== "1970-01-01" ? record?.birth : "-";
      }
    },
    {
      title: "직분",
      key: "duty",
      dataIndex: "duty",
      align: "center",
      width: "5rem",
      filteredValue: filteredInfo.duty || null,
      filters: DUTY_FILTER,
      onFilter: (value, record) => record?.duty === value,
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
      title: "제자 학교",
      dataIndex: "disciple_school",
      key: "disciple_school",
      align: "center",
      ellipsis: true,
      filteredValue: filteredInfo.disciple_school || null,
      filters: DISCIPLE_SCHOOL_FILTER,
      onFilter: onFilterTraining,
      render: (_, record) => {
        const _trainList = record.trainings?.filter(
          training =>
            training.type === "DISCIPLE_SCHOOL_A" ||
            training.type === "DISCIPLE_SCHOOL_B"
        );
        return (
          <GRText>
            {!!_trainList.length
              ? _trainList?.map(train => train.name).join(",") ?? "-"
              : "-"}
          </GRText>
        );
      }
    },
    {
      title: "제자 훈련",
      dataIndex: "discipleship",
      key: "disciple_traing",
      align: "center",
      filters: DISCIPLE_FILTER,
      filteredValue: filteredInfo.disciple_traing || null,
      onFilter: (_, record) => !isEmpty(record.discipleship),
      render: (_, record) => {
        const _discipleship = record.discipleship;
        return <GRText>{_discipleship?.name ?? "-"}</GRText>;
      }
    },
    {
      title: "세례",
      dataIndex: "trainings",
      key: "baptism",
      align: "center",
      filteredValue: filteredInfo.baptism || null,
      filters: BAPTISM_FILTER,
      onFilter: onFilterTraining,
      render: (_, record) => {
        const _trainList = record.trainings?.filter(
          training =>
            training.type === "INFANT_BAPTISM" ||
            training.type === "MILITARY_BAPTISM" ||
            training.type === "NORMAL_BAPTISM"
        );
        return (
          <GRText>
            {!!_trainList.length
              ? _trainList?.map(train => train.name).join(",") ?? "-"
              : "-"}
          </GRText>
        );
      }
    },
    {
      title: "학습",
      dataIndex: "trainings",
      key: "prebaptism",
      align: "center",
      filteredValue: filteredInfo.prebaptism || null,
      filters: PRE_BAPTISM_FILTER,
      onFilter: onFilterTraining,
      render: (_, record) => {
        const _trainList = record.trainings?.filter(
          training => training.type === "PRE_BAPTISM"
        );
        return (
          <GRText>
            {!!_trainList.length
              ? _trainList?.map(train => train.name).join(",") ?? "-"
              : "-"}
          </GRText>
        );
      }
    },
    {
      title: "입교",
      dataIndex: "trainings",
      key: "confirmation",
      align: "center",
      filteredValue: filteredInfo.confirmation || null,
      filters: CONFIRMATION_FILTER,
      onFilter: onFilterTraining,
      render: (_, record) => {
        const _trainList = record.trainings?.filter(
          training => training.type === "CONFIRMATION"
        );
        return (
          <GRText>
            {!!_trainList.length
              ? _trainList?.map(train => train.name).join(",") ?? "-"
              : "-"}
          </GRText>
        );
      }
    }
  ];

  const handleChange: OnChange = (_, filters, __, extra) => {
    setFilteredSearchData(extra.currentDataSource);
    setFilteredInfo(filters);
  };

  // useEffect(() => {
  //   refetch();
  // }, [refetch]);

  useEffect(() => {
    if (!!activeUsers?.length) {
      setSearchTotal(activeUsers);
      setFilteredSearchData(activeUsers);
    }
  }, [activeUsers]);

  return (
    <>
      <HeaderView
        title={"전체 검색"}
        subComponent={
          <GRFlexView flexDirection={"row"}>
            <GRFlexView>
              <GRFlexView flexDirection={"row"} alignItems={"center"}>
                <GRFormItem
                  title={"이름"}
                  type={"text"}
                  textType={"number"}
                  fieldName={"name"}
                  control={control}
                  placeholder={"이름을 작성해주세요"}
                  containStyle={{ marginRight: "1rem" }}
                />
                <GRFormItem
                  title={"전화번호"}
                  type={"text"}
                  textType={"number"}
                  fieldName={"phoneNumber"}
                  control={control}
                  placeholder={"전화 번호를 작성해주세요"}
                  containStyle={{ marginRight: "1rem" }}
                />
              </GRFlexView>
              <GRFlexView flexDirection={"row"} alignItems={"center"}>
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
                    title={"생년월일"}
                    type={"select"}
                    fieldName={"birth"}
                    control={control}
                    mode={"multiple"}
                    placeholder={"생년 월일을 여러개 선택할수 있습니다"}
                    containStyle={{ marginRight: "1rem" }}
                    options={MONTHS_OPTIONS}
                  />
                </GRFlexView>
              </GRFlexView>
            </GRFlexView>
            <GRButtonText onClick={handleSubmit(onClickSearch)} size={"large"}>
              검색
            </GRButtonText>
          </GRFlexView>
        }
      />
      <GRContainerView>
        <GRView backgroundColor={Color.white}>
          <GRTable
            rowKey={"id"}
            headerComponent={
              <GRFlexView
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <TableInfoHeader
                  title={"검색 리스트"}
                  count={filteredSearchData.length}
                  totalCount={searchTotal.length}
                  isResetButton
                  onClickFilterReset={onClickFilterReset}
                />
                <GRView>
                  <ExcelButton
                    size={"small"}
                    buttonType={"custom"}
                    onClickExcel={onClickExcel}
                    onlyIcon
                    popoverprops={{
                      content: "검색 후 필터된 결과를 다운로드 받습니다"
                    }}
                  />
                </GRView>
              </GRFlexView>
            }
            columns={columns}
            data={searchTotal}
            pagination={{
              total: filteredSearchData?.length,
              position: ["bottomCenter"]
            }}
            scroll={{ x: 1300 }}
            onChange={handleChange}
          />
        </GRView>
      </GRContainerView>
    </>
  );
};

export default SearchPage;
