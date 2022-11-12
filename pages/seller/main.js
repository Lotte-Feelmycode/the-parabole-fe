import SellerLayout from '@components/seller/SellerLayout';
import Link from 'next/link';
import * as ICON from '@utils/constants/icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetToken } from '@hooks/useGetToken';
import { LINKS } from '@utils/constants/links';

export default function Home() {
  const router = useRouter();
  const [headers, setHeaders] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window !== undefined) {
      if (localStorage.getItem('userId') === null) {
        alert('로그인 해주세요.');
        router.push(LINKS.SIGNIN);
      } else if (localStorage.getItem('role') === 'ROLE_USER') {
        alert('판매자 페이지입니다.');
        router.push(LINKS.MAIN);
      }
    }
    setHeaders(useGetToken());
  }, []);

  return (
    <SellerLayout>
      <div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 pb-24 mx-auto">
            <div className="text-center mb-20">
              <h1 className="sm:text-3xl text-2xl font-bold text-center title-font mb-4">
                <p className="text-pink-500">PARABOLE 판매자 센터</p>
              </h1>
              <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                다양한 기능을 확인해 보세요.
              </p>
            </div>
            <div className="flex flex-wrap -m-4">
              <div className="p-4 lg:w-1/4 sm:w-1/2 w-full">
                <h2 className="font-bold title-font tracking-widest text-gray-900 mb-4 text-xl text-center sm:text-left">
                  📦 상품 관리
                </h2>

                <nav className="flex flex-col sm:items-start sm:text-left text-center items-center -mb-1 space-y-2.5">
                  <Link href={LINKS.SELLER_PRODUCT_LIST}>
                    <a className="flex flex-row">
                      <span className="w-6 h-6 mr-2 rounded-full inline-flex items-center justify-center">
                        <img src={ICON.ICON_LIST}></img>
                      </span>
                    </a>
                  </Link>

                  <Link href={LINKS.SELLER_PRODUCT_NEW}>
                    <a className="flex flex-row">
                      <span className="w-6 h-6 mr-2 rounded-full inline-flex items-center justify-center">
                        <img src={ICON.ICON_POST}></img>
                      </span>
                      <p className="text-lg">상품 등록</p>
                    </a>
                  </Link>
                </nav>
              </div>

              <div className="p-4 lg:w-1/4 sm:w-1/2 w-full">
                <h2 className="font-bold title-font tracking-widest text-gray-900 mb-4 text-xl text-center sm:text-left">
                  🎫 쿠폰 관리
                </h2>

                <nav className="flex flex-col sm:items-start sm:text-left text-center items-center -mb-1 space-y-2.5">
                  <Link href={LINKS.SELLER_COUPON_LIST}>
                    <a className="flex flex-row">
                      <span className="w-6 h-6 mr-2 rounded-full inline-flex items-center justify-center">
                        <img src={ICON.ICON_LIST}></img>
                      </span>
                      <p className="text-lg">쿠폰 목록</p>
                    </a>
                  </Link>

                  <Link href={LINKS.SELLER_COUPON_NEW}>
                    <a className="flex flex-row">
                      <span className="w-6 h-6 mr-2 rounded-full inline-flex items-center justify-center">
                        <img src={ICON.ICON_POST}></img>
                      </span>
                      <p className="text-lg">쿠폰 등록</p>
                    </a>
                  </Link>

                  <Link href={LINKS.SELLER_COUPON_ASSIGN}>
                    <a className="flex flex-row">
                      <span className="w-6 h-6 mr-2 rounded-full inline-flex items-center justify-center">
                        <img src={ICON.ICON_CHECK}></img>
                      </span>
                      <p className="text-lg">쿠폰 배정</p>
                    </a>
                  </Link>
                </nav>
              </div>

              <div className="p-4 lg:w-1/4 sm:w-1/2 w-full">
                <h2 className="font-bold title-font tracking-widest text-gray-900 mb-4 text-xl text-center sm:text-left">
                  🚚 주문 관리
                </h2>

                <nav className="flex flex-col sm:items-start sm:text-left text-center items-center -mb-1 space-y-2.5">
                  <Link href={LINKS.SELLER_ORDER_DETAIL}>
                    <a className="flex flex-row">
                      <span className="w-6 h-6 mr-2 rounded-full inline-flex items-center justify-center">
                        <img src={ICON.ICON_CHECK}></img>
                      </span>
                      <p className="text-lg">주문/배송 관리</p>
                    </a>
                  </Link>
                </nav>
              </div>

              <div className="p-4 lg:w-1/4 sm:w-1/2 w-full">
                <h2 className="font-bold title-font tracking-widest text-gray-900 mb-4 text-xl text-center sm:text-left">
                  🎁 이벤트 관리
                </h2>

                <nav className="flex flex-col sm:items-start sm:text-left text-center items-center -mb-1 space-y-2.5">
                  <Link href={LINKS.SELLER_EVENT_LIST}>
                    <a className="flex flex-row">
                      <span className="w-6 h-6 mr-2 rounded-full inline-flex items-center justify-center">
                        <img src={ICON.ICON_LIST}></img>
                      </span>
                      <p className="text-lg">이벤트 목록</p>
                    </a>
                  </Link>

                  <Link href={LINKS.SELLER_EVENT_NEW}>
                    <a className="flex flex-row">
                      <span className="w-6 h-6 mr-2 rounded-full inline-flex items-center justify-center">
                        <img src={ICON.ICON_POST}></img>
                      </span>
                      <p className="text-lg">이벤트 등록</p>
                    </a>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SellerLayout>
  );
}
