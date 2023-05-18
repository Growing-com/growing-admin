import GRButton from '@component/base/button/GRButton'
import GRSelect from '@component/base/dataEntry/GRSelect'
import GRText from '@component/base/text/GRText'
import GRTextInput from '@component/base/text/GRTextInput'
import GRFlexView from '@component/base/view/GRFlexView'
import React, { FC, useCallback } from 'react'

type FilterSearch = {

}

const FilterSearch : FC<FilterSearch> = () => {

    const onClickSearch = () => useCallback(()=>{
    
    },[])

  return (
    <GRFlexView >
        <GRFlexView flexDirection={"row"}>
            <GRText marginRight={1} weight={"bold"} fontSize={"b5"}>
            날짜
            </GRText>
            <GRTextInput
            marginRight={2}
            placeholder={"이름, 전화 번호로 검색 하세요."}
            />
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
        </GRFlexView>
        <GRButton onClick={onClickSearch}>
          조회
        </GRButton>
      </GRFlexView>
  )
}

export default FilterSearch
