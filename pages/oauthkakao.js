import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Oauthkakao({}) {
  const router = useRouter();
  useEffect(() => {
    if (router.asPath.includes('token')) {
      var userToken = router.asPath.slice(18);
      localStorage.setItem('userToken', userToken);
      console.log(userToken);
      alert('카카오 소셜 로그인 성공');
      router.push('/');
    } else {
      alert('카카오 소셜 로그인 실패');
    }
  }, []);
  return;
}
