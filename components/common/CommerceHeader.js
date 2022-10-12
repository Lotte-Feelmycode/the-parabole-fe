import Link from 'next/link';

export default function CommerceHeader() {
  const linkMain = '/';
  const linkEvent = '/event';
  const linkSellerMain = '/seller/main';

  return (
    <>
      <header className="text-gray-700 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a
            href={linkMain}
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <img src="/parabole.svg" className="logo" />
            <style jsx>
              {`
                .logo {
                  height: 30px;
                }
              `}
            </style>
            <span className="ml-3 text-xl">Parabole</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link href={linkMain}>
              <a className="mr-5 hover:text-gray-900">홈</a>
            </Link>
            <Link href={linkEvent}>
              <a className="mr-5 hover:text-gray-900">이벤트</a>
            </Link>
            <Link href={linkSellerMain}>
              <a className="mr-5 hover:text-gray-900">판매자센터</a>
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
