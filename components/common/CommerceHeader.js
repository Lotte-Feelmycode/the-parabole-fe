import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import {
  ICON_CART_BLACK,
  ICON_MENU,
  ICON_SEARCH_MAGNIFY,
} from '@utils/constants/icons';
import { LINKS } from '@utils/constants/links';
import SearchBar from '@components/input/SearchBar';
import CommerceHeaderMenuModal from '@components/common/CommerceHeaderMenuModal';

export default function CommerceHeader() {
  const [token, setToken] = useState('');
  const [resize, setResize] = useState();
  const [menuModalState, setMenuModalState] = useState(false);

  const handleResize = () => {
    setResize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      handleResize(window.innerWidth);
    });

    const time = setTimeout(() => {
      handleResize(window.innerWidth);
    }, 0.0000000000000000001);

    return () => {
      window.removeEventListener('resize', () => {
        handleResize(window.innerWidth);
      });

      clearTimeout(time);
    };
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  });

  const openMenuModal = () => {
    setMenuModalState(true);
  };

  const closeMenuModal = () => {
    setMenuModalState(false);
  };

  function CheckTocken() {
    const router = useRouter();

    const signout = () => {
      if (confirm('로그아웃 하시겠습니까?')) {
        localStorage.clear();
        setToken('');
        alert('로그아웃 되었습니다.');
        router.push(LINKS.MAIN);
      }
    };

    if (token) {
      return (
        <>
          <Link href={LINKS.MYPAGE}>
            <a className="px-5 font-medium hover:text-gray-700">마이페이지</a>
          </Link>
          <div>
            <button onClick={signout}>
              <a className="mr-5 hover:text-gray-900">로그아웃</a>
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Link href={LINKS.SIGNIN}>
            <a className="px-5 font-medium hover:text-gray-700">로그인</a>
          </Link>
          <Link href={LINKS.SIGNUP}>
            <a className="px-5 font-medium hover:text-gray-700 border-l border-r">
              회원가입
            </a>
          </Link>
        </>
      );
    }
  }

  if (resize >= 1024) {
    return (
      <header className="body-font flex flex-col">
        <HeaderSection className="md:fixed w-full h-12 md:h-24 bg-white md:border-b md:border-gray-200 md:z-50">
          <HeaderContainer className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <Link href={LINKS.MAIN}>
              <a className="flex title-font items-center ">
                <img src="/parabole.svg" className="w-12" />
                <span className="ml-5 font-semibold text-2xl text-mainblue">
                  The Parabole
                </span>
              </a>
            </Link>

            <nav className="mx-10 flex flex-wrap items-center text-base justify-center">
              <Link href={LINKS.PRODUCT}>
                <a className="p-4 text-xl font-semibold hover:font-semibold hover:text-secondblue">
                  스토어
                </a>
              </Link>
              <Link href={LINKS.EVENT}>
                <a className="p-4 text-xl font-semibold hover:font-semibold hover:text-secondblue">
                  이벤트
                </a>
              </Link>
            </nav>

            <nav className="flex flex-row grow w-max items-center text-base justify-center mt-1">
              <LargeSearchBarSection className="mr-5 w-max">
                <SearchBar placeholder={'통합검색'} />
              </LargeSearchBarSection>
              <LargeCartSection>
                <Link href={LINKS.CART}>
                  <a className="inline-block md:px-4">
                    <img
                      src={ICON_CART_BLACK}
                      className="w-8 hover:scale-110"
                    />
                  </a>
                </Link>
              </LargeCartSection>
            </nav>

            <nav className="ml-auto mt-l flex flex-wrap items-center text-base text-gray-500 justify-center">
              <CheckTocken token={token} />
            </nav>
          </HeaderContainer>
        </HeaderSection>
      </header>
    );
  } else if (resize > 767) {
    return (
      <header className="body-font flex flex-col">
        <HeaderSection className="md:fixed w-full h-12 md:h-24 bg-white md:border-b md:border-gray-200 md:z-50">
          <HeaderContainer className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <Link href={LINKS.MAIN}>
              <a className="flex title-font items-center mb-4 md:mb-0">
                <img src="/parabole.svg" className="w-12" />
                <span className="ml-5 font-semibold text-2xl text-mainblue">
                  The Parabole
                </span>
              </a>
            </Link>

            <nav className="md:mr-auto md:ml-10 flex flex-wrap items-center text-base justify-center">
              <Link href={LINKS.PRODUCT}>
                <a className="mr-10 text-xl font-semibold hover:font-semibold hover:text-secondblue">
                  스토어
                </a>
              </Link>
              <Link href={LINKS.EVENT}>
                <a className="mr-5 text-xl font-semibold hover:font-semibold hover:text-secondblue">
                  이벤트
                </a>
              </Link>
            </nav>

            <nav className="flex flex-row grow mx-auto items-center text-base justify-center pt-3">
              <div>
                <Link href={LINKS.PRODUCT}>
                  <a className="inline-block px-4">
                    <img
                      src={ICON_SEARCH_MAGNIFY}
                      className="w-6 hover:scale-110"
                    />
                  </a>
                </Link>
              </div>
              <div>
                <Link href={LINKS.CART}>
                  <a className="inline-block px-4">
                    <img
                      src={ICON_CART_BLACK}
                      className="w-8 hover:scale-110"
                    />
                  </a>
                </Link>
              </div>
            </nav>

            <nav className="md:ml-auto mt-l flex flex-wrap items-center text-base text-gray-500 justify-center">
              <CheckTocken token={token} setToken={setToken} />
            </nav>
          </HeaderContainer>
        </HeaderSection>
      </header>
    );
  } else {
    return (
      <header className="body-font flex flex-col">
        <MobileHeaderSection className="md:fixed w-full h-12 md:h-24 bg-white md:border-b md:border-gray-200 md:z-50">
          <HeaderContainer className="container mx-auto ">
            <MobileMenuSection>
              <div className="pl-3 pt-1 mb-4 ">
                <a onClick={openMenuModal}>
                  <img src={ICON_MENU} className="w-10 hover:scale-110" />
                </a>
              </div>
            </MobileMenuSection>
            <MobileTheParaboleLogoSection className="mobile-the-parabole-logo-section">
              <Link href={LINKS.MAIN}>
                <a className="flex title-font items-center mb-4 justify-center">
                  <img src="/parabole.svg" className="w-12 hover:scale-110" />
                </a>
              </Link>
            </MobileTheParaboleLogoSection>
            <MobileButtonSection className="mobile-button-section">
              <div className="mr-2 mt-2 ">
                <Link href={LINKS.PRODUCT}>
                  <a className="inline-block">
                    <img
                      src={ICON_SEARCH_MAGNIFY}
                      className="w-6 hover:scale-110"
                    />
                  </a>
                </Link>
              </div>
              <div className="mr-2 mt-2 ">
                <Link href={LINKS.CART}>
                  <a className="inline-block">
                    <img
                      src={ICON_CART_BLACK}
                      className="w-8 hover:scale-110"
                    />
                  </a>
                </Link>
              </div>
            </MobileButtonSection>
            {menuModalState && (
              <CommerceHeaderMenuModal
                closeModalFunc={closeMenuModal}
                token={token}
                setToken={setToken}
              />
            )}
          </HeaderContainer>
        </MobileHeaderSection>
      </header>
    );
  }
}

const HeaderSection = styled.div``;

const MobileHeaderSection = styled.div`
  top: 0;
  display: fixed;
`;

const HeaderContainer = styled.div`
  @media (max-width: 767px) {
    display: flex;
  }
`;

const LargeSearchBarSection = styled.div`
  flex: 1 0 auto;
`;

const LargeCartSection = styled.div`
  width: 64px;
  padding-top: 5px;
  margin-right: 20px;
  flex: 0 0 auto;
`;

const MobileMenuSection = styled.div`
  width: 32%;
`;

const MobileTheParaboleLogoSection = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 32%;
`;

const MobileButtonSection = styled.nav`
  margin-left: auto;
  align-items: center;
  justify-content: flex-end;
  display: flex;
  width: 32%;
`;
