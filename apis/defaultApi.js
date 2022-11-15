import axios from 'axios';

import { API_BASE_URL } from '@apis/api-config';
import { DEV_ERROR } from '@utils/constants/errors';
const CONTENT_TYPE = 'application/json';

axios.defaults.headers.common['Content-Type'] = CONTENT_TYPE;
axios.defaults.headers.post['Content-Type'] = CONTENT_TYPE;
axios.defaults.headers.patch['Content-Type'] = CONTENT_TYPE;

export const GET = async (url, params, headers) => {
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

export const POST = async (url, body, headers) => {
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

export const PATCH = async (url, body, headers) => {
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

export const DELETE = async (url, params, headers) => {
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

export const GET_DATA = async (url, params, headers) => {
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

export const POST_DATA = async (url, body, headers) => {
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

export const PATCH_DATA = async (url, body, headers) => {
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

export const DELETE_DATA = async (url, params, headers) => {
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
