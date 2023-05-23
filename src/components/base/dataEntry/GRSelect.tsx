import { css } from '@emotion/react'
import styled from '@emotion/styled';
import { Select } from 'antd'
import type { SelectProps } from 'antd'
import React, { CSSProperties, FC } from 'react'
import { Color } from 'styles/colors';
import GRText from '../text/GRText';

interface tGRSelect extends SelectProps {
    options: ItemProps[];
    height?: CSSProperties['height'];
    width?: CSSProperties['width'];
}

type ItemProps = {
    label: string;
    value: string | number;
}

const { Option } = Select;

const GRSelect: FC<tGRSelect> = ({
    options,
    mode,
    height,
    width,
    ...props
}) => {
    // loading 페이지 개발 후 적용 필요
    if ( !options?.length ){
        return <></>    
    }

    return (
            <Select 
                mode={mode} 
                css={css`
                    display:flex;
                    width: ${width}rem;
                    height: ${height}rem;
                `}
                {...props}
            >
                {options.map((option,index) =>(
                    <Option 
                        key={`${option.label}_${index}`}
                        value={option.value}
                    >
                        <GRText color={Color.grey70}>
                            {option.label}
                        </GRText>
                    </Option>
                ))}
            </Select>
    )
}

export default GRSelect;