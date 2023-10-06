import { Dropdown, MenuProps } from "antd";
import type { FC, ReactNode } from "react";
import { Color } from "styles/colors";
import GRText from "../text/GRText";
import GRView from "../view/GRView";
import GRButtonText from "./GRTextButton";

type tGRDropDownButton = {
  menu: MenuProps["items"];
  iconComponent?: ReactNode;
  title?: string;
};

const GRDropDownButton: FC<tGRDropDownButton> = ({
  menu,
  iconComponent,
  title
}) => {
  return (
    <GRView>
      <Dropdown menu={{ items: menu }} placement="bottomLeft" arrow>
        <GRButtonText buttonType={"default"} size={"large"}>
          {iconComponent && iconComponent}
          <GRText color={Color.white}>{title ?? "버튼"}</GRText>
        </GRButtonText>
      </Dropdown>
    </GRView>
  );
};

export default GRDropDownButton;
