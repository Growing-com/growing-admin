import GRTable from "@component/base/GRTable"
import GRButton from "@component/base/button/GRButton"
import GRSelect from "@component/base/dataEntry/GRSelect"
import GRText from "@component/base/text/GRText"
import GRTextInput from "@component/base/text/GRTextInput"
import GRFlexView from "@component/base/view/GRFlexView"
import { Button, Divider, Pagination, Table } from "antd"
import { NextPage } from "next"
import { STATUS_DUMP_DATA } from "./dumpData"
import React, { useCallback } from "react"
import { Color } from "styles/colors"

const ManagementSearch = () =>{

  const onClickSearch = () => useCallback(()=>{
    
  },[])

  return (
    <GRFlexView  borderRadius={0.5} padding={"2rem 2rem"} marginBottom={1} backgroundColor="white">
        <GRFlexView flexDirection={'row'} justifyContent={"space-between"}>
            <GRText fontSize={"h9"} weight={"bold"}>
              계정 관리
            </GRText>
          <GRButton onClick={() => {}}>
            계정 생성
          </GRButton>
        </GRFlexView>
        <Divider/>
        <GRFlexView alignItems={"center"} flexDirection={"row"}  >
          <GRText marginRight={1} weight={"bold"} fontSize={"b5"}>
            검색
          </GRText>
          <GRTextInput
            marginRight={2}
            placeholder={"이름, 전화 번호로 검색 하세요."}
          />
          <GRButton onClick={onClickSearch}>
            조회
          </GRButton>
        </GRFlexView>
      </GRFlexView>
  )
}

export default ManagementSearch;