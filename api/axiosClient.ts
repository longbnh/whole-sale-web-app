import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "content-type": "application/json",
    accountId: 3,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

//Do something before request is send
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});

//Do something with response data
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response) {
      return response;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
