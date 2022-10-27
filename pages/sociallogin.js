import SocialAfInfo from '@components/user/SocialAfInfo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Sociallogin({}) {
  const router = useRouter();
  var token;
  useEffect(() => {
    const returnUrl = router.asPath;
    console.log(router.asPath);

    if (returnUrl.includes('token')) {
      token = router.asPath.slice(19);
      localStorage.setItem('ACCESS_TOKEN', token);
      alert('소셜 로그인 성공');
    } else {
      alert('소셜 로그인 실패');
    }
  }, []);
  return;
  // <SocialAfInfo token={token} />;
}
