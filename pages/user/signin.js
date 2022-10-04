import { GET } from '@apis/defaultApi';
import SiteHead from '@components/common/SiteHead';
import Heading from '@components/input/heading';
import useInput from '@hooks/useInput';
import styled from '@emotion/styled';
import Input from '@components/input/input';
import CommerceLayout from '@components/common/CommerceLayout';
import PostButton from '@components/input/button';

export default function UserSignIn() {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const signInDto = {
      email: email,
      password: password,
    };

    const signin = GET('/user', signInDto);
  };

  return (
    <CommerceLayout>
      <SiteHead title="로그인" />
      <Divider />
      <Heading title="로그인" type="h1"></Heading>
      <br />

      <Div>
        <Heading title="이메일" type="h3"></Heading>
        <Input
          type="email"
          name="email"
          placeHolder="이메일을 입력하세요."
          onChange={onChangeEmail}
        ></Input>
        <label>
          <input type="checkbox" checked="checked" name="remember" /> Remember
          me
        </label>
        <br />
        <br />
        <Heading title="비밀번호" type="h3"></Heading>
        <Input
          type="password"
          name="password"
          placeHolder="비밀번호를 입력하세요."
          onChange={onChangePassword}
          required
        ></Input>
        <p>
          By creating an account you agree to our <a href="#">Terms Privacy</a>.
        </p>{' '}
        <br />
        <div className="clearfix">
          <SplitDiv>
            <PostButton name="signupbtn" buttonText="회원가입하기"></PostButton>
          </SplitDiv>
          <text>&nbsp;&nbsp;&nbsp;&nbsp;</text>
          <SplitDiv>
            <PostButton name="signinbtn" buttonText="로그인하기"></PostButton>
          </SplitDiv>
        </div>
      </Div>
    </CommerceLayout>
  );
}

const SplitDiv = styled.div`
  display: inline-block;
`;

const Div = styled.div`
  display: flex;
  margin-left: 40px;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Divider = styled.hr`
  color: black;
  margin-bottom: 20px;
`;
