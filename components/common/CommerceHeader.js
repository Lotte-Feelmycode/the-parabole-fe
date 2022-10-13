import SearchBar from '@components/input/SearchBar';
import { ICON_CART_BLUE } from '@utils/constants/icons';
import styled from '@emotion/styled';

import Link from 'next/link';

export default function CommerceHeader() {
  const linkMain = '/';
  const linkEvent = '/event';
  const linkSellerMain = '/seller/main';

  // TODO : 로그인 사용자 SELLER 여부
  // const isSeller = localStorage.getItem("ACCESS_TOKEN") && (localStorage.getItem("ROLE")==='SELLER');
  const isSeller = true;

  return (
    <>
      <header className="text-gray-700 body-font">
        <div className="fixed w-full h-12 md:h-20 bg-white border-b border-gray-200 z-50">
          <div className="justify-between box-border items-center container px-5 mx-auto md:py-0.5 flex">
            {/* 로고 */}
            <div className="block static mr-6">
              <Link href={linkMain}>
                <img src="/parabole.svg" className="w-16 inset-1/2" />
              </Link>
            </div>
            {/* 링크 */}
            <div className="flex md:ml-auto whitespace-nowrap w-4/5 md:w-2/5">
              <Link href={linkMain}>
                <a className="font-bold inline-block text-xl pt-0.5 pr-2 mr-4 text-mainblue leading-4 relative">
                  PARABOLE
                </a>
              </Link>
              <Link href={linkMain}>
                <a className="inline-block text-xl pt-0.5 px-2 mx-4 hover:text-secondblue leading-4 relative">
                  스토어
                </a>
              </Link>
              <Link href={linkEvent}>
                <a className="inline-block text-xl pt-0.5 px-2 mx-4 hover:text-secondblue leading-4 relative">
                  이벤트
                </a>
              </Link>
            </div>
            {/* 검색바 + 카트 + navbar */}
            <div className="md:ml-auto flex flex-row flex-initial">
              <div className="flex items-center justify-end">
                {/* 검색바 */}
                <div className="relative mr-4">
                  <SearchBar placeholder={'찾으시는 상품을 검색하세요. '} />
                </div>
                {/* 카트 */}
                <div>
                  <Link href="/cart">
                    <a className="hidden relative md:inline-block md:py-4 md:px-8">
                      <img
                        src={ICON_CART_BLUE}
                        className="w-8 hover:scale-110"
                      />
                    </a>
                  </Link>
                </div>
                {/* Nav */}
                <div className="flex items-center md:ml-auto">
                  <Link href="/user/signin">
                    <a className="text-xs px-2 md:text-base md:px-4 leading-3 md:leading-loose text-ThemeGray1">
                      로그인
                    </a>
                  </Link>
                  <Link href="/user/signup">
                    <a className="text-xs px-2 md:text-base md:px-4 leading-3 md:leading-loose text-ThemeGray1 border-l border-r">
                      회원가입
                    </a>
                  </Link>
                  {isSeller && (
                    <Link href={linkSellerMain}>
                      <a className="md:text-base md:px-4 sm:text-xs sm:px-2 leading-3 md:leading-loose text-ThemeGray1">
                        판매자센터
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
