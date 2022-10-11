import axios from 'axios';

import { API_BASE_URL } from '@apis/api-config';
import { DEV_ERROR } from '@utils/constants/errors';
const CONTENT_TYPE = 'application/json';

//axios.defaults.baseurl = API_BASE_URL;
axios.defaults.headers.post['Content-Type'] = CONTENT_TYPE;

export const GET_DATA = async (url, params) => {
  let apiUrl = API_BASE_URL + url;

  if (!url) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  const { data } = await axios
    .get(apiUrl, { params: params })
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
