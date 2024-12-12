import GRContainerView from "@component/atom/view/GRContainerView";
import HeaderView from "@component/molecule/view/HeaderView";
import { useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";

const AttendanceManagementPage: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <>
      <HeaderView title={"출석 열람"} subComponent={<>오잉</>}/>
      <GRContainerView>출석 열람 테이블</GRContainerView>
    </>
  );
};

export default AttendanceManagementPage;
