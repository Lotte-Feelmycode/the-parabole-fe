import { SmallLinePink, SmallLineBlue } from '@components/input/Button';
import { LINKS } from '@utils/constants/links';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ICON_GITHUB, ICON_NOTION } from '@utils/constants/icons';

export default function Footer() {
  const router = useRouter();

  return (
    <>
      <footer className="text-gray-600 md:p-10 sm:p-4 body-font bg-gray-50">
        <div className="container mx-auto flex flex-wrap text-left order-first">
          <DescriptionSection className="px-4 text-left">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <span className="text-xl">Parabole</span>
            </a>
            <h2 className="title-font font-bolder tracking-widest">
              필마이코드 주식회사
            </h2>
            <nav className="list-none">
              <li>
                <a className="text-gray-600 hover:text-gray-800">
                  대표 : 신은총, 장혜원, 정다은, 정은우, 최형준
                </a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">
                  주소 : 서울특별시 송파구 올림픽로 300 롯데월드타워 26층
                </a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">
                  호스팅 서비스사업자 : 필마이코드 e커머스사업부
                </a>
              </li>
            </nav>

            <div className="container py-3 flex items-center sm:flex-row flex-col">
              <p className="text-sm text-gray-500 sm:mt-0 mt-4">
                © 2022 Parabole —
                <a
                  href="https://github.com/Lotte-Feelmycode"
                  rel="noopener noreferrer"
                  className="text-gray-600 ml-1"
                  target="_blank"
                >
                  Feel My Code
                </a>
              </p>
            </div>
          </DescriptionSection>
          <ButtonSection className="p-4">
            <FeelMyCodeButtonSection>
              <LogoLinkButtion>
                <a href="https://github.com/Lotte-Feelmycode">
                  <img src={ICON_GITHUB} />
                </a>
              </LogoLinkButtion>
              <LogoLinkButtion>
                <a href="https://www.notion.so/jungew1509/Feel-My-Code-189d61715c984d24b452acc20f55f764">
                  <img src={ICON_NOTION} />
                </a>
              </LogoLinkButtion>
            </FeelMyCodeButtonSection>
            <MarketButtonSection>
              <SmallLineBlue
                buttonText="마켓 센터"
                css={{ margin: '5px' }}
                onClickFunc={() => {
                  router.push(LINKS.MAIN);
                }}
              />
              <SmallLinePink
                buttonText="판매자 센터"
                css={{ margin: '5px' }}
                onClickFunc={() => {
                  router.push(LINKS.SELLER_MAIN);
                }}
              />
            </MarketButtonSection>
          </ButtonSection>
        </div>
      </footer>
    </>
  );
}

const DescriptionSection = styled.div``;

const ButtonSection = styled.div`
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
`;

const FeelMyCodeButtonSection = styled.div`
  display: inline-flex;
  margin-left: auto;
`;

const LogoLinkButtion = styled.div`
  margin: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

const MarketButtonSection = styled.div`
  margin-left: auto;
`;
