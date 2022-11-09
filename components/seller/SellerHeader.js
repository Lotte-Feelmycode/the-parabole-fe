import { LINKS } from '@utils/constants/links';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function SellerHeader() {
  const Links = {
    LINK_MAIN: '/',
    LINK_SELLER_MAIN: '/seller/main',
    LINK_SELLER_PRODUCT: '/seller/product/list',
    LINK_SELLER_COUPON: '/seller/coupon/list',
    LINK_SELLER_EVENT: '/seller/event/list',
  };
  const [token, setToken] = useState();
  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const signout = () => {
    localStorage.clear();
    alert('로그아웃 완료');
    router.push('/');
  };

  return (
    <>
      <header className="text-gray-700 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link href={LINKS.SELLER_MAIN}>
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <img src="/parabole_pink.svg" className="sellerlogo" />
              <style jsx>
                {`
                  .sellerlogo {
                    height: 30px;
                  }
                `}
              </style>
              <span className="ml-3 text-xl text-bold">
                The Parabole Seller
              </span>
            </a>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link href={LINKS.MAIN}>
              <a className="mr-5 hover:text-gray-900">마켓</a>
            </Link>
            <Link href={LINKS.SELLER_PRODUCT_LIST}>
              <a className="mr-5 hover:text-gray-900">상품</a>
            </Link>
            <Link href={LINKS.SELLER_COUPON_LIST}>
              <a className="mr-5 hover:text-gray-900">쿠폰</a>
            </Link>
            <Link href={LINKS.SELLER_EVENT_LIST}>
              <a className="mr-5 hover:text-gray-900">이벤트</a>
            </Link>
            {token ? (
              <div>
                <button onClick={signout}>
                  <a className="mr-5 hover:text-gray-900">로그아웃</a>
                </button>
              </div>
            ) : (
              <div>
                <Link href={LINKS.SIGNIN}>
                  <a className="mr-5 hover:text-gray-900">로그인</a>
                </Link>
                <Link href={LINKS.SINGUP}>
                  <a className="mr-5 hover:text-gray-900">회원가입</a>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
