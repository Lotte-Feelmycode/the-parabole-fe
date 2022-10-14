import useInput from '@hooks/useInput';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead';
import Heading from '@components/input/heading';
import Input from '@components/input/input';
import axios from 'axios';
import * as btn from '@components/input/Button';

export default function Signin() {
  const router = useRouter();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  function submitFormHandler(e) {
    e.preventDefault();

    const reqBody = {
      email: email,
      password: password,
    };

    axios
      .post('http://localhost:8080/api/v1/user/signin', reqBody, {})
      .then((res) => {
        console.log(res.data);

        if (res.status === 200) {
          sessionStorage.setItem('login', res.data.userId);
          if (res.data.message.includes('판매자')) {
            router.push('/seller/main');
          } else if (res.data.message.includes('사용자')) {
            router.push('/');
          }
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error + ' : 로그인 실패');
        alert('로그인 실패');
      });
  }

  return (
    <CommerceLayout>
      <SiteHead title="로그인" />
      <Divider />
      <TitleSection>
        <Heading title="로그인" type="h1"></Heading>
      </TitleSection>
      <Div>
        <Heading title="이메일" type="h3"></Heading>
        <Input
          type="email"
          name="email"
          placeHolder="이메일을 입력하세요."
          onChange={onChangeEmail}
        ></Input>
        <label>
          <input type="checkbox" id="myCheck" /> Remember me
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
        <P>
          By creating an account you agree to our <a href="#">Terms Privacy</a>.
        </P>
        <br />

        <BtnSection className="redirection-btn">
          <btn.LineBlue
            buttonText="회원가입하기"
            onClickFunc={() => router.push('/user/signup')}
          />
          <div className="py-3" />
          <btn.Blue buttonText="로그인하기" onClickFunc={submitFormHandler} />
        </BtnSection>
      </Div>
    </CommerceLayout>
  );
}

const P = styled.p`
  font-size: small;
`;

const BtnSection = styled.div`
  display: grid;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15% 30%;
`;

const Divider = styled.hr`
  color: black;
  margin-bottom: 20px;
`;

const TitleSection = styled.div`
  margin-left: 40px;
  margin-bottom: 20px;
  margin-top: 40px;
`;
