import { LinePink } from '@components/input/Button';
import { LINKS } from '@utils/constants/links';
import Link from 'next/link';
export default function Footer() {
  return (
    <>
      <footer className="text-gray-600 pt-20 mt-40 body-font bg-gray-50">
        <div>
          <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <span className="ml-3 text-xl">Parabole</span>
            </a>
            <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
              © 2022 Parabole —
              <a
                href="https://github.com/Lotte-Feelmycode"
                rel="noopener noreferrer"
                className="text-gray-600 ml-1"
                target="_blank"
              >
                Feel My Code
              </a>
            </p>
          </div>
        </div>
        <div className="container px-5 pb-18 mx-auto">
          <div className="flex flex-wrap md:text-left text-center order-first">
            <div className="md:w-3/4 w-full px-4">
              <h2 className="title-font font-semibold tracking-widest mb-3">
                필마이코드 주식회사
              </h2>
              <nav className="list-none mb-20">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    대표이사 : 장혜원, 정은우, 신은총, 최형준, 정다은
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    주소 : 서울특별시 송파구 올림픽로 300 롯데월드타워 26층
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    호스팅 서비스사업자 : 필마이코드 e커머스사업부
                  </a>
                </li>
              </nav>
            </div>

            <div className="md:w-1/4 w-full px-4">
              <Link href={LINKS.SELLER_MAIN}>
                <h2 className="title-font font-semibold tracking-widest mb-3">
                  <LinePink buttonText="판매자 센터"></LinePink>
                </h2>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
