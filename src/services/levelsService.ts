import { Level } from "@/interfaces/level";
import axios from "../config/axiosConfig";
//create an exercice
export const createLevelService = async ({ formData }: { formData: Level }) => {
  console.log("create level ", formData);
  try {
    const response = await axios.post("/api/niveau/create", formData);
    return response;
  } catch (error) {
    throw error;
  }
};
//get all exercices
export const getAllLevelsService = async () => {
  try {
    const response = await axios.get("/api/niveau/getAll");
    return response;
  } catch (error) {
    throw error;
  }
};
