import querystring from "query-string";
import axios from "axios";
import apiConfig from "@/config/apiConfig";

const axiosClient = axios.create({
  apiConfig,
  paramsSerializer: (params) => querystring.stringify({ params }),
});

// Interceptors
axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
