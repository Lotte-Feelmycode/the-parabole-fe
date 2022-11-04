import SocialAfInfo from '@components/user/SocialAfInfo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Googlelogin({}) {
  const router = useRouter();
  const [token, setToken] = useState(router.asPath.slice(19));

  useEffect(() => {
    const returnUrl = router.asPath;
    // if (returnUrl.includes('token')) {
    console.log(router.asPath.slice(19));
    localStorage.setItem('id', router.query.id);
    localStorage.setItem('token', token);
    console.log(router.query);
    alert('구글 로그인 성공');
    // } else {
    alert('구글 로그인 실패');
    // }
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
