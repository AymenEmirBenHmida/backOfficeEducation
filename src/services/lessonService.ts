import { LessonInterface } from "../interfaces/LessonInterface";
import axios from "../config/axiosConfig";

export const getAllCours = async () => {
  try {
    const response = await axios.get("/api/cours/getAllByTeacher");
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteLessonService = async (id: string) => {
  try {
    const response = await axios.delete(`/api/cours/delete?id=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getLessonService = async (id: string) => {
  try {
    const response = await axios.get(`/api/cours?id=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createLessonService = async ({ formData }: { formData: any }) => {
  console.log("create lesson ", formData);
  try {
    const response = await axios.post("/api/cours/create", formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateLessonService = async ({ formData }: { formData: any }) => {
  console.log("update lesson ", formData);
  try {
    const response = await axios.put(
      `/api/cours/update?id=${formData.id}`,
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};
