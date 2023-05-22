import GRButton from '@component/base/button/GRButton'
import GRDatePicker from '@component/base/dataEntry/GRDatePicker'
import GRSelect from '@component/base/dataEntry/GRSelect'
import GRText from '@component/base/text/GRText'
import GRTextInput from '@component/base/text/GRTextInput'
import GRFlexView from '@component/base/view/GRFlexView'
import GRView from '@component/base/view/GRView'
import React, { FC, useCallback } from 'react'

type FilterSearch = {

}

const FilterSearch : FC<FilterSearch> = () => {

    const onClickSearch  = useCallback(()=>{
    
    },[])

  return (
    <GRFlexView flexDirection={"row"}>
        <GRFlexView>
            <GRFlexView flexDirection={"row"} alignItems={"center"} marginBottom={1}>
                <GRText weight={"bold"} fontSize={"b5"} width={5}>
                    날짜
                </GRText>
                <GRDatePicker picker={"month"} width={15} />
                <GRText marginLeft={1} weight={"bold"} fontSize={"b5"} width={5}>
                    검색 조건
                </GRText>
                <GRSelect
                    style={{ flex:1 }}
                    options={[
                        {
                            label: "이름",
                            value: "name"
                        },
                        {
                            label: "코디",
                            value: "cordi"
                        },
                    ]}
                />
            </GRFlexView>
            <GRFlexView flexDirection={"row"} alignItems={"center"}>
                <GRText weight={"bold"} fontSize={"b5"} width={5}>
                    코디
                </GRText>
                <GRSelect
                    style={{ flex:1 }}
                    options={[
                        {
                            label: "이종민",
                            value: "10"
                        },
                        {
                            label: "우상욱",
                            value: "11"
                        },
                    ]}
                />
            </GRFlexView>
        </GRFlexView>
        <GRView>
            <GRButton onClick={onClickSearch} marginLeft={2}>
                조회
            </GRButton>
        </GRView>
      </GRFlexView>
  )
}

export default FilterSearch
