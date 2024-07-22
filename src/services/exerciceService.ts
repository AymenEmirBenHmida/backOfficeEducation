import axios from "../config/axiosConfig";

export const createExerciceService = async ({
  formData,
}: {
  formData: any;
}) => {
  console.log("create exercice ", formData);
  try {
    const response = await axios.post("/api/exercice/create", formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllExercicesService = async () => {
  try {
    const response = await axios.get("/api/exercice/getAll");
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteExerciceService = async (id: string) => {
  try {
    const response = await axios.delete(`/api/exercice/delete?id=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getExerciceService = async (id: string) => {
  try {
    const response = await axios.get(`/api/exercice?id=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateExerciceService = async ({
  formData,
  id,
}: {
  formData: any;
  id: string;
}) => {
  console.log("update exercice ", formData);
  try {
    const response = await axios.put(`/api/exercice/update?id=${id}`, formData);
    return response;
  } catch (error) {
    throw error;
  }
};
