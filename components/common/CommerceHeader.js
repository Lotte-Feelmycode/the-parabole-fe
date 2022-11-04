import SearchBar from '@components/input/SearchBar';
import { ICON_CART_BLACK } from '@utils/constants/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Links = {
  LINK_MAIN: '/',
  LINK_PRODUCT: '/product',
  LINK_EVENT: '/event',
  LINK_SELLER_MAIN: '/seller/main',
  LINK_CART: '/user/cart',
  LINK_SIGNIN: '/user/signin',
  LINK_SINGUP: '/user/signup',
  LINK_MYPAGE: '/user/mypage',
  LINK_SIGNOUT: '/user/signout',
};

export default function CommerceHeader() {
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  });

  return (
    <>
      <header className="body-font flex flex-col">
        <div className="md:fixed w-full h-12 md:h-24 bg-white md:border-b md:border-gray-200 md:z-50">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <Link href={Links.LINK_MAIN}>
              <a className="flex title-font items-center mb-4 md:mb-0">
                <img src="/parabole.svg" className="w-12" />
                <span className="ml-5 font-semibold text-2xl text-mainblue">
                  Parabole
                </span>
              </a>
            </Link>
            <nav className="md:mr-auto md:ml-10 flex flex-wrap items-center text-base justify-center">
              <Link href={Links.LINK_PRODUCT}>
                <a className="mr-10 text-xl font-semibold hover:font-semibold hover:text-secondblue">
                  스토어
                </a>
              </Link>
              <Link href={Links.LINK_EVENT}>
                <a className="mr-5 text-xl font-semibold hover:font-semibold hover:text-secondblue">
                  이벤트
                </a>
              </Link>
            </nav>

            <nav className="flex flex-row items-center text-base justify-center">
              <div className="mr-5">
                <SearchBar placeholder={'찾으시는 상품을 검색하세요. '} />
              </div>
              <div className="mr-5">
                <Link href={Links.LINK_CART}>
                  <a className="hidden relative lg:inline-block md:px-4">
                    <img
                      src={ICON_CART_BLACK}
                      className="w-8 hover:scale-110"
                    />
                  </a>
                </Link>
              </div>
            </nav>

            <nav className="md:ml-auto mt-l flex flex-wrap items-center text-base text-gray-500 justify-center">
              {token ? (
                <div>
                  <Link href={Links.LINK_MYPAGE}>
                    <a className="px-5 font-medium hover:text-gray-700">
                      마이페이지
                    </a>
                  </Link>
                  <Link href={Links.LINK_SIGNOUT}>
                    <a className="px-5 font-medium hover:text-gray-700">
                      로그아웃
                    </a>
                  </Link>
                </div>
              ) : (
                <div>
                  <Link href={Links.LINK_SIGNIN}>
                    <a className="px-5 font-medium hover:text-gray-700">
                      로그인
                    </a>
                  </Link>
                  <Link href={Links.LINK_SINGUP}>
                    <a className="px-5 font-medium hover:text-gray-700 border-l border-r">
                      회원가입
                    </a>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
