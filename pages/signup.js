import SiteHead from '@components/common/SiteHead';
import useInput from '@hooks/useInput';
import CommerceLayout from '@components/common/CommerceLayout';
import { POST, POST_DATA } from '@apis/defaultApi';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Blue } from '@components/input/Button';
import { AUTH_ERROR } from '@utils/constants/errors';
import { isEmpty } from '@utils/functions';

export default function Signup() {
  const router = useRouter();
  const [email, onChangeEmail] = useInput('');
  const [name, onChangeName] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [phone, onChangePhone] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordConfirmation, onChangePasswordConfirmation] = useInput('');

  function email_check(email) {
    var reg =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return reg.test(email);
  }

  function password_check(password) {
    var regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    return regPass.test(password);
  }

  function validation(inputParams) {
    if (isEmpty(inputParams.email)) {
      alert(AUTH_ERROR.NO_EMAIL);
      return false;
    }
    if (!email_check(inputParams.email)) {
      alert(AUTH_ERROR.INADEQUATE_EMAIL);
      return false;
    }
    if (isEmpty(inputParams.name)) {
      alert(AUTH_ERROR.NO_USERNAME);
      return false;
    }
    if (isEmpty(inputParams.nickname)) {
      alert(AUTH_ERROR.NO_NICKNAME);
      return false;
    }
    if (isEmpty(inputParams.phone)) {
      alert(AUTH_ERROR.NO_PHONE);
      return false;
    }
    if (isEmpty(inputParams.password)) {
      alert(AUTH_ERROR.NO_PASSWORD);
      return false;
    }
    if (isEmpty(inputParams.passwordConfirmation)) {
      alert(AUTH_ERROR.NO_PASSWORD_CONFIRMATION);
      return false;
    }
    if (!password_check(inputParams.password)) {
      alert(AUTH_ERROR.INADEQUATE_PASSWORD);
      return false;
    }
    if (inputParams.password !== inputParams.passwordConfirmation) {
      alert(AUTH_ERROR.NOT_IDENTICAL);
      return false;
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const reqBody = {
      email: email,
      name: name,
      nickname: nickname,
      phone: phone,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };

    if (validation(reqBody)) {
      POST(`/auth/signup`, reqBody)
        .then((res) => {
          console.log(res);
          if (res.success) {
            alert('회원가입 성공');
            router.push({
              pathname: `./welcome/${res.data.name}`,
            });
          }
        })
        .catch(function (error) {
          alert('회원가입 실패');
          return {};
        });
    }
  }

  return (
    <CommerceLayout>
      <SiteHead title="회원가입" />
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">
            회원가입
          </h2>

          <form className="max-w-lg border rounded-lg mx-auto" method="post">
            <div className="flex flex-col gap-4 p-4 md:p-8">
              <div>
                <label
                  for="email"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  이메일
                </label>
                <input
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  type="email"
                  name="email"
                  placeHolder="이메일을 입력하세요."
                  onChange={onChangeEmail}
                  required
                />
              </div>

              <div>
                <label
                  for="name"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  사용자명
                </label>
                <input
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  type="text"
                  name="name"
                  placeHolder="사용자 이름을 입력하세요."
                  onChange={onChangeName}
                  required
                />
              </div>

              <div>
                <label
                  for="nickname"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  닉네임
                </label>
                <input
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  type="text"
                  name="nickname"
                  placeHolder="닉네임을 입력하세요."
                  onChange={onChangeNickname}
                  required
                />
              </div>

              <div>
                <label
                  for="tel"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  전화번호
                </label>
                <input
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  type="tel"
                  name="phone"
                  placeHolder="전화번호를 입력하세요."
                  onChange={onChangePhone}
                  required
                />
              </div>

              <div>
                <label
                  for="password"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  비밀번호
                </label>
                <input
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  type="password"
                  name="password"
                  minlength="6"
                  maxlength="12"
                  placeHolder="비밀번호를 입력하세요."
                  onChange={onChangePassword}
                  required
                />
              </div>

              <div>
                <label
                  for="passwordConfirmation"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  비밀번호 확인
                </label>
                <input
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  type="password"
                  name="passwordConfirmation"
                  minlength="6"
                  maxlength="12"
                  placeHolder="비밀번호를 다시 입력하세요."
                  onChange={onChangePasswordConfirmation}
                  required
                />
              </div>
              <div className="py-1" />
              <Blue buttonText="회원가입하기" onClickFunc={handleSubmit} />
            </div>
          </form>
        </div>
      </div>
    </CommerceLayout>
  );
}
