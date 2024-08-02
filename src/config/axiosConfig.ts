import axios, { AxiosError } from "axios";
import { refreshTokenService } from "../services/authService";
import { AppDispatch } from "@/redux/Store";
import { logout } from "@/redux/adminSlice";
import { useDispatch } from "react-redux";

// Set base URL globally for your API
// axios.defaults.baseURL = "http://localhost:3000";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

// actions done on every request made
axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // Handle request errors here (if any)
    return Promise.reject(error);
  }
);
//actions done every response gotten
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("hello");
    return response;
  },
  async (error) => {
    // const dispatch = useDispatch<AppDispatch>();
    const originalRequest = error.config;
    console.log("axios response interceptor");
    if (error.response.status === 403) {
      console.log("entered the work zone");
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const response = await refreshTokenService({ refreshToken });
          localStorage.setItem("refreshToken", response.data.data.refreshToken);
          localStorage.setItem("accessToken", response.data.data.accessToken);
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response.data.data.accessToken}`;

          return axios(originalRequest);
        } catch (refreshError) {
          // dispatch(logout());
          return Promise.reject(refreshError);
        }
      } else {
        // dispatch(logout());
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
