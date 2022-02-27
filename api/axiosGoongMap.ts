import axios from "axios";
import queryString from "query-string";

const axiosGoongMap = axios.create({
    baseURL: process.env.GOONG_URL,
    headers: {
        "content-type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

//Do something before request is send
axiosGoongMap.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
});

//Do something with response data
axiosGoongMap.interceptors.response.use(
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
export default axiosGoongMap;
