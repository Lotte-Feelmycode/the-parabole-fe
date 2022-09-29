import axios from 'axios';

import { API_BASE_URL } from '@apis/api-config';
import { DEV_ERROR } from '@utils/constants/errors';
const CONTENT_TYPE = 'application/json';

//axios.defaults.baseurl = API_BASE_URL;
axios.defaults.headers.post['Content-Type'] = CONTENT_TYPE;

export const GET = async (url, params) => {
  let apiUrl = API_BASE_URL + url;

  if (!url) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  await axios
    .get(apiUrl, { params: params })
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const POST = async (url, body) => {
  let apiUrl = API_BASE_URL + url;

  if (!(url && body)) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  await axios
    .post(apiUrl, JSON.stringify(body), {
      headers: { 'Content-Type': `application/json` },
    })
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const PATCH = async (url, body) => {
  let apiUrl = API_BASE_URL + url;

  if (!(url && body)) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  await axios
    .patch(apiUrl, JSON.stringify(body), {
      headers: { 'Content-Type': `application/json` },
    })
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const DELETE = async (url, body) => {
  let apiUrl = API_BASE_URL + url;

  if (!(url && body)) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  await axios
    .delete(apiUrl, JSON.stringify(body), {
      headers: { 'Content-Type': `application/json` },
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
