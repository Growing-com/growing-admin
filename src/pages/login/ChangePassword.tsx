import GRButtonText from "@component/base/button/GRTextButton";
import GRText from "@component/base/text/GRText";
import GRTextInput from "@component/base/text/GRTextInput";
import GRFlexView from "@component/base/view/GRFlexView";
import GRView from "@component/base/view/GRView";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { ReactElement, useCallback } from "react";
import GRStylesConfig from "styles/GRStylesConfig";

const ChangePassword = () => {
  const router = useRouter();

  const onClickChangePassword = useCallback(() => {
    router.replace("/login");
  }, []);

  const onClickCancel = useCallback(() => {
    router.back();
  }, []);

  return (
    <LoginContainer>
      <GRView width={15}>
        <GRFlexView marginTop={1}>
          <GRView marginBottom={1}>
            <GRText marginBottom={GRStylesConfig.BASE_MARGIN} weight={"bold"}>
              현재 비밀번호
            </GRText>
            <GRTextInput placeholder={"현재 비밀번호를 입력해 주세요."} />
          </GRView>
          <GRView marginBottom={1}>
            <GRText marginBottom={GRStylesConfig.BASE_MARGIN} weight={"bold"}>
              새 비밀번호
            </GRText>
            <GRTextInput placeholder={"새 비밀번호를 입력해 주세요."} />
          </GRView>
          <GRView marginBottom={1}>
            <GRText marginBottom={GRStylesConfig.BASE_MARGIN} weight={"bold"}>
              새 비밀번호 확인
            </GRText>
            <GRTextInput placeholder={"새 비밀번호를 다시 입력해 주세요."} />
          </GRView>
        </GRFlexView>
        <GRFlexView>
          <GRButtonText
            width={"100%"}
            onClick={onClickChangePassword}
            marginBottom={1}
          >
            변경
          </GRButtonText>
          <GRButtonText
            width={"100%"}
            buttonType={"cancel"}
            onClick={onClickCancel}
          >
            취소
          </GRButtonText>
        </GRFlexView>
      </GRView>
    </LoginContainer>
  );
};

export default ChangePassword;

ChangePassword.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
