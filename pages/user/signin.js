import useInput from '@hooks/useInput';
import { useRouter } from 'next/router';
import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead';
import { POST } from '@apis/defaultApi';
import Link from 'next/link';
import { Blue } from '@components/input/Button';
import { FRONT_BASE_URL } from '@apis/api-config';

export default function Signin() {
  const router = useRouter();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  function handleSubmit(e) {
    e.preventDefault();

    const reqBody = {
      email: email,
      password: password,
    };

    POST(`/auth/signin`, reqBody)
      .then((res) => {
        console.log(res);
        if (res.success) {
          localStorage.setItem('userId', res.data.userId);
          localStorage.setItem('email', res.data.email);
          localStorage.setItem('name', res.data.name);
          localStorage.setItem('nickname', res.data.nickname);
          localStorage.setItem('phone', res.data.phone);
          localStorage.setItem('imageUrl', res.data.imageUrl);
          localStorage.setItem('role', res.data.role);
          localStorage.setItem('authProvider', res.data.authProvider);
          localStorage.setItem('sellerId', res.data.sellerId);
          localStorage.setItem('token', res.data.token);

          alert('로그인 성공');
          router.push('/');
        }
      })
      .catch(function (error) {
        alert('로그인 실패');
      });
  }

  return (
    <CommerceLayout>
      <SiteHead title="로그인" />

      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">
            로그인
          </h2>

          <form className="max-w-lg border rounded-lg mx-auto">
            <div className="flex flex-col gap-4 p-4 md:p-8">
              <div>
                <label
                  htmlFor="email"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  이메일
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="이메일을 입력하세요."
                  onChange={onChangeEmail}
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  비밀번호
                </label>
                <input
                  type="password"
                  name="password"
                  minLength="6"
                  maxLength="12"
                  placeholder="비밀번호를 입력하세요."
                  onChange={onChangePassword}
                  required
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                />
              </div>

              <Blue buttonText="로그인하기" onClickFunc={handleSubmit} />

              <div className="flex justify-center items-center relative">
                <span className="h-px bg-gray-300 absolute inset-x-0"></span>
                <span className="bg-white text-gray-400 text-sm relative px-4">
                  Log in with social
                </span>
              </div>

            <div className="flex justify-center items-center bg-gray-100 p-4">
              <p className="text-gray-500 text-sm text-center">
                <a
                  href="/user/signup"
                  className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 transition duration-100"
                >
                  회원가입하기
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </CommerceLayout>
  );
}
