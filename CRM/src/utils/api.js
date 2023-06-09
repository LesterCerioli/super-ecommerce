import axios from "axios";
import store from "../redux/store";
import { SIGN_OUT, REFRESH_TOKEN, AUTH_ERROR } from "../redux/types";
import { SERVER_URL, refreshTokenKey } from "./config";

const api = axios.create({
  baseURL: `${SERVER_URL}api`,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true// should be only post req
});
/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired
 logout the user if the token has expired
**/

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response.data.error === "jwt expired") {
      //call for refresh token
      const originalReq = err.config;
      try {
        const body = JSON.stringify({
          refreshToken: localStorage.getItem(refreshTokenKey),
        });
        const res = await api.post(`/admin-auth/refresh-token`, body);
        store.dispatch({
          type: REFRESH_TOKEN,
          payload: res.data,
        });
        originalReq.headers["x-auth-token"] = res.data.accessToken;
        return api(originalReq);
      } catch (err) {
        console.log("****refresh token error****", err.response);
        store.dispatch({
          type: AUTH_ERROR,
        });
        return Promise.reject(err.response.data.error);
      }
    }
    if (err.response.status === 401) {
      store.dispatch({ type: AUTH_ERROR });
      return Promise.reject(err.response.data.error);
    }
    if (err.response.status >= 400 && err.response.status <= 500) {
      return Promise.reject(err.response.data.error);
    }
  }
);

export default api;
