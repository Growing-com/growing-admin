import GRAlert from "@component/atom/alert/GRAlert";
import GRTextButton from "@component/atom/button/GRTextButton";
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
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useCallback, useState } from "react";
import menuStore from "store/clientStore/menuStore";
import GRStylesConfig from "styles/GRStylesConfig";
import { Color } from "styles/colors";

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
      router.replace(`/department/newfamily/management`);
      // await handleRouterCheck();
    } catch (error) {
      GRAlert.error("아이디 및 비밀번호를 확인해 주세요");
    }
  }, [mutateAsync, userId, userPW, handleRouterCheck]);

  useKeyPressEventListener("Enter", () => {
    onClickLogin();
  });

  return (
    <LoginContainer>
      <GRView>
        <GRView width={15} height={12} style={{ position: "relative" }}>
          <Image
            src={"/logo_name.png"}
            fill
            priority
            alt={"logo"}
            style={{ objectFit: "contain" }}
            sizes="(max-width: 600px) 15rem, (max-width: 1200px) 10rem, 15rem"
          />
        </GRView>
        <GRFlexView margintop={1}>
          <GRView marginbottom={1}>
            <GRText marginbottom={GRStylesConfig.BASE_MARGIN} weight={"bold"}>
              아이디
            </GRText>
            <GRTextInput
              value={userId}
              placeholder={"아이디를 입력해 주세요"}
              onChange={e => setUserId(e)}
            />
          </GRView>
          <GRView marginbottom={1}>
            <GRText marginbottom={GRStylesConfig.BASE_MARGIN} weight={"bold"}>
              비밀번호
            </GRText>
            <GRTextInput
              value={userPW}
              placeholder={"비밀번호를 입력해 주세요"}
              type={"password"}
              onChange={e => setUserPW(e)}
            />
          </GRView>
        </GRFlexView>
        <GRFlexView>
          <GRTextButton width={"100%"} onClick={onClickLogin}>
            로그인
          </GRTextButton>
          <GRFlexView
            flexDirection={"row"}
            justifyContent={"center"}
            margintop={1}
          >
            <GRTextButton buttonType={"text"} width={"100%"}>
              <Link
                href={`${process.env.NEXT_PUBLIC_OPEN_KAKAO}`}
                target={"_blank"}
              >
                카카오 문의
              </Link>
            </GRTextButton>
            {/* <GRTextButton
              buttonType={"text"}
              width={"100%"}
              onClick={onClickChangePassword}
            >
              비밀번호 변경
            </GRTextButton> */}
          </GRFlexView>
          <GRFlexView alignItems={"center"}>
            <GRText fontSize={"b8"} color={Color.grey80}>
              {`v${publicRuntimeConfig?.version || ""}`}
            </GRText>
          </GRFlexView>
        </GRFlexView>
      </GRView>
    </LoginContainer>
  );
};

export default Login;

Login.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
