import GRTable from "@component/atom/GRTable";
import GRTextButton from "@component/atom/button/GRTextButton";
import GRSelect from "@component/atom/dataEntry/GRSelect";
import GRText from "@component/atom/text/GRText";
import GRContainerView from "@component/atom/view/GRContainerView";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import GRFormItem from "@component/molecule/form/GRFormItem";
import GRFormTitle from "@component/molecule/form/GRFormTitle";
import HeaderView from "@component/molecule/view/HeaderView";
import TableInfoHeader from "@component/templates/table/TableInfoHeader";
import { TableColumnsType } from "antd";
import { tUser } from "api/account/types";
import { useUserListQuery } from "api/management/user/queries/useUserListQuery";
import { DUTY, MONTHS_OPTIONS, SEX_NAME } from "config/const";
import dayjs from "dayjs";
import { useCurrentTermInfoOptionQueries } from "hooks/queries/term/useCurrentTermInfoOptionQueries";
import { includes } from "lodash";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";
import { checkDefaultDate } from "utils/DateUtils";
import { dateSorter, koreanSorter } from "utils/sorter";

const SearchPage: NextPage = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "",
      grade: undefined,
      birth: "",
      sex: undefined,
      etc: ""
    }
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchCodyId, setSearchCodyId] = useState<number>();
  const [searchBaseData, setSearchBaseData] = useState<tUser[]>([]);
  const [searchTotal, setSearchTotal] = useState<tUser[]>([]);
  const { data: userList } = useUserListQuery();

  const { currentTermCodyOptions, membersByCody, setSelectedCodyId } =
    useCurrentTermInfoOptionQueries();

  const onClickResetSearch = () => {
    setSearchTotal(userList ?? []);
    setSearchCodyId(undefined);
    reset();
    setCurrentPage(1);
  };

  const onClickSearch = handleSubmit(async _item => {
    let _filterData = searchBaseData;
    if (!_filterData) return;

    if (_item?.name) {
      _filterData = _filterData.filter(
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
    if (_item?.birth?.length) {
      _filterData = _filterData.filter(user => {
        if (user.birth && user.birth !== "1970-01-01") {
          const _month = dayjs(user.birth).month() + 1;
          return includes(_item.birth, String(_month));
        }
        return false;
      });
    }

    setSearchTotal(_filterData);
    setCurrentPage(1);
  });

  const columns: TableColumnsType<any> = [
    {
      title: "직분",
      dataIndex: "duty",
      key: "duty",
      align: "center",
      width: "5rem",
      minWidth: 90,
      onFilter: (value, record) => record.duty === value,
      render: (_, item) => {
        if (!item?.duty) return;
        return <GRText>{DUTY[item?.duty]}</GRText>;
      },
      sorter: {
        compare: (a, b) => koreanSorter(DUTY[a.duty], DUTY[b.duty]),
        multiple: 5
      }
    },
    {
      title: "리더",
      dataIndex: "leaderName",
      key: "leaderName",
      align: "center",
      width: "6rem",
      minWidth: 75,
      sorter: {
        compare: (a, b) => koreanSorter(a.leaderName, b.leaderName),
        multiple: 6
      },
      onFilter: (value, record) => record.leaderName === value,
      render: (_, item) => {
        return <GRText weight={"bold"}>{item.leaderName}</GRText>;
      }
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
      fixed: "left",
      width: "6rem",
      minWidth: 75,
      sorter: {
        compare: (a, b) => koreanSorter(a.name, b.name),
        multiple: 4
      }
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      width: "4rem",
      minWidth: 60,
      render: (_, item) => {
        if (!item?.sex) return;
        return <GRText>{SEX_NAME[item?.sex]}</GRText>;
      },
      sorter: {
        compare: (a, b) => koreanSorter(SEX_NAME[a.sex], SEX_NAME[b.sex]),
        multiple: 3
      }
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      width: "4rem",
      minWidth: 60,
      sorter: { compare: (a, b) => a.grade - b.grade, multiple: 2 }
    },
    {
      title: "생년월일",
      key: "birth",
      dataIndex: "birth",
      align: "center",
      width: "8rem",
      minWidth: 85,
      render: (_, record) => checkDefaultDate(record.birth),
      sorter: {
        compare: (valueA, valueB) => dateSorter(valueA.birth, valueB.birth),
        multiple: 1
      }
    },
    {
      title: "전화번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      width: "10rem",
      minWidth: 110
    }
  ];

  const onChangeSelectCody = (_selectedCodyId: number) => {
    // 쿼리 보내는 codyId : data를 위한 것
    setSelectedCodyId(_selectedCodyId);
    // 이 컴포넌트에서 관리하는 codyId : view를 위한 것
    setSearchCodyId(_selectedCodyId);
  };

  useEffect(() => {
    if (!userList) return;
    setSearchTotal(userList);
    setSearchBaseData(userList);
  }, [userList]);

  useEffect(() => {
    if (!searchCodyId) {
      setSearchCodyId(undefined);
      setSearchBaseData(userList ?? []);
      setSearchTotal(userList ?? []);
      return;
    }
    if (!membersByCody) return;
    setSearchBaseData(membersByCody);
  }, [membersByCody, searchCodyId]);

  return (
    <>
      <HeaderView
        title={"전체 검색"}
        titleInfoType={"info"}
        titleInfo={<GRText>전체 혹은 코디별로 검색할 수 있습니다.</GRText>}
        subComponent={
          <GRFlexView flexDirection={"row"} xGap={1}>
            <GRFlexView>
              <GRFlexView flexDirection={"row"}>
                <GRFlexView
                  flexDirection={"row"}
                  marginbottom={GRStylesConfig.BASE_MARGIN}
                  xGap={1}
                >
                  <GRFlexView flexDirection={"row"} alignItems={"center"}>
                    <GRFormTitle title={"코디"} width={4} />
                    <GRFlexView>
                      <GRSelect
                        options={currentTermCodyOptions}
                        onChange={onChangeSelectCody}
                        placeholder={"코디를 선택해주세요"}
                        value={searchCodyId}
                        showSearch
                        optionFilterProp={"label"}
                      />
                    </GRFlexView>

                    {/* <GRFormItem
                      // mode={"multiple"}
                      type={"select"}
                      fieldName={"codyId"}
                      control={control}
                      options={currentTermCodyOptions}
                      placeholder={"코디를 선택해주세요"}
                      showSearch
                      optionFilterProp={"label"}
                    /> */}
                  </GRFlexView>
                  {/* <GRFlexView flexDirection={"row"} alignItems={"center"}>
                    <GRFormTitle title={"리더"} width={4} />
                    <GRFormItem
                      mode={"multiple"}
                      type={"select"}
                      fieldName={"smallGroupId"}
                      control={control}
                      //   options={cordiSelectItem}
                      placeholder={"리더를 선택해주세요"}
                      showSearch
                      optionFilterProp={"label"}
                    />
                  </GRFlexView> */}
                </GRFlexView>
              </GRFlexView>
              <GRFlexView
                flexDirection={"row"}
                marginbottom={GRStylesConfig.BASE_MARGIN}
                xGap={1}
              >
                <GRFlexView flexDirection={"row"} alignItems={"center"}>
                  <GRFormTitle title={"이름"} width={4} />
                  <GRFormItem
                    type={"text"}
                    textType={"input"}
                    fieldName={"name"}
                    control={control}
                    placeholder={"이름을 작성해주세요"}
                  />
                </GRFlexView>
                <GRFlexView flexDirection={"row"} alignItems={"center"}>
                  <GRFormTitle title={"전화번호"} width={4} />
                  <GRFormItem
                    type={"text"}
                    textType={"number"}
                    fieldName={"phoneNumber"}
                    control={control}
                    placeholder={"전화 번호를 작성해주세요"}
                  />
                </GRFlexView>
              </GRFlexView>
              <GRFlexView
                flexDirection={"row"}
                marginbottom={GRStylesConfig.BASE_MARGIN}
                xGap={1}
              >
                <GRFlexView flexDirection={"row"} alignItems={"center"}>
                  <GRFormTitle title={"학년"} width={4} />
                  <GRFormItem
                    type={"text"}
                    textType={"number"}
                    fieldName={"grade"}
                    control={control}
                    placeholder={"학년을 작성해주세요"}
                    maxLength={2}
                  />
                </GRFlexView>
                <GRFlexView flexDirection={"row"} alignItems={"center"}>
                  <GRFormTitle title={"생년월일"} width={4} />
                  <GRFormItem
                    type={"select"}
                    fieldName={"birth"}
                    control={control}
                    mode={"multiple"}
                    placeholder={"생년 월일을 여러 개 선택할 수 있습니다"}
                    options={MONTHS_OPTIONS}
                  />
                </GRFlexView>
              </GRFlexView>
            </GRFlexView>
            <GRView isFlex flexDirection={"column"}>
              <GRFlexView>
                <GRTextButton
                  onClick={onClickSearch}
                  size={"large"}
                  marginbottom={GRStylesConfig.BASE_MARGIN}
                >
                  검색
                </GRTextButton>
                <GRTextButton
                  onClick={onClickResetSearch}
                  buttonType={"cancel"}
                  size={"large"}
                >
                  초기화
                </GRTextButton>
              </GRFlexView>
            </GRView>
          </GRFlexView>
        }
      />
      <GRContainerView>
        <GRView marginbottom={GRStylesConfig.BASE_MARGIN}>
          <TableInfoHeader
            title={"검색된 인원"}
            count={searchTotal.length}
            totalCount={userList?.length}
          />
        </GRView>
        <GRView backgroundColor={Color.white}>
          <GRTable
            rowKey={"userId"}
            columns={columns}
            data={searchTotal}
            pagination={{
              total: searchTotal?.length,
              position: ["bottomCenter"],
              defaultPageSize: 10,
              current: currentPage,
              onChange: page => setCurrentPage(page)
            }}
          />
        </GRView>
      </GRContainerView>
    </>
  );
};

export default SearchPage;
