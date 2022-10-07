import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Signupconfirm() {
  const router = useRouter();
  console.log('router', router);
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8080/api/v1/user/' + userId)
  //     .then((res) => {
  //       console.log(res.data);
  //       alert(res.data.message);
  //     })
  //     .catch((error) => {
  //       console.log(error + ' : 회원가입 실패');
  //       alert('회원가입 실패');
  //     });
  // }, [router.query]);

  return <div></div>;
}
