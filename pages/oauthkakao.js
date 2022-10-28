import { API_BASE_URL } from '@apis/api-config';
import { GET_DATA } from '@apis/defaultApi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Oauthkakao({}) {
  const router = useRouter();
  var authorization_code;
  useEffect(() => {
    if (router.asPath.includes('code')) {
      authorization_code = returnUrl.slice(17);
      GET_DATA(API_BASE_URL + `/oauth/token`, {
        params: authorization_code,
      }).then((res) => {
        if (res) {
        }
      });

      alert('인가code 습득 성공');
    } else {
      alert('인가code 습득 실패');
    }
  }, []);

  return;
}
