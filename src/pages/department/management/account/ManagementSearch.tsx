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
import { Color } from "styles/colors"

const ManagementSearch = () =>{

  const onClickSearch = () => useCallback(()=>{
    
  },[])
  
  return (
    <GRFlexView flexDirection={"row"} borderRadius={1} padding={"2rem 2rem"} marginBottom={2} backgroundColor={Color.green100}>
        <GRFlexView alignItems={"center"} flexDirection={"row"}>
          <GRText marginRight={1} weight={"bold"}>
            검색
          </GRText>
          <GRTextInput
            marginRight={2}
            placeholder={"이름, 전화 번호로 검색 하세요."}
          />
        </GRFlexView>
        <GRButton onClick={onClickSearch}>
          조회
        </GRButton>
      </GRFlexView>
  )
}

export default ManagementSearch;