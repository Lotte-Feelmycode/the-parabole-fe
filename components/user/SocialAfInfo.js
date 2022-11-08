import { API_BASE_URL } from '@apis/api-config';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function SocialAfInfo({ token }) {
  const router = useRouter();
  useEffect(() => {
    let headers = {
      'Content-Type': `application/json`,
      Authorization: 'Bearer ' + token,
    };
    axios
      .get(API_BASE_URL + `/user/info`, { params: '', headers: headers })
      .then((res) => {
        // localStorage.setItem('id', res.data.data.id);
        localStorage.setItem('email', res.data.data.email);
        localStorage.setItem('nickname', res.data.data.nickname);
        localStorage.setItem('phone', res.data.data.phone);
        localStorage.setItem('role', res.data.data.role);
        localStorage.setItem('username', res.data.data.username);
        router.push('/');
        return res;
      });
  }, []);
}
