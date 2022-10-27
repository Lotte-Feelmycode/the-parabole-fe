import { useRouter } from 'next/router';

export default function Signout() {
  const router = useRouter();

  localStorage.clear();
  alert('로그아웃 완료');
  router.push('/');
}
