import { css } from "@emotion/react";
import { CSSProperties } from "react";

export type tGetMargin = {
    margin?: CSSProperties['margin'];
    marginTop?: CSSProperties['marginTop'];
    marginRight?: CSSProperties['marginRight'];
    marginBottom?: CSSProperties['marginBottom'];
    marginLeft?: CSSProperties['marginLeft'];
    marginHorizontal?: CSSProperties['marginRight'];
    marginVertical?: CSSProperties['marginBottom'];
}

const getMargin = ({
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginHorizontal,
    marginVertical
}: tGetMargin) => {
    if( margin ){
        return css`margin:${margin}rem`
    }
    if( marginHorizontal ) {
        marginRight = marginHorizontal;
        marginLeft = marginHorizontal;
    }
    if( marginVertical ){
        marginTop = marginVertical;
        marginBottom = marginVertical;
    }
    
    return css`
        margin-top: ${marginTop}rem;
        margin-bottom: ${marginBottom}rem;
        margin-right: ${marginRight}rem;
        margin-left: ${marginLeft}rem;
    `
}


export {
    getMargin
};
