import GRTextButton from "@component/atom/button/GRTextButton";
import GRText from "@component/atom/text/GRText";
import GRTextInput from "@component/atom/text/GRTextInput";
import GRFlexView from "@component/atom/view/GRFlexView";
import GRView from "@component/atom/view/GRView";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { ReactElement, useCallback } from "react";
import GRStylesConfig from "styles/GRStylesConfig";

const ChangePassword = () => {
  const router = useRouter();

  const onClickChangePassword = useCallback(() => {
    router.replace("/login");
  }, [router]);

  const onClickCancel = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <LoginContainer>
      <GRView width={15}>
        <GRFlexView margintop={1}>
          <GRView marginbottom={1}>
            <GRText marginbottom={GRStylesConfig.BASE_MARGIN} weight={"bold"}>
              현재 비밀번호
            </GRText>
            <GRTextInput placeholder={"현재 비밀번호를 입력해 주세요."} />
          </GRView>
          <GRView marginbottom={1}>
            <GRText marginbottom={GRStylesConfig.BASE_MARGIN} weight={"bold"}>
              새 비밀번호
            </GRText>
            <GRTextInput placeholder={"새 비밀번호를 입력해 주세요."} />
          </GRView>
          <GRView marginbottom={1}>
            <GRText marginbottom={GRStylesConfig.BASE_MARGIN} weight={"bold"}>
              새 비밀번호 확인
            </GRText>
            <GRTextInput placeholder={"새 비밀번호를 다시 입력해 주세요."} />
          </GRView>
        </GRFlexView>
        <GRFlexView>
          <GRTextButton
            width={"100%"}
            onClick={onClickChangePassword}
            marginbottom={1}
          >
            변경
          </GRTextButton>
          <GRTextButton
            width={"100%"}
            buttonType={"cancel"}
            onClick={onClickCancel}
          >
            취소
          </GRTextButton>
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
