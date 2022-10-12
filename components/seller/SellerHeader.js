import Link from 'next/link';

export default function SellerHeader() {
  const linkSellerHome = '/seller/main';

  return (
    <>
      <header className="text-gray-700 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a
            href={linkSellerHome}
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <img src="/parabole_pink.svg" className="sellerlogo" />
            <style jsx>
              {`
                .sellerlogo {
                  height: 30px;
                }
              `}
            </style>
            <span className="ml-3 text-xl">The Parabole Seller</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link href={linkSellerHome}>
              <a className="mr-5 hover:text-gray-900">홈</a>
            </Link>
            <Link href="/seller/event/list">
              <a className="mr-5 hover:text-gray-900">이벤트</a>
            </Link>
            <Link href="/">
              <a className="mr-5 hover:text-gray-900">마켓</a>
            </Link>
            <Link href="/user/signin">
              <a className="mr-5 hover:text-gray-900">로그인</a>
            </Link>
            <Link href="/user/signup">
              <a className="mr-5 hover:text-gray-900">회원가입</a>
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
