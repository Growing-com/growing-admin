import { Tabs, TabsProps } from "antd";
import { FC } from "react";

const GRTab: FC<TabsProps> = ({ ...props }) => {
  return (
    <Tabs
      size={"large"}
      tabBarStyle={{
        fontWeight: "bold"
      }}
      {...props}
    />
  );
};

export default GRTab;
