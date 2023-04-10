import GRButton from "@component/base/button/GRButton"
import GRText from "@component/base/text/GRText"
import GRFlexView from "@component/base/view/GRFlexView"
import { Button, Pagination, Table } from "antd"
import { NextPage } from "next"

const ManagementAccount : NextPage = () => {
  return(
    <div>
      <GRFlexView isRow alignItems={"flex-between"}>
        <GRButton>
          계정 생성
        </GRButton>
      </GRFlexView>
      <GRFlexView isBoard padding={"1rem 2rem"}>
        <GRText>
          상태
        </GRText>
        
      </GRFlexView>
      <Table>

      </Table>
      <Pagination/>
    </div>
  )
}


export default ManagementAccount