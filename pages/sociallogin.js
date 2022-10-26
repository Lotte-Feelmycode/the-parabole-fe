import { API_BASE_URL } from '@apis/api-config';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Sociallogin({}) {
  const router = useRouter();

  useEffect(() => {
    const returnUrl = router.asPath;
    console.log(router.asPath);

    if (returnUrl.includes('token')) {
      var token = router.asPath.slice(19);
      localStorage.setItem('ACCESS_TOKEN', token);
      alert('소셜 로그인 성공');

      let bearerToken = 'Bearer ';
      let accessToken;
      if (typeof window !== 'undefined' && typeof window !== undefined) {
        accessToken = localStorage.getItem('ACCESS_TOKEN');
      }
      if (accessToken && accessToken !== null && accessToken !== undefined) {
        bearerToken += accessToken;
      }
      let headers = {
        'Content-Type': `application/json`,
        Authorization: bearerToken,
      };

      axios
        .get(API_BASE_URL + '/user/info', { params: null, headers: headers })
        .then((res) => {
          localStorage.setItem('email', res.data.data.email);
          localStorage.setItem('role', res.data.data.role);
          localStorage.setItem('usernaem', res.data.data.username);
          // localStorage.setItem('userid', res.data.data.id);
          router.push('/');
        })
        .catch(function (error) {
          console.log(error);
          return {};
        });
    } else {
      alert('소셜 로그인 실패하였습니다.');
      router.push('/user/signin');
    }
  }, []);
  return;
}
