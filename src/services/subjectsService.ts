import axios from "../config/axiosConfig";

export const getAllSubjectsService = async () => {
  try {
    const response = await axios.get<any>(
      "/api/matiere/getAll"
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteSubjectService = async (id: string) => {
  try {
    const response = await axios.delete(`/api/matiere/delete?id=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSubjectService = async (id: string) => {
  try {
    const response = await axios.get(`/api/matiere?id=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createSubjectService = async ({ formData }: { formData: any }) => {
  console.log("create matiere ", formData);
  try {
    const response = await axios.post("/api/matiere/create", formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateSubjectService = async ({ formData }: { formData: any }) => {
  console.log("update matiere ", formData);
  try {
    const response = await axios.put(
      `/api/matiere/update?id=${formData.id}`,
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};
