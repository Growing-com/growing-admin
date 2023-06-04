import GRButtonText from "@component/base/button/GRTextButton";
import GRText from "@component/base/text/GRText";
import GRTextInput from "@component/base/text/GRTextInput";
import GRFlexView from "@component/base/view/GRFlexView";
import GRView from "@component/base/view/GRView";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useCallback, useState } from "react";
import GRStylesConfig from "styles/GRStylesConfig";

const Login = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string>();

  const onClickLogin = useCallback(() => {
    if (userId) {
      router.replace("/department/management/account");
    } else {
      confirm("아이디 입력해주세요.");
    }
  }, [userId]);

  const onClickChangePassword = useCallback(() => {
    router.push("/login/ChangePassword");
  }, []);

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
        <GRFlexView marginTop={1}>
          <GRView marginBottom={1}>
            <GRText marginBottom={GRStylesConfig.BASE_MARGIN} weight={"bold"}>
              아이디
            </GRText>
            <GRTextInput
              placeholder={"아이디를 입력해 주세요"}
              onChange={e => setUserId(e.target.value)}
            />
          </GRView>
          <GRView marginBottom={1}>
            <GRText marginBottom={GRStylesConfig.BASE_MARGIN} weight={"bold"}>
              비밀번호
            </GRText>
            <GRTextInput placeholder={"비밀번호를 입력해 주세요"} />
          </GRView>
        </GRFlexView>
        <GRFlexView>
          <GRButtonText width={"100%"} onClick={onClickLogin}>
            로그인
          </GRButtonText>
          <GRFlexView
            flexDirection={"row"}
            justifyContent={"center"}
            marginTop={1}
          >
            <GRButtonText buttonType={"text"} width={"100%"}>
              <Link href={`${process.env.OPEN_KAKAO}`} target={"_blank"}>
                카카오 문의
              </Link>
            </GRButtonText>
            <GRButtonText
              buttonType={"text"}
              width={"100%"}
              onClick={onClickChangePassword}
            >
              비밀번호 변경
            </GRButtonText>
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
