export const useGetToken = () => {
  let bearerToken = 'Bearer ';
  let accessToken;
  if (typeof window !== 'undefined' && typeof window !== undefined) {
    accessToken = localStorage.getItem('token');
  }
  if (accessToken && accessToken !== null && accessToken !== undefined) {
    bearerToken += accessToken;
  }
  let headers = {
    Authorization: bearerToken,
  };
  return headers;
};
