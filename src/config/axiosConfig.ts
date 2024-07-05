import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { refreshTokenService } from "../services/authService";

// Set base URL globally for your API
axios.defaults.baseURL = "http://localhost:3000";

// Add a request interceptor
axios.interceptors.request
  .use
  //   (config: any) => {
  //     // You can modify the request config here (e.g., add headers, authentication tokens)
  //     // For example, adding a token if available in local storage
  //     // const token = localStorage.getItem("accessToken");
  //     // if (token) {
  //     //   if (!config.headers) {
  //     //     config.headers = {};
  //     //   }
  //     //   config.headers.Authorization = `Bearer ${token}`;
  //     // }
  //     return config;
  //   },
  //   (error: AxiosError) => {
  //     // Handle request errors here (if any)
  //     return Promise.reject(error);
  //   }
  ();

// // Add a response interceptor
// axios.interceptors.response.use(
//   (response: AxiosResponse) => {
//     // You can modify the response data here
//     return response;
//   },
//   (error: AxiosError) => {
//     // Handle response errors here
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.error("Response error:", error.response.data);
//       console.error("Response status:", error.response.status);
//     } else if (error.request) {
//       // The request was made but no response was received
//       console.error("Request error:", error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.error("Error:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (err) {
    const config = err.config;

    if (err.response) {
      // Access Token was expired
      if (
        err.response.status === 403 &&
        config.url !== "/api/auth/refreshToken" &&
        !config._retry
      ) {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = refreshTokenService({ refreshToken: refreshToken! });
        localStorage.setItem(
          "refreshToken",
          (await response).data.data.refreshToken
        );
        localStorage.setItem(
          "accessToken",
          (await response).data.data.accessToken
        );
        // config._retry = true;
        // console.log(config);
        // try {
        //   //refresh token here
        //   const tokens = await refreshToken();
        //   setLocalStorage("auth", tokens);
        //   config.headers.Authorization = Bearer ${tokens.access};
        //   return instance.request(config);
        // } catch (_error: any) {
        //   removeLocalStorage("auth");
        //   return Promise.reject(_error);
        // }
      }
    }
    return Promise.reject(err);
  }
);

export default axios;
