import GRTable from "@component/base/GRTable"
import GRButton from "@component/base/button/GRButton"
import GRText from "@component/base/text/GRText"
import GRTextInput from "@component/base/text/GRTextInput"
import GRFlexView from "@component/base/view/GRFlexView"
import { Button, Pagination, Table } from "antd"
import { NextPage } from "next"

export default function ManagementSearch() {
  return (
    <GRFlexView isBoard padding={"1rem 2rem"}>
        <GRFlexView>

        <GRText>
          상태
        </GRText>
        
        </GRFlexView>
        <GRText>
          검색
        </GRText>
        <GRTextInput/>
        <GRButton>
          조회
        </GRButton>
      </GRFlexView>
  )
}
