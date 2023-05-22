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
        <GRFlexView flexDirection={"row"} alignItems={"center"} marginBottom={1}>
            <GRText marginRight={1} weight={"bold"} fontSize={"b5"} width={5}>
                날짜
            </GRText>
            <GRDatePicker picker={"month"} width={15} />
        </GRFlexView>
        <GRFlexView flexDirection={"row"} alignItems={"center"}>
            <GRText marginRight={1} weight={"bold"} fontSize={"b5"} width={5}>
                검색 조건
            </GRText>
            <GRSelect
                width={15}
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
            <GRText marginLeft={1}  weight={"bold"} fontSize={"b5"} width={5}>
                코디
            </GRText>
            <GRSelect
                width={15}
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
            <GRFlexView alignItems={"flex-end"}>
                <GRButton onClick={onClickSearch}>
                    조회
                </GRButton>
            </GRFlexView>
        </GRFlexView>
      </GRFlexView>
  )
}

export default FilterSearch
