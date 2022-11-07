import { useRouter } from 'next/router';

export const useGetToken = () => {
  // const router = useRouter();
  // if (typeof window === 'undefined') return;

  // let token = localStorage.getItem('token');

  // if (!token || token === 'undefined') {
  //   localStorage.clear();
  //   alert('로그인 후에 이용해주세요.');
  //   router.push('/user/signin');
  // } else if (obj) {
  //   token = obj.value;
  // }
  // console.log('>>>>> Hook :: useGetToken', token);

  // return token;

  let bearerToken = 'Bearer ';
  let accessToken;
  if (typeof window !== 'undefined' && typeof window !== undefined) {
    accessToken = localStorage.getItem('token');
  }
  if (accessToken && accessToken !== null && accessToken !== undefined) {
    bearerToken += accessToken;
  }
  let headers = {
    Authorization: bearerToken,
  };
  console.log('headers in useGetToken Hooks');
  return headers;
};
