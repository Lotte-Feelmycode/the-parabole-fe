import styled from '@emotion/styled';
import '@styles/globals.scss';
import { Html } from 'next/document';
import 'pages/app.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

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
