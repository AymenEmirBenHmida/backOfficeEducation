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
