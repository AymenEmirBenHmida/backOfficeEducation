import { selectUserRole } from "@/redux/adminSlice";
import { useSelector } from "react-redux";


const useAuth = () => {
  //get the current users role
  const role = useSelector(selectUserRole);
  return { role };
};
export default useAuth;
