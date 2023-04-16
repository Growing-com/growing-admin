import GRTable from "@component/base/GRTable"
import GRButton from "@component/base/button/GRButton"
import GRSelect from "@component/base/dataEntry/GRSelect"
import GRText from "@component/base/text/GRText"
import GRTextInput from "@component/base/text/GRTextInput"
import GRFlexView from "@component/base/view/GRFlexView"
import { Button, Pagination, Table } from "antd"
import { NextPage } from "next"
import { STATUS_DUMP_DATA } from "./dumpData"



export default function ManagementSearch() {
  return (
    <GRFlexView isBoard padding={"1rem 2rem"}>
        <GRFlexView>
          <GRText>
            상태
          </GRText>
          <GRSelect
            options={STATUS_DUMP_DATA}
          />
        </GRFlexView>

        <GRFlexView>
          <GRText>
            검색
          </GRText>
          <GRTextInput/>
        </GRFlexView>
        
        <GRButton>
          조회
        </GRButton>
      </GRFlexView>
  )
}
