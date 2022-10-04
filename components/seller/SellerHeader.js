import Link from 'next/link';

export default function SellerHeader() {
  return (
    <>
      <header className="text-gray-700 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a
            href="/sellerOffice"
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
            <Link href="/seller/main">
              <a className="mr-5 hover:text-gray-900">홈</a>
            </Link>
            <Link href="/">
              <a className="mr-5 hover:text-gray-900">마켓</a>
            </Link>
            <Link href="/login">
              <a className="mr-5 hover:text-gray-900">로그인</a>
            </Link>
            <Link href="/signUp">
              <a className="mr-5 hover:text-gray-900">회원가입</a>
            </Link>
          </nav>
          <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            Button
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
