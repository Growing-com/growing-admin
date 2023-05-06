import GRTable from "@component/base/GRTable"
import GRButton from "@component/base/button/GRButton"
import GRSelect from "@component/base/dataEntry/GRSelect"
import GRText from "@component/base/text/GRText"
import GRTextInput from "@component/base/text/GRTextInput"
import GRFlexView from "@component/base/view/GRFlexView"
import { Button, Pagination, Table } from "antd"
import { NextPage } from "next"
import { STATUS_DUMP_DATA } from "./dumpData"
import React, { useCallback } from "react"

const ManagementSearch = () =>{

  const onClickSearch = () => useCallback(()=>{
    
  },[])
  
  return (
    <GRFlexView isBoard padding={"1rem 2rem"} marginVertical={2}>
        <GRFlexView alignItems={"center"}>
          <GRText>
            상태
          </GRText>
          <GRSelect
            options={STATUS_DUMP_DATA}
          />
        </GRFlexView>
        <GRFlexView alignItems={"center"}>
          <GRText>
            검색
          </GRText>
          <GRTextInput/>
        </GRFlexView>
        <GRButton onClick={onClickSearch}>
          조회
        </GRButton>
      </GRFlexView>
  )
}

export default ManagementSearch;