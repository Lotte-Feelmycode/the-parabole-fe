import { useRouter } from 'next/router';

export default function Signout() {
  const router = useRouter();

  localStorage.removeItem('ACCESS_TOKEN');
  localStorage.removeItem('email');
  localStorage.removeItem('name');
  localStorage.removeItem('id');
  localStorage.removeItem('nickname');
  localStorage.removeItem('phone');

  alert('로그아웃 완료');
  router.push('/');
}
