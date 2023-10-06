import GRAlert from "@component/atom/alert/GRAlert";
import GRButtonText from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import styled from "@emotion/styled";
import { useLoginMutate } from "api/account/mutate/useLoginMutate";
import useKeyPressEventListener from "hooks/useKeyPressEventListener";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useCallback, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";

const Login = () => {
  const router = useRouter();

  const [userId, setUserId] = useState<string>();
  const [userPW, setUserPW] = useState<string>();

  const { mutateAsync } = useLoginMutate();

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
      router.replace("/department/management/account");
    } catch (error) {
      GRAlert.error("아이디 및 비밀번호를 확인해 주세요");
    }
  }, [mutateAsync, router, userId, userPW]);

  useKeyPressEventListener("Enter", () => {
    onClickLogin();
  });

  return (
    <LoginContainer>
      <GRView>
        <GRView width={15} height={12} style={{ position: "relative" }}>
          <Image
            src={"/logo_name.png"}
            fill={true}
            alt={"logo"}
            style={{ objectFit: "contain" }}
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
              onChange={e => setUserId(e.target.value)}
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
              onChange={e => setUserPW(e.target.value)}
            />
          </GRView>
        </GRFlexView>
        <GRFlexView>
          <GRButtonText width={"100%"} onClick={onClickLogin}>
            로그인
          </GRButtonText>
          <GRFlexView
            flexDirection={"row"}
            justifyContent={"center"}
            margintop={1}
          >
            <GRButtonText buttonType={"text"} width={"100%"}>
              <Link href={`${process.env.OPEN_KAKAO}`} target={"_blank"}>
                카카오 문의
              </Link>
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
