import GRAlert from "@component/atom/alert/GRAlert";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import styled from "@emotion/styled";
import { useLoginMutate } from "api/account/mutate/useLoginMutate";
import { DEPARTMENT_MAIN_MENU } from "config/router";
import useLogin from "hooks/auth/useLogin";
import useKeyPressEventListener from "hooks/useKeyPressEventListener";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { ReactElement, useCallback, useState } from "react";
import menuStore from "store/clientStore/menuStore";
import { Color } from "styles/colors";
// import Image from "next/image";

const { publicRuntimeConfig } = getConfig();

const Login = () => {
  const [userId, setUserId] = useState<string>();
  const [userPW, setUserPW] = useState<string>();

  const { mutateAsync } = useLoginMutate();
  const [handleRouterCheck] = useLogin();
  const router = useRouter();
  const { menu: mainMenu, addMenu } = menuStore();
  const onClickLogin = useCallback(async () => {
    if (!userId || !userPW) {
      confirm("아이디 입력해주세요.");
      return;
    }
    try {
      await mutateAsync({
        username: userId,
        password: userPW
      });
      DEPARTMENT_MAIN_MENU.forEach(menu => {
        addMenu(menu);
      });
      router.replace(`/department/personalData`);
      // await handleRouterCheck();
    } catch (error) {
      GRAlert.error("아이디 및 비밀번호를 확인해 주세요");
    }
  }, [mutateAsync, userId, userPW, handleRouterCheck]);

  useKeyPressEventListener("Enter", () => {
    onClickLogin();
  });

  return (
    <AppContainer>
      {/* <div>top</div> */}
      <LoginContainer>
        <GRView width={20} height={16.81}>
          {/* <GRView width={15} height={12} style={{ position: "relative" }}>
          <Image
            src={"/logo_name.png"}
            fill={true}
            alt={"logo"}
            style={{ objectFit: "contain" }}
          />
        </GRView> */}
          <GRFlexView isBoard={true} padding={1.5}>
            <GRFlexView>
              <GRText marginbottom={1.5} weight={"bold"} fontSize={"h10"} color={"white"}>
                환영합니다~
              </GRText>
              <GRView marginbottom={1.5}>
                <GRTextInput
                  value={userId}
                  placeholder={"아이디를 입력해 주세요"}
                  height={2.5}
                  onChange={e => setUserId(e)}
                />
              </GRView>
              <GRView marginbottom={1.5}>
                <GRTextInput
                  value={userPW}
                  placeholder={"비밀번호를 입력해 주세요"}
                  type={"password"}
                  height={2.5}
                  onChange={e => setUserPW(e)}
                />
              </GRView>
            </GRFlexView>
            <GRFlexView>
              <GRButtonText
                width={"100%"}
                height={2.5}
                buttonType={"custom"}
                backgroundColor={Color.black100}
                borderColor={Color.black100}
                textColor={Color.white}
                onClick={onClickLogin}
              >
                로그인
              </GRButtonText>
              {/* <GRButtonText
              buttonType={"text"}
              width={"100%"}
              onClick={onClickChangePassword}
            >
              비밀번호 변경
            </GRButtonText> */}
            </GRFlexView>
          </GRFlexView>
          <GRFlexView alignItems={"center"}>
            {/* <GRText fontSize={"b8"} color={Color.grey80}>
              {`v${publicRuntimeConfig?.version}` ?? ""}
            </GRText> */}
            <GRText margintop={2.5} color={Color.grey10}>
              흐르는 시간, 흐르는 우리
            </GRText>
          </GRFlexView>
        </GRView>
      </LoginContainer>
      {/* <div>bottom</div> */}
    </AppContainer>
  );
};

export default Login;

Login.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

// const LoginContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100vw;
//   height: 100vh;
// `;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const LoginContainer = styled.div`
  flex: 1; /* 로그인 컨테이너가 남은 공간을 차지하도록 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
`;
