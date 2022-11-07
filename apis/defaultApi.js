import axios from 'axios';

import { API_BASE_URL } from '@apis/api-config';
import { DEV_ERROR } from '@utils/constants/errors';
const CONTENT_TYPE = 'application/json';

//axios.defaults.baseurl = API_BASE_URL;
axios.defaults.headers.post['Content-Type'] = CONTENT_TYPE;

let bearerToken = 'Bearer ';
let accessToken;
if (typeof window !== 'undefined' && typeof window !== undefined) {
  accessToken = localStorage.getItem('token');
}
if (accessToken && accessToken !== null && accessToken !== undefined) {
  bearerToken += accessToken;
}

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

export const POST = async (url, body) => {
  let apiUrl = API_BASE_URL + url;

  if (!(url && body)) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  const { data } = await axios
    .post(apiUrl, JSON.stringify(body), {
      headers: headers,
    })
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

export const PATCH = async (url, body) => {
  let apiUrl = API_BASE_URL + url;

  if (!(url && body)) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  const { data } = await axios
    .patch(apiUrl, JSON.stringify(body), {
      headers: headers,
    })
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

export const DELETE = async (url, params) => {
  let apiUrl = API_BASE_URL + url;

  if (!(url && params)) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  const { data } = await axios
    .delete(apiUrl, { params: params, headers: headers })
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

export const GET_DATA = async (url, params) => {
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

export const POST_DATA = async (url, body) => {
  let apiUrl = API_BASE_URL + url;

  if (!(url && body)) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  const { data } = await axios
    .post(apiUrl, JSON.stringify(body), {
      headers: headers,
    })
    .then((res) => {
      console.log(res);
      if (res.data) return res.data;
      return res;
    })
    .catch(function (error) {
      console.log(error);
      return {};
    });
  return data;
};

export const PATCH_DATA = async (url, body) => {
  let apiUrl = API_BASE_URL + url;

  if (!(url && body)) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  const { data } = await axios
    .patch(apiUrl, JSON.stringify(body), {
      headers: headers,
    })
    .then((res) => {
      console.log(res);
      if (res.data) return res.data;
      return res;
    })
    .catch(function (error) {
      console.log(error);
      return {};
    });
  return data;
};

export const DELETE_DATA = async (url, params) => {
  let apiUrl = API_BASE_URL + url;

  if (!(url && params)) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  const { data } = await axios
    .delete(apiUrl, { params: params, headers: headers })
    .then((res) => {
      console.log(res);
      if (res.data) return res.data;
      return res;
    })
    .catch(function (error) {
      console.log(error);
      return {};
    });
  return data;
};
