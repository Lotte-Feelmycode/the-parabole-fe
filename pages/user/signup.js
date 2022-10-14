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

    const reqBody = {
      email: email,
      username: username,
      nickname: nickname,
      phone: phone,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };

    if (
      !reqBody.email ||
      !reqBody.username ||
      !reqBody.nickname ||
      !reqBody.phone ||
      !reqBody.password ||
      !reqBody.passwordConfirmation
    ) {
      alert(`입력란을 모두 채워주세요.`);
      return;
    }

    POST(`/user/signup`, reqBody)
      .then((id) => {
        console.log(id);

        router.push({
          pathname: `./welcome/${id}`,
        });
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

      <Div>
        <TitleSection>
          <Heading title="회원가입" type="h1"></Heading>
        </TitleSection>
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

const BtnSection = styled.div`
  display: grid;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin: 7% 35%;
`;

const Divider = styled.hr`
  color: black;
  margin-bottom: 20px;
`;

const TitleSection = styled.div`
  margin-bottom: 20px;
`;
