import { GET_DATA } from '@apis/defaultApi';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SiteHead from '@components/common/SiteHead';
import CommerceLayout from '@components/common/CommerceLayout';

export default function SignupConfirm() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const userId = router.query.id;
    console.log(router.query.id);
    GET_DATA(`/user/${userId}`).then((res) => {
      if (res) {
        setUserInfo(res);
      }
    });
  }, [router.query]);

  return (
    <CommerceLayout>
      <SiteHead title="회원가입 완료" />
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto font-semibold">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">
            회원가입 완료
          </h2>
          <div className="max-w-lg border rounded-lg mx-auto bg-blue-200">
            <div className="flex flex-col items-center gap-4 p-4 md:p-8">
              <span className="text-black-400 text-lg relative px-4 ">
                THE PARABOLE 회원 가입을 축하합니다 :)
                <br />
                {userInfo.username} 님의 가입 정보는 아래와 같습니다.
              </span>

              <div>
                <label
                  for="email"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  이메일
                </label>
                <input
                  disabled
                  name="email"
                  value={userInfo.email}
                  className="w-full bg-gray-50 text-gray-800 border ring-indigo-300 rounded outline-none px-3 py-2"
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
                  disabled
                  name="nickname"
                  value={userInfo.nickname}
                  className="w-full bg-gray-50 text-gray-800 border ring-indigo-300 rounded outline-none px-3 py-2"
                />
              </div>

              <div>
                <label
                  for="tel"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  연락처
                </label>
                <input
                  disabled
                  name="tel"
                  value={userInfo.phone}
                  className="w-full bg-gray-50 text-gray-800 border ring-indigo-300 rounded outline-none px-3 py-2"
                />
              </div>
            </div>

            <div className="flex justify-center items-center bg-gray-100 p-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus-visible:ring ring-blue-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 mr-5 px-8 py-4"
                onClick={() => router.push('/')}
              >
                홈으로
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus-visible:ring ring-blue-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-4"
                onClick={() => router.push('/user/signin')}
              >
                로그인하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </CommerceLayout>
  );
}
