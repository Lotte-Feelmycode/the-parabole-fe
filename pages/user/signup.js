import SiteHead from '@components/common/SiteHead';
import Heading from '@components/input/heading';
import useInput from '@hooks/useInput';
import styled from '@emotion/styled';
import Input from '@components/input/input';
import CommerceLayout from '@components/common/CommerceLayout';
import PostButton from '@components/input/button';
import Router from 'next/router';
import { POST } from '@apis/defaultApi';

export default function Signup() {
  const router = useRouter();

  const [email, onChangeEmail] = useInput('');
  const [username, onChangeUsername] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [phone, onChangePhone] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordConfirmation, onChangePasswordConfirmation] = useInput('');

  function submitFormHandler(e) {
    e.preventDefault();

    const reqBody = {
      email: email,
      username: username,
      nickname: nickname,
      phone: phone,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };

    POST(`/user/signup`, reqBody)
      .then((id) => {
        console.log(id);
        router.push(
          {
            pathname: 'user/confirm',
            query: { id: id },
          },
          '/user/confirm',
        );
      })
      .catch(function (error) {
        console.log(error);
        return {};
      });
  }

  return (
    <CommerceLayout>
      <SiteHead title="회원가입" />
      <Divider />
      <Heading title="회원가입" type="h1"></Heading>
      <br />

      <Div>
        <Heading title="이메일" type="h3"></Heading>
        <Input
          type="email"
          name="email"
          placeHolder="이메일을 입력하세요."
          onChange={onChangeEmail}
        ></Input>

        <Heading title="사용자 이름" type="h3"></Heading>
        <Input
          type="text"
          name="username"
          placeHolder="사용자 이름을 입력하세요."
          onChange={onChangeUsername}
        ></Input>

        <Heading title="닉네임" type="h3"></Heading>
        <Input
          type="text"
          name="nickname"
          placeHolder="닉네임을 입력하세요."
          onChange={onChangeNickname}
        ></Input>

        <Heading title="전화번호" type="h3"></Heading>
        <Input
          type="tel"
          name="phone"
          placeHolder="전화번호를 입력하세요."
          onChange={onChangePhone}
        ></Input>

        <Heading title="비밀번호" type="h3"></Heading>
        <Input
          type="password"
          name="password"
          placeHolder="비밀번호를 입력하세요."
          onChange={onChangePassword}
          required
        ></Input>

        <Heading title="비밀번호 확인" type="h3"></Heading>
        <Input
          type="password"
          name="passwordConfirmation"
          placeHolder="비밀번호 재확인"
          onChange={onChangePasswordConfirmation}
          required
        ></Input>

        <div className="clearfix">
          <SplitDiv>
            <PostButton
              name="cancelbtn"
              buttonText="취소하기"
              onClickFunc={() => router.push('/')}
            ></PostButton>
          </SplitDiv>
          <text>&nbsp;&nbsp;&nbsp;&nbsp;</text>
          <SplitDiv>
            <PostButton
              name="signupbtn"
              buttonText="회원가입하기"
              onClickFunc={submitFormHandler}
            ></PostButton>
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

const FormTemplate = styled.form`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.hr`
  color: black;
  margin-bottom: 20px;
`;
