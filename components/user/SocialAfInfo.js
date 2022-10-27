import { API_BASE_URL } from '@apis/api-config';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function SocialAfInfo({ token }) {
  // 동작 안됌
  const router = useRouter();
  let headers;

  useEffect(() => {
    console.log(token);
    headers = {
      'Content-Type': `application/json`,
      Authorization: 'Bearer ' + token,
    };
  }, []);

  axios
    .get(API_BASE_URL + `/user/info`, { params: '', headers: headers })
    .then((res) => {
      console.log(res);
      localStorage.setItem(res.id);
      alert('소셜정보 get 성공');
      router.push('/');
      return res;
    })
    .catch(function (error) {
      console.log(error);
      console.log(token);
      alert('소셜정보 get 실패');
      router.push('/user/signin');
      return {};
    });
}
