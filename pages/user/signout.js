import { GET } from '@apis/defaultApi';
import { useRouter } from 'next/router';

export default function Signout() {
  const router = useRouter();

  localStorage.clear();
  GET('auth/signout');
  alert('로그아웃 완료');
  router.push('/');
}
