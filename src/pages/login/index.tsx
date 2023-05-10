import GRButton from "@component/base/button/GRButton";
import GRText from "@component/base/text/GRText";
import GRTextInput from "@component/base/text/GRTextInput";
import GRFlexView from "@component/base/view/GRFlexView";
import GRView from "@component/base/view/GRView";
import styled from "@emotion/styled";
import Image from "next/image";

const Login = () => {
  return(
    <LoginContainer>
      <GRView width={14} height={10}>
        <GRView width={14} height={10} style={{ position:'relative' }}>
          <Image src={"/logo_name.png"} fill={true} alt={"logo"} style={{ objectFit:"contain" }} />
        </GRView>
        <GRFlexView>
          <GRView marginBottom={1}>
            <GRText marginBottom={0.5} weight={"bold"}>아이디</GRText>
            <GRTextInput placeholder={"아이디를 입력해 주세요"}/> 
          </GRView>
          <GRView marginBottom={1}>
            <GRText marginBottom={0.5} weight={"bold"}>비밀번호</GRText>
            <GRTextInput placeholder={"비밀번호를 입력해 주세요"}/> 
          </GRView>
        </GRFlexView>
        <GRFlexView>
          <GRButton>
            로그인
          </GRButton>
          <GRFlexView flexDirection={'row'}>
            <GRButton type={'link'}>
              카카오 문의
            </GRButton>
            <GRButton type={'link'}>
              비밀번호 변경
            </GRButton>
          </GRFlexView>
        </GRFlexView>
      </GRView>
    </LoginContainer>
  )
}

export default Login;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`
