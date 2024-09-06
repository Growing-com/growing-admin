import GRText from "@component/atom/text/GRText";
import type { tSex } from "apiV1_prefix/account/types";
import { SEX_NAME } from "config/const";
import React, { FC } from "react";

type tColumSexRender = {
  sexData: tSex;
};

const ColumSexRender: FC<tColumSexRender> = ({ sexData }) => {
  return (
    <>{sexData ? <GRText>{SEX_NAME[sexData]}</GRText> : <React.Fragment />}</>
  );
};

export default ColumSexRender;
