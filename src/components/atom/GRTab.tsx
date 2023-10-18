import { TabPaneProps, Tabs, TabsProps } from "antd";
import { FC, useMemo } from "react";
import { tOptions } from "./dataEntry/type";

type tGRTab = {
  items: tOptions[];
} & Omit<TabsProps, "items">;

type tTab = {
  key: string;
  label: React.ReactNode;
} & Omit<TabPaneProps, "tab">;

const GRTab: FC<tGRTab> = ({ items, ...props }) => {
  const tabItem = useMemo(() => {
    if (items) {
      return items.map(_item => ({
        key: _item.value,
        label: _item.label
      }));
    }
    return [];
  }, [items]);

  return (
    <Tabs
      size={"large"}
      tabBarStyle={{
        fontWeight: "bold"
      }}
      items={tabItem as tTab[]}
      {...props}
    />
  );
};

export default GRTab;
