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
import { ColumnType } from "antd/es/table";
import { tActiveUser } from "api/account/types";
import {
  BAPTISM_OPTIONS,
  CONFIRMATION_OPTIONS,
  DISCIPLE_OPTIONS,
  DISCIPLE_SCHOOL_OPTIONS,
  DUTY,
  MONTHS_OPTIONS,
  PRE_BAPTISM_OPTIONS,
  SEX_OPTIONS
} from "config/const";
import dayjs from "dayjs";
import useActiveUsers from "hooks/auth/useActiveUsers";
import useKeyPressEventListener from "hooks/useKeyPressEventListener";
import { includes, isEmpty } from "lodash";
import ExportExcelOfJson from "modules/excel/ExportExcelOfJson";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
import { dateSorter, koreanSorter } from "utils/sorter";

const defatulValue = {
  name: "",
  phoneNumber: "",
  grade: "",
  birth: []
};

const SearchPage = () => {
  const { activeUsers, refetch } = useActiveUsers();
  const { control, handleSubmit, reset } = useForm();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTotal, setSearchTotal] = useState<tActiveUser[]>([]);

  const onClickResetSearch = () => {
    reset(defatulValue);
    setSearchTotal(activeUsers);
    setCurrentPage(1);
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

  const onFilterDisciple = (value: string, record: tActiveUser) => {
    if (!value) return isEmpty(record.discipleship);
    return !isEmpty(record.discipleship);
  };

  const onClickSearch = handleSubmit(async _item => {
    let _filterData = activeUsers;
    if (_item?.name) {
      _filterData = activeUsers.filter(
        user => user.name.indexOf(_item.name) !== -1
      );
    }

    if (_item?.phoneNumber) {
      _filterData = _filterData.filter(user => {
        const removeDash = user.phoneNumber.replace(/-/g, "");
        return removeDash.indexOf(_item.phoneNumber) !== -1;
      });
    }

    if (_item?.grade) {
      _filterData = _filterData.filter(
        user => user.grade === Number(_item.grade)
      );
    }

    if (!!_item?.birth?.length) {
      _filterData = _filterData.filter(user => {
        if (user.birth && user.birth !== "1970-01-01") {
          const _month = dayjs(user.birth).month() + 1;
          return includes(_item.birth, String(_month));
        }
      });
    }

    if (_item?.disciple_school?.length) {
      _filterData = _filterData.filter(user => {
        const _filter = _item?.disciple_school.filter(
          (disciple_school: string) => {
            return onFilterTraining(disciple_school, user);
          }
        );
        return !!_filter.length;
      });
    }

    if (_item?.disciple_traing?.length) {
      _filterData = _filterData.filter(user => {
        const _filter = _item?.disciple_traing.filter(
          (disciple_traing: string) => {
            return onFilterDisciple(disciple_traing, user);
          }
        );
        return !!_filter.length;
      });
    }
    if (_item?.baptism?.length) {
      _filterData = _filterData.filter(user => {
        const _filter = _item?.baptism.filter((baptism: string) => {
          return onFilterTraining(baptism, user);
        });
        return !!_filter.length;
      });
    }
    if (_item?.prebaptism?.length) {
      _filterData = _filterData.filter(user => {
        const _filter = _item?.prebaptism.filter((prebaptism: string) => {
          return onFilterTraining(prebaptism, user);
        });
        return !!_filter.length;
      });
    }
    if (_item?.confirmation?.length) {
      _filterData = _filterData.filter(user => {
        const _filter = _item?.confirmation.filter((confirmation: string) => {
          return onFilterTraining(confirmation, user);
        });
        return !!_filter.length;
      });
    }
    setSearchTotal(_filterData);
    setCurrentPage(1);
  });

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
      if (!searchTotal?.length) {
        throw new Error("추출 데이터가 없습니다");
      }
      await ExportExcelOfJson({
        data: convertData(searchTotal),
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
      render: (_, record) => <ColumSexRender sexData={record?.sex} />
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
      sorter: (a, b) => {
        return dateSorter(dayjs(a.birth), dayjs(b.birth));
      },
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
      render: (_, record) => {
        const _trainList = record.trainings?.filter(
          training =>
            training.type === "DISCIPLE_SCHOOL_A" ||
            training.type === "DISCIPLE_SCHOOL_B"
        );
        return (
          <GRText>
            {!!_trainList.length
              ? _trainList?.map(train => train.name).join(", ") ?? "-"
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

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!!activeUsers?.length) {
      setSearchTotal(activeUsers);
    }
  }, [activeUsers]);

  useKeyPressEventListener("Enter", () => {
    onClickSearch();
  });

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
                  textType={"input"}
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
                <GRFormItem
                  title={"학년"}
                  type={"text"}
                  textType={"number"}
                  fieldName={"grade"}
                  control={control}
                  placeholder={"학년을 작성해주세요"}
                  containStyle={{ marginRight: "1rem" }}
                />
              </GRFlexView>
              <GRFlexView flexDirection={"row"} alignItems={"center"}>
                <GRFlexView flexDirection={"row"} alignItems={"center"}>
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
                  <GRFormItem
                    title={"학습"}
                    type={"select"}
                    fieldName={"prebaptism"}
                    control={control}
                    mode={"multiple"}
                    placeholder={"학습을 선택해주세요"}
                    containStyle={{ marginRight: "1rem" }}
                    options={PRE_BAPTISM_OPTIONS}
                  />
                  <GRFormItem
                    title={"입교"}
                    type={"select"}
                    fieldName={"confirmation"}
                    control={control}
                    mode={"multiple"}
                    placeholder={"입교을 선택해주세요"}
                    containStyle={{ marginRight: "1rem" }}
                    options={CONFIRMATION_OPTIONS}
                  />
                </GRFlexView>
              </GRFlexView>
              <GRFlexView flexDirection={"row"} alignItems={"center"}>
                <GRFlexView flexDirection={"row"} alignItems={"center"}>
                  <GRFormItem
                    title={"제자 학교"}
                    type={"select"}
                    fieldName={"disciple_school"}
                    control={control}
                    mode={"multiple"}
                    placeholder={"제자 학교을 선택해주세요"}
                    containStyle={{ marginRight: "1rem" }}
                    options={DISCIPLE_SCHOOL_OPTIONS}
                  />
                  <GRFormItem
                    title={"제자 훈련"}
                    type={"select"}
                    fieldName={"disciple_traing"}
                    control={control}
                    mode={"multiple"}
                    placeholder={"제자 훈련을 선택해주세요"}
                    containStyle={{ marginRight: "1rem" }}
                    options={DISCIPLE_OPTIONS}
                  />
                  <GRFormItem
                    title={"세례"}
                    type={"select"}
                    fieldName={"baptism"}
                    control={control}
                    mode={"multiple"}
                    placeholder={"세례을 선택해주세요"}
                    containStyle={{ marginRight: "1rem" }}
                    options={BAPTISM_OPTIONS}
                  />
                </GRFlexView>
              </GRFlexView>
            </GRFlexView>
            <GRView isFlex flexDirection={"column"}>
              <GRFlexView>
                <GRButtonText
                  onClick={onClickSearch}
                  size={"large"}
                  marginbottom={GRStylesConfig.BASE_MARGIN}
                >
                  검색
                </GRButtonText>
                <GRButtonText
                  onClick={onClickResetSearch}
                  buttonType={"cancel"}
                  size={"large"}
                >
                  초기화
                </GRButtonText>
              </GRFlexView>
            </GRView>
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
                  count={searchTotal.length}
                  totalCount={searchTotal.length}
                />
                <GRView>
                  <ExcelButton
                    size={"small"}
                    buttonType={"custom"}
                    onClickExcel={onClickExcel}
                    onlyIcon
                  />
                </GRView>
              </GRFlexView>
            }
            columns={columns}
            data={searchTotal}
            pagination={{
              total: searchTotal?.length,
              position: ["bottomCenter"],
              current: currentPage,
              onChange: page => setCurrentPage(page)
            }}
            scroll={{ x: 1300 }}
          />
        </GRView>
      </GRContainerView>
    </>
  );
};

export default SearchPage;
