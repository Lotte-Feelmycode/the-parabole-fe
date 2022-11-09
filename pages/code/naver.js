import { GET } from '@apis/defaultApi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function naverCode({}) {
  const router = useRouter();
  const code = router.query.code;
  const state = `${process.env.NEXT_PUBLIC_NAVER_STATE}`;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    GET(`/auth/token/naver`, {
      code: code,
      state: state,
    }).then((res) => {
      if (res.success) {
        localStorage.setItem('userId', res.data.userId);
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

        router.push('/');
      }
    });
  }, [router.isReady]);
  return;
}
