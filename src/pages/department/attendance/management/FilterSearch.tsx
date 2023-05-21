import GRButton from '@component/base/button/GRButton'
import GRDatePicker from '@component/base/dataEntry/GRDatePicker'
import GRSelect from '@component/base/dataEntry/GRSelect'
import GRText from '@component/base/text/GRText'
import GRTextInput from '@component/base/text/GRTextInput'
import GRFlexView from '@component/base/view/GRFlexView'
import React, { FC, useCallback } from 'react'

type FilterSearch = {

}

const FilterSearch : FC<FilterSearch> = () => {

    const onClickSearch  = useCallback(()=>{
    
    },[])

  return (
    <GRFlexView >
        <GRFlexView flexDirection={"row"}>
            <GRText marginRight={1} weight={"bold"} fontSize={"b5"}>
                날짜
            </GRText>
            <GRDatePicker />
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
            <GRText marginRight={1} weight={"bold"} fontSize={"b5"}>
                검색 조건
            </GRText>
            <GRSelect
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
            <GRText marginRight={1} weight={"bold"} fontSize={"b5"}>
                코디
            </GRText>
            <GRSelect
                mode={"multiple"}
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
            <GRButton onClick={onClickSearch}>
                조회
            </GRButton>
        </GRFlexView>
      </GRFlexView>
  )
}

export default FilterSearch
