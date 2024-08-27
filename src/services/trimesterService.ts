import { Trimester } from "@/interfaces/Trimester";
import axios from "../config/axiosConfig";

// Get all trimesters
export const getAllTrimestersService = async () => {
  try {
    const response = await axios.get("/api/trimestre/getAll");
    return response;
  } catch (error) {
    throw error;
  }
};

// Create a trimester
export const createTrimesterService = async ({
  formData,
}: {
  formData: Trimester;
}) => {
  console.log("create trimester ", formData);
  try {
    const response = await axios.post("/api/trimestre/create", formData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Delete a trimester
export const deleteTrimesterService = async (id: string) => {
  try {
    const response = await axios.delete(`/api/trimestre/delete?id=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get a trimester
export const getTrimesterService = async (id: string) => {
  try {
    const response = await axios.get(`/api/trimestre?id=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Update a trimester
export const updateTrimesterService = async ({
  formData,
  id,
}: {
  formData: Trimester;
  id: string;
}) => {
  console.log("update trimester ", formData);
  try {
    const response = await axios.put(
      `/api/trimestre/update?id=${id}`,
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};
