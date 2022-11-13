import { useRouter } from 'next/router';
import SiteHead from '@components/common/SiteHead';
import CommerceLayout from '@components/common/CommerceLayout';
import * as btn from '@components/input/Button';
import Link from 'next/link';
import { LINKS } from '@utils/constants/links';

export default function Welcome() {
  const router = useRouter();

  return (
    <CommerceLayout>
      <SiteHead title="회원가입 완료" />
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto font-semibold">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">
            회원가입 완료🎉
          </h2>
          <div className="max-w-lg border rounded-lg mx-auto bg-blue-200">
            <div className="flex flex-col items-center gap-4 p-4 md:p-8 mt-5">
              <span className="text-black-400 text-lg relative px-4 ">
                {router.query.id} 님 😊 <br /> THE PARABOLE 회원 가입을
                축하합니다 :)
              </span>
            </div>

            <div className="flex justify-center items-center p-4 mb-7">
              <Link href={LINKS.MAIN}>
                <a>
                  <btn.Blue buttonText="홈으로" />
                </a>
              </Link>
              <div className="px-3" />
              <Link href={LINKS.SIGNIN}>
                <a>
                  <btn.Blue buttonText="로그인하기" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </CommerceLayout>
  );
}
