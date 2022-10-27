import SocialAfInfo from '@components/user/SocialAfInfo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Sociallogin({}) {
  const router = useRouter();
  const [token, setToken] = useState(router.asPath.slice(19));

  useEffect(() => {
    const returnUrl = router.asPath;
    console.log(router.asPath);

    if (returnUrl.includes('token')) {
      localStorage.setItem('ACCESS_TOKEN', token);
      alert('소셜 로그인 성공');
    } else {
      alert('소셜 로그인 실패');
    }
  }, []);

  if (token) {
    return (
      <>
        <SocialAfInfo token={token} />
      </>
    );
  }
  return;
}