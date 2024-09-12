import axios from "../config/axiosConfig";
//create an exercice
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
//get all exercices
export const getAllExercicesService = async () => {
  try {
    const response = await axios.get("/api/exercice/getAllByTeacher");
    return response;
  } catch (error) {
    throw error;
  }
};
//get all pending exercices
export const getAllPendingExercicesService = async (user: any) => {
  try {
    const response = await axios.post("/api/admin/exercice/getPending", {
      user: user,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
//delete an exercice
export const deleteExerciceService = async (id: string) => {
  try {
    const response = await axios.delete(`/api/exercice/delete?id=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
//get an exercice
export const getExerciceService = async (id: string) => {
  try {
    const response = await axios.get(`/api/exercice?id=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
//update an exercice
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
//approve an exercice
export const approveExerciceService = async ({ id }: { id: string }) => {
  console.log("approve exercice ", id);
  try {
    const response = await axios.post(`/api/admin/exercice/approve`, {
      id,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
//refuse an exercice
export const refuseExerciceService = async ({
  id,
  comment,
}: {
  id: string;
  comment: string;
}) => {
  console.log("refuse exercice ", id);
  try {
    const response = await axios.post(`/api/admin/exercice/refuse`, {
      id,
      comment,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
