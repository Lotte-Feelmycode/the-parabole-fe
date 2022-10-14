import SiteHead from '@components/common/SiteHead';
import Heading from '@components/input/heading';
import useInput from '@hooks/useInput';
import styled from '@emotion/styled';
import Input from '@components/input/input';
import CommerceLayout from '@components/common/CommerceLayout';
import { POST } from '@apis/defaultApi';
import { useRouter } from 'next/router';
import * as btn from '@components/input/Button';

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

    if (
      email &&
      username &&
      nickname &&
      phone &&
      password &&
      passwordConfirmation
    ) {
      const reqBody = {
        email: email,
        username: username,
        nickname: nickname,
        phone: phone,
        password: password,
        passwordConfirmation: passwordConfirmation,
      };
    } else {
      alert(`회원가입란을 전부 작성해주세요.`);
      return;
    }

    POST(`/user/signup`, reqBody)
      .then((id) => {
        console.log(id);

        router.push(
          {
            pathname: `./confirm/${id}`,
          },
          `./confirm/${id}`,
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
      <TitleSection>
        <Heading title="회원가입" type="h1"></Heading>
      </TitleSection>

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
        <div className="py-2" />

        <BtnSection className="redirection-btn">
          <btn.SmallLineWhite
            buttonText="홈으로"
            onClickFunc={() => router.push('/')}
          />
          <div className="py-3" />
          <btn.Blue buttonText="회원가입하기" onClickFunc={submitFormHandler} />
        </BtnSection>
      </Div>
    </CommerceLayout>
  );
}

const Button = styled.button`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.fontColor};
  focus: outline-none;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0.5em 1.5em 0.5em 1.5em;
`;

const TitleSection = styled.div`
  margin-left: 40px;
  margin-bottom: 20px;
  margin-top: 40px;
`;

const BtnSection = styled.div`
  display: grid;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  margin-bottom: 20px;
  margin-right: 40px;
`;

const FormTemplate = styled.form`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.hr`
  color: black;
  margin-bottom: 20px;
`;
