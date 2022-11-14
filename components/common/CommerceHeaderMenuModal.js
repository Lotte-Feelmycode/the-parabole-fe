import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { LINKS } from '@utils/constants/links';
import { ICON_GIFT } from '@utils/constants/icons';
import { ICON_BASKET } from '@utils/constants/icons';
import { ThemeGray1 } from '@utils/constants/themeColor';
import CloseButton from '@components/input/CloseButton';
import { Blue, LineBlue } from '@components/input/Button';

export default function CommerceHeaderMenuModal({
  closeModalFunc,
  token,
  setToken,
}) {
  const router = useRouter();
  const btnCss = { width: '100%' };

  const signout = () => {
    localStorage.clear();
    setToken('');
    alert('로그아웃 완료');
    router.push(LINKS.MAIN);
  };

  function MainMenu() {
    return (
      <ul>
        <ShowLinkList
          href={LINKS.PRODUCT}
          imgSrc={ICON_BASKET}
          name={'스토어'}
          isMain={true}
        />
        <ShowLinkList
          href={LINKS.EVENT}
          imgSrc={ICON_GIFT}
          name={'이벤트'}
          isMain={true}
        />
      </ul>
    );
  }

  function TopButton({ token }) {
    console.log(token);
    if (token === '' || token === null) {
      return (
        <TopButtonList>
          <ButtonSection>
            <LineBlue
              buttonText={'로그인'}
              css={btnCss}
              onClickFunc={() => {
                router.push(LINKS.SIGNIN);
              }}
            />
          </ButtonSection>
          <ButtonSection>
            <Blue
              buttonText={'회원가입'}
              css={btnCss}
              onClickFunc={() => {
                router.push(LINKS.SIGNUP);
              }}
            />
          </ButtonSection>
        </TopButtonList>
      );
    }
  }

  function ShowLinkList({ href, imgSrc, name, isMain }) {
    if (isMain) {
      return (
        <li>
          <Link href={href}>
            <MainLinkSection className="hover:scale-110">
              <img src={imgSrc} className="w-8" />
              <span className="pl-2">{name}</span>
            </MainLinkSection>
          </Link>
        </li>
      );
    } else {
      return (
        <li>
          <Link href={href}>
            <SubLinkSection className="hover:scale-110">
              <span className="pl-2">{name}</span>
            </SubLinkSection>
          </Link>
        </li>
      );
    }
  }

  function SubMenu({ token }) {
    if (token !== '' && token !== null) {
      return (
        <ul>
          <ShowLinkList href={LINKS.CART} name={'장바구니'} isMain={false} />
          <ShowLinkList
            href={LINKS.MYPAGE}
            name={'마이페이지'}
            isMain={false}
          />
        </ul>
      );
    }
  }

  function BottomMenu({ token }) {
    if (token !== '' && token !== null) {
      return (
        <a onClick={signout}>
          <span>로그아웃</span>
        </a>
      );
    }
  }

  return (
    <CommerceHeaderMenuModalBackgroundSection>
      <CommerceHeaderMenuModalSection>
        <TopSection className="top-section">
          <a onClick={closeModalFunc}>
            <CloseButton />
          </a>
          <Link href={LINKS.MAIN}>
            <TopLogoSection className="top-logo-section flex title-font items-center mb-4 md:mb-0">
              <img src="/parabole.svg" className="w-12" />
              <span className="ml-5 font-semibold text-2xl text-mainblue">
                The Parabole
              </span>
            </TopLogoSection>
          </Link>
          <TopButtonSection className="top-button-section">
            <TopButton token={token} />
          </TopButtonSection>
        </TopSection>
        <MiddleSection className="middleSection">
          <MainMenu />
          <br />
          <SubMenu token={token} />
        </MiddleSection>
        <BottomSection>
          <BottomMenu token={token} />
        </BottomSection>
      </CommerceHeaderMenuModalSection>
    </CommerceHeaderMenuModalBackgroundSection>
  );
}

const CommerceHeaderMenuModalBackgroundSection = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommerceHeaderMenuModalSection = styled.div`
  height: 100%;
  z-index: 999;

  position: fixed;
  top: 0;
  left: 0;
  transform: translate(0, 0);

  background-color: white;
  border: 1px solid #cccccc;
  border-radius: 8px;

  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  @media (max-width: 767px) {
    width: 50%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const TopSection = styled.div`
  text-align: right;
  padding: 10px;
`;

const TopButtonList = styled.div`
  display: flex;
  padding: 0 2%;
  align-items: center;
  justify-content: center;
`;

const TopLogoSection = styled.div`
  justify-content: center;
`;

const TopButtonSection = styled.div`
  margin: 20px 0;
`;

const MiddleSection = styled.div`
  padding: 0px 20px;
`;

const BottomSection = styled.div`
  margin-top: 20px;
  margin-right: 20px;
  text-align: right;
  padding: 0px 20px;
  font-size: small;
  color: ${ThemeGray1};
`;

const MainLinkSection = styled.div`
  display: inline-flex;
  padding: 10px 10px;
  font-size: larger;
`;

const SubLinkSection = styled.div`
  display: inline-flex;
  padding: 10px 10px;
  font-size: medium;
`;

const ButtonSection = styled.div`
  width: 48%;
  padding: 0 1%;
`;
