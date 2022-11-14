import Link from 'next/link';
import styled from '@emotion/styled';
import CloseButton from '@components/input/CloseButton';
import { LINKS } from '@utils/constants/links';
import { Blue, LineBlue } from '@components/input/Button';
import { ICON_GIFT } from '@utils/constants/icons';
import { ICON_BASKET } from '../../utils/constants/icons';
import { useRouter } from 'next/router';

export default function CommerceHeaderMenuModal({ closeModalFunc, token }) {
  const btnCss = { width: '100%' };

  const router = useRouter();

  function CheckTocken({ token }) {
    if (token) {
      return (
        <MainButtonSection>
          <ButtonSection>
            <LineBlue
              buttonText={'마이페이지'}
              css={btnCss}
              onClickFunc={() => {
                router.push(LINKS.MYPAGE);
              }}
            />
          </ButtonSection>
          <ButtonSection>
            <Blue
              buttonText={'로그아웃'}
              css={btnCss}
              onClickFunc={() => {
                router.push(LINKS.SIGNOUT);
              }}
            />
          </ButtonSection>
        </MainButtonSection>
      );
    } else {
      return (
        <MainButtonSection>
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
        </MainButtonSection>
      );
    }
  }

  function LinkListSection({ href, imgSrc, name }) {
    return (
      <li>
        <Link href={href}>
          <LinkSection className="hover:scale-110">
            <img src={imgSrc} className="w-8" />
            <span className="pl-2">{name}</span>
          </LinkSection>
        </Link>
      </li>
    );
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
            <CheckTocken token={token} />
          </TopButtonSection>
        </TopSection>
        <MiddleSection className="middleSection">
          <ul>
            <LinkListSection
              href={LINKS.PRODUCT}
              imgSrc={ICON_BASKET}
              name={'스토어'}
            />
            <LinkListSection
              href={LINKS.EVENT}
              imgSrc={ICON_GIFT}
              name={'이벤트'}
            />
          </ul>
        </MiddleSection>
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

const MainButtonSection = styled.div`
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

const LinkSection = styled.div`
  display: inline-flex;
  padding: 10px 10px;
  font-size: larger;
`;

const ButtonSection = styled.div`
  width: 48%;
  padding: 0 1%;
`;
