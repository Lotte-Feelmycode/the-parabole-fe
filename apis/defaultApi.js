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

  let bearerToken = 'Bearer ';
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  if (accessToken && accessToken !== null) {
    bearerToken += accessToken;
  }
  let options = {
    headers: { Authorization: bearerToken },
  };

  const { data } = await axios
    .get(apiUrl, { params: params }, { headers: options.headers })
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

  let bearerToken = 'Bearer ';
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  if (accessToken && accessToken !== null) {
    bearerToken += accessToken;
  }
  let options = {
    headers: { Authorization: bearerToken },
  };

  const { data } = await axios
    .post(apiUrl, JSON.stringify(body), {
      headers: {
        'Content-Type': `application/json`,
        Authorization: bearerToken,
      },
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
  let bearerToken = 'Bearer ';
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  if (accessToken && accessToken !== null) {
    bearerToken += accessToken;
  }

  if (!(url && body)) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  const { data } = await axios
    .patch(apiUrl, JSON.stringify(body), {
      headers: {
        'Content-Type': `application/json`,
        Authorization: bearerToken,
      },
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
    .delete(apiUrl, { params: params })
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

  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  let bearerToken = 'Bearer ';
  if (accessToken && accessToken !== null) {
    bearerToken += accessToken;
  }
  let options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearerToken,
    },
  };

  const { data } = await axios
    .get(apiUrl, { params: params }, { headers: options.headers })
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
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  let bearerToken = 'Bearer ';
  if (accessToken && accessToken !== null) {
    bearerToken += accessToken;
  }

  if (!(url && body)) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  const { data } = await axios
    .post(apiUrl, JSON.stringify(body), {
      headers: {
        'Content-Type': `application/json`,
        Authorization: bearerToken,
      },
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
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  let bearerToken = 'Bearer ';
  if (accessToken && accessToken !== null) {
    bearerToken += accessToken;
  }

  if (!(url && body)) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  const { data } = await axios
    .patch(apiUrl, JSON.stringify(body), {
      headers: {
        'Content-Type': `application/json`,
        Authorization: bearerToken,
      },
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
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  let bearerToken = 'Bearer ';
  if (accessToken && accessToken !== null) {
    bearerToken += accessToken;
  }

  if (!(url && params)) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  const { data } = await axios
    .delete(apiUrl, { params: params, Authorization: bearerToken })
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
