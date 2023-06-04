import { Tabs, TabsProps } from "antd";
import { FC } from "react";

const GRTab: FC<TabsProps> = ({ ...props }) => {
  return <Tabs {...props} />;
};

export default GRTab;
