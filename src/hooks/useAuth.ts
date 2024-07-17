import { selectUserRole } from "@/redux/adminSlice";
import { AppDispatch } from "@/redux/Store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const role = useSelector(selectUserRole);
  useEffect(() => {
    const checkAuth = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");
      if (refreshToken && accessToken) {
      } else {
        navigate("/login");
      }
    };
    checkAuth();
  }, [dispatch, navigate]);
  return { role };
};
export default useAuth;
