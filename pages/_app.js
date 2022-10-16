import styled from '@emotion/styled';
import '@styles/globals.scss';
import { Html } from 'next/document';
import 'pages/app.css';

function MyApp({ Component, pageProps }) {
  return (
    <Div>
      <Component {...pageProps} />
    </Div>
  );
}

const Div = styled.div`
  font-family: 'AppleSDGothicNeoM';
`;

export default MyApp;
