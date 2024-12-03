import axios from "axios";
import { config } from "../config";
import { SESSION_STORAGE_USER_KEY } from "../constants";
import { User } from "../types";

export const client = axios.create({
  baseURL: config.api.baseUrl,
});

client.interceptors.request.use(
  (req) => {
    if (req.headers.Authorization === false) {
      return req;
    }

    const value = sessionStorage.getItem(SESSION_STORAGE_USER_KEY);
    const user: User | null = value && JSON.parse(value);

    if (user) {
      const { token } = user;
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    if (response.headers.Authorization === false) {
      return response;
    }

    if (response && response.status === 401) {
      sessionStorage.removeItem(SESSION_STORAGE_USER_KEY);
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);
