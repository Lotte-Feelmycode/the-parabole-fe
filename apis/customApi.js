import axios from 'axios';
import { DEV_ERROR } from '@utils/constants/errors';
import { API_BASE_URL } from './api-config';

let headers = {
  // 'Content-Type': `application/json`,
  // Authorization: bearerToken,
};

export const GET_DEFAULT = async (url, params) => {
  if (!url) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  const { data } = await axios
    .get(url, { params: params, headers: headers })
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

export const POST_DEFAULT = async (url, body) => {
  if (!(url && body)) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  const { data } = await axios
    .post(url, JSON.stringify(body))
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

export const GET_DATA_HEADER = async (url, params, headers) => {
  let apiUrl = API_BASE_URL + url;

  if (!url) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  const { data } = await axios
    .get(apiUrl, { params: params, headers: headers })
    .then((res) => {
      console.log(res);
      if (res.data) return res.data;
      else return res;
    })
    .catch(function (error) {
      console.log(error);
      return {};
    });
  return data;
};
