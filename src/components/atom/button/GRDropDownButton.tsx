import { Dropdown, MenuProps } from "antd";
import type { FC, ReactNode } from "react";
import { Color } from "styles/colors";
import GRText from "../text/GRText";
import GRView from "../view/GRView";
import GRTextButton from "./GRTextButton";

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
        <GRTextButton buttonType={"default"} size={"large"}>
          {iconComponent && iconComponent}
          <GRText color={Color.white}>{title ?? "버튼"}</GRText>
        </GRTextButton>
      </Dropdown>
    </GRView>
  );
};

export default GRDropDownButton;
