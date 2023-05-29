import { Tabs, TabsProps } from "antd";
import { FC } from "react";

type tGRTab = {} & TabsProps;

const GRTab: FC<tGRTab> = ({ ...props }) => {
  return <Tabs {...props} />;
};

export default GRTab;
