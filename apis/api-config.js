let backendHost;

//const hostname = window && window.location && window.location.hostname;
const hostname = 'dev';

if (hostname === 'prod') {
  backendHost = 'http://api.theparabole.shop:8000';
} else if (hostname === 'dev') {
  backendHost = 'http://3.39.25.221:8000';
} else {
  backendHost = 'http://localhost:8080';
}

export const API_BASE_URL = `${backendHost}/api/v1`;
export const FRONT_BASE_URL = `http://localhost:3000`;
export const FRONT_DEPLOY_URL = `http://theparabole.shop`;
