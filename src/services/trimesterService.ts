import axios from "../config/axiosConfig";

//get all trimesters
export const getAllTrimestersService = async () => {
  try {
    const response = await axios.get("/api/trimestre/getAll");
    return response;
  } catch (error) {
    throw error;
  }
};

//create a trimester
export const createTrimesterService = async ({ formData }: { formData: any }) => {
  console.log("create trimester ", formData);
  try {
    const response = await axios.post("/api/trimestre/create", formData);
    return response;
  } catch (error) {
    throw error;
  }
};
//delete a trimester
export const deleteTrimesterService = async (id: string) => {
  try {
    const response = await axios.delete(`/api/trimestre/delete?id=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
//get a trimester
export const getTrimesterService = async (id: string) => {
  try {
    const response = await axios.get(`/api/trimestre?id=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
//update a trimester
export const updateTrimesterService = async ({
  formData,
  id,
}: {
  formData: any;
  id: string;
}) => {
  console.log("update trimester ", formData);
  try {
    const response = await axios.put(`/api/trimestre/update?id=${id}`, formData);
    return response;
  } catch (error) {
    throw error;
  }
};
