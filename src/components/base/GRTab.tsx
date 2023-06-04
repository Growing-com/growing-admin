import { Tabs, TabsProps } from "antd";
import { FC } from "react";

const GRTab: FC<TabsProps> = ({ ...props }) => {
  return <Tabs size={"large"} {...props} />;
};

export default GRTab;
