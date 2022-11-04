import axios from 'axios';
import { DEV_ERROR } from '@utils/constants/errors';
import { backendHost, BE_HOST } from './api-config';

export const GET_LOGIN = async (url) => {
  if (!url) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  const { data } = await axios
    .get(url)
    .then((res) => {
      console.log(res);
      console.log(res.headers);
      console.log(res.data);
      return res;
    })
    .catch(function (error) {
      console.log(error);
    });
  return data;
};

// const request = axios.get(`${ROOT_URL}/auth/sign_in`, props);
// request.then((response) => {
//   console.log(response.headers);
// });

export const GET_DEFAULT = async (url) => {
  if (!url) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  const { data } = await axios
    .get(url)
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
