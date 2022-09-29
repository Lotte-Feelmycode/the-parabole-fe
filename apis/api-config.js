let backendHost;

//const hostname = window && window.location && window.location.hostname;
const hostname = 'localhost';

if (hostname === 'localhost') {
  backendHost = 'http://localhost:8080';
}

export const API_BASE_URL = `${backendHost}/api/v1`;
