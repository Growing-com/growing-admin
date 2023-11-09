import { useUserInfoQuery } from "api/account/queries/useUserInfoQuery";
import {
  DEPARTMENT_MAIN_MENU,
  DUTY_MENU,
  tDepartmentMainMenu
} from "config/router";
import { head, includes } from "lodash";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import menuStore from "store/clientStore/menuStore";

const useLogin = () => {
  const { data: userInfo, refetch } = useUserInfoQuery();
  const { menu: mainMenu, addMenu } = menuStore();
  const router = useRouter();

  const handleRouterCheck = useCallback(async () => {
    if (!userInfo) {
      await refetch();
    }
  }, [refetch, userInfo]);

  useEffect(() => {
    (async () => {
      const _mainMenu = [] as tDepartmentMainMenu[];
      if (!!userInfo && !mainMenu.length) {
        const _findMenuByRole = DUTY_MENU.find(
          duty => duty.key === userInfo?.role
        );
        DEPARTMENT_MAIN_MENU.forEach(menu => {
          if (includes(_findMenuByRole?.value, menu.key)) {
            _mainMenu.push(menu);
            addMenu(menu);
          }
        });

        const _firstPath = head(_mainMenu)?.children[0].path;
        if (router.pathname.localeCompare(`/login`) === 0) {
          router.replace(`/department/${_firstPath}`);
        }
      }
    })();
  }, [userInfo, mainMenu, router, addMenu]);

  return [handleRouterCheck];
};

export default useLogin;
