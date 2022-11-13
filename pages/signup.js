import SiteHead from '@components/common/SiteHead';
import useInput from '@hooks/useInput';
import CommerceLayout from '@components/common/CommerceLayout';
import { POST, POST_DATA } from '@apis/defaultApi';
import { useRouter } from 'next/router';
import { Blue } from '@components/input/Button';
import { toast } from 'react-toastify';
import Toast from '@components/common/ToastPopup';

export default function Signup() {
  const router = useRouter();
  const [email, onChangeEmail] = useInput('');
  const [name, onChangeName] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [phone, onChangePhone] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordConfirmation, onChangePasswordConfirmation] = useInput('');
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

    if (
      !reqBody.email ||
      !reqBody.name ||
      !reqBody.nickname ||
      !reqBody.phone ||
      !reqBody.password ||
      !reqBody.passwordConfirmation
    ) {
      toast.warn(`입력란을 모두 채워주세요.`);
      return;
    }

    POST(`/auth/signup`, reqBody)
      .then((res) => {
        console.log(res);
        if (res.success) {
          toast.success('회원가입 성공');
          router.push({
            pathname: `./welcome/${res.data.name}`,
          });
        }
      })
      .catch(function (error) {
        toast.error('회원가입 실패');
        return {};
      });
  }

  return (
    <CommerceLayout>
      <SiteHead title="회원가입" />
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">
            회원가입
          </h2>
          <Toast/>

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
