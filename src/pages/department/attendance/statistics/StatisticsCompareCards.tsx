import GRText from '@component/base/text/GRText'
import GRFlexView from '@component/base/view/GRFlexView'
import GRView from '@component/base/view/GRView'
import { css } from '@emotion/react'
import { Descriptions } from 'antd'
import React from 'react'
import { Color } from 'styles/colors'

const customBox = css`
  border: 0.1rem solid ${Color.grey100};
  box-shadow: rgba(32, 200, 113, 0.1) 4px 1px 20px -5px, rgba(0,0,0, 0.1) 0px 3px 7px -3px;
  border-radius: 1rem;
`

const StatisticsCompareCards = () => {
  return (
    <GRView>

    
    <GRText weight={"bold"} fontSize={"b4"}>지난주 대비</GRText>
        <GRFlexView flexDirection={"row"}>
          {/* <GRView padding={1} margin={1} customCss={customBox}>
            <GRView>
              <GRText>출석율</GRText>
            </GRView>
            <GRFlexView flexDirection="row">
              <GRFlexView>
                <GRView width={20}>
                  <GRText fontSize={"b5"} color={Color.grey50} marginRight={1}>2023-05-23</GRText>
                  <GRText fontSize={"h7"} >200</GRText>
                </GRView>
                <GRView width={20}>
                  <GRText fontSize={"b5"} color={Color.grey50} marginRight={1}>2023-05-23</GRText>
                  <GRText fontSize={"h7"} >220</GRText>
                </GRView>
              </GRFlexView>
              <GRFlexView>
                <GRText>+ 20</GRText>
              </GRFlexView>
            </GRFlexView>
          </GRView> */}
          <GRView padding={1} margin={1} customCss={customBox}>
            <Descriptions title={"출석율"} layout={"vertical"} colon={false}>
              <Descriptions.Item label="2023.05.23">200</Descriptions.Item>
              <Descriptions.Item label="2023.05.30">180</Descriptions.Item>
            </Descriptions>
          </GRView>
          <GRView padding={1} margin={1} customCss={customBox}>
            <Descriptions title={"결석"} layout={"vertical"} colon={false}>
              <Descriptions.Item label="2023.05.23">200</Descriptions.Item>
              <Descriptions.Item label="2023.05.30">180</Descriptions.Item>
            </Descriptions>
          </GRView>
        </GRFlexView>
        <GRFlexView flexDirection={"row"}>
          <GRView padding={1} margin={1} customCss={customBox}>
            <Descriptions title={"새등록"} layout={"vertical"} colon={false}>
              <Descriptions.Item label="2023.05.23">200</Descriptions.Item>
              <Descriptions.Item label="2023.05.30">180</Descriptions.Item>
            </Descriptions>
          </GRView>
          <GRView padding={1} margin={1} customCss={customBox}>
            <Descriptions title={"새가족 출석율"} layout={"vertical"} colon={false}>
              <Descriptions.Item label="2023.05.23">200</Descriptions.Item>
              <Descriptions.Item label="2023.05.30">180</Descriptions.Item>
            </Descriptions>
          </GRView>
        </GRFlexView>
        </GRView>
  )
}

export default StatisticsCompareCards