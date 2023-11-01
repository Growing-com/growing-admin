import { tDepartmentMainMenu } from "config/router";
import { create } from "zustand";

type menuState = {
  menu: tDepartmentMainMenu[];
  addMenu: (product: tDepartmentMainMenu) => void;
  removeMenu: () => void;
};

const menuStore = create<menuState>()(set => ({
  menu: [],
  addMenu: (_menu: tDepartmentMainMenu) => {
    set((state: { menu: tDepartmentMainMenu[] }) => {
      return {
        menu: [...state.menu, _menu]
      };
    });
  },
  removeMenu: () => {
    set(() => {
      return {
        menu: []
      };
    });
  }
}));

export default menuStore;
