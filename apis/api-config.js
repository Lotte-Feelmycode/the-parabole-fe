let backendHost;

//const hostname = window && window.location && window.location.hostname;
const hostname = 'dev';

if (hostname === 'prod') {
  backendHost = 'http://localhost:8080';
} else if (hostname === 'dev') {
  backendHost = 'http://13.125.163.134';
} else {
  backendHost = 'http://localhost:8080';
}

export const API_BASE_URL = `${backendHost}/api/v1`;
export const FRONT_BASE_URL = `http://localhost:3000`;
