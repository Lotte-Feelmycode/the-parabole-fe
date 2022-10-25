import { useRouter } from 'next/router';

export default function Signout() {
  const router = useRouter();

  localStorage.removeItem('ACCESS_TOKEN');
  alert('로그아웃 완료');
  router.push('/');
}
