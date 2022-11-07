import { GET } from '@apis/defaultApi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function googleCode({}) {
  const router = useRouter();
  const code = router.query.code;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    GET(`/auth/token/google`, {
      code: code,
    }).then((res) => {
      console.log(res);
      if (res.success) {
        localStorage.setItem('userId', res.data.id);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('username', res.data.name);
        localStorage.setItem('nickname', res.data.nickname);
        localStorage.setItem('phone', res.data.phone);
        localStorage.setItem('imageUrl', res.data.imageUrl);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('authProvider', res.data.authProvider);
        localStorage.setItem('sellerId', res.data.sellerId);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('token', res.data.token);

        alert('Google 로그인 성공');
        router.push('/');
      }
    });
  }, [router.isReady]);
  return;
}
