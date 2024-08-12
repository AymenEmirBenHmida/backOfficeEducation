import axios from "../config/axiosConfig";

//get all chapters
export const getAllChaptersService = async () => {
  try {
    const response = await axios.get("/api/chapitre/getAll");
    return response;
  } catch (error) {
    throw error;
  }
};

//create a chapter
export const createChapterService = async ({ formData }: { formData: any }) => {
  console.log("create chapter ", formData);
  try {
    const response = await axios.post("/api/chapitre/create", formData);
    return response;
  } catch (error) {
    throw error;
  }
};
//delete a chapter
export const deleteChapterService = async (id: string) => {
  try {
    const response = await axios.delete(`/api/chapitre/delete?id=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
//get a chapter
export const getChapterService = async (id: string) => {
  try {
    const response = await axios.get(`/api/chapitre?id=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
//update a chapter
export const updateChapitreService = async ({
  formData,
  id,
}: {
  formData: any;
  id: string;
}) => {
  console.log("update chapitre ", formData);
  try {
    const response = await axios.put(`/api/chapitre/update?id=${id}`, formData);
    return response;
  } catch (error) {
    throw error;
  }
};
