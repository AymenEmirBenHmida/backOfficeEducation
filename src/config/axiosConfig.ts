import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// Set base URL globally for your API
axios.defaults.baseURL = "http://localhost:3000";

// Add a request interceptor
axios.interceptors.request
  .use
  //   (config: AxiosRequestConfig) => {
  //     // You can modify the request config here (e.g., add headers, authentication tokens)
  //     // For example, adding a token if available in local storage
  //     const token = localStorage.getItem("accessToken");
  //     if (token) {
  //       config.headers.Authorization = `Bearer ${token}`;
  //     }
  //     return config;
  //   },
  //   (error: AxiosError) => {
  //     // Handle request errors here (if any)
  //     return Promise.reject(error);
  //   }
  ();

// Add a response interceptor
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can modify the response data here
    return response;
  },
  (error: AxiosError) => {
    // Handle response errors here
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response error:", error.response.data);
      console.error("Response status:", error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axios;
