import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Sociallogin({}) {
  const router = useRouter();

  useEffect(() => {
    const returnUrl = router.asPath;
    console.log(router.asPath);

    if (returnUrl.includes('token')) {
      var token = router.asPath.slice(19);
      localStorage.setItem('ACCESS_TOKEN', token);
      alert('소셜 로그인 성공');
      router.push('/');
    } else {
      alert('소셜 로그인 실패하였습니다.');
      router.push('/user/signin');
    }
  }, []);
  return;
}

export default Sociallogin;
