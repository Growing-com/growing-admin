import GRButton from "@component/atom/button/GRButton";
import GRFlexView from "@component/atom/view/GRFlexView";
import HeaderView from "@component/molecule/view/HeaderView";
import NewfamilyTab from "@component/pages/department/newfamily/NewfamilyTab";
import NewfamilyInfoTable from "@component/pages/department/newfamily/NewfamilyTable/NewfamilyInfoTable";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Color } from "styles/colors";

const NewfamilyPage: NextPage = () => {
  const router = useRouter();

  const [searchName, setSearchName] = useState("");

  const onClickCreateNewFamily = async () => {
    await router.push("/department/newfamily/create");
  };

  return (
    <>
      <HeaderView
        title={"새가족 관리"}
        backgroundColor={Color.black200}
        titleColor={Color.white}
        headerComponent={
          <GRButton
            onClick={onClickCreateNewFamily}
            buttonType={"default"}
            buttonSize={"large"}
            borderRadius={"8px"}
          >
            등록
          </GRButton>
        }
      />
      <GRFlexView flexDirection={"row"}>
        <GRFlexView>
          <NewfamilyTab />
        </GRFlexView>
        <GRFlexView flex={8}>
          <NewfamilyInfoTable searchName={searchName} />
        </GRFlexView>
      </GRFlexView>
    </>
  );
};

export default NewfamilyPage;
