import { API_BASE_URL } from '@apis/api-config';
import { GET_DATA } from '@apis/defaultApi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Oauthkakao({}) {
  const router = useRouter();
  var authorization_code;
  useEffect(() => {
    if (router.asPath.includes('code')) {
      authorization_code = router.asPath.slice(17);
      let url =
        API_BASE_URL.substring(0, API_BASE_URL.length - 8) + `/oauth/token`;

      let headers = {
        'Content-Type': `application/json`,
        Authorization: bearerToken,
      };

      export const GET = async (url, params) => {
        let apiUrl = API_BASE_URL + url;

        if (!url) {
          console.error(DEV_ERROR.INVALID_ARGS);
          return;
        }

        const { data } = await axios
          .get(apiUrl, { params: params, headers: headers })
          .then((res) => {
            console.log(res);
            return res;
          })
          .catch(function (error) {
            console.log(error);
            return {};
          });
        return data;
      };

      GET_DATA(`/oauth/token`, { params: authorization_code }).then((res) => {
        if (res) {
          console.log(res);
        }
      });
      alert('인가code 습득 성공');
    } else {
      alert('인가code 습득 실패');
    }
  }, []);

  return;
}
