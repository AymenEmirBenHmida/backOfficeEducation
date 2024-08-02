import { LessonInterface } from "../interfaces/LessonInterface";
import axios from "../config/axiosConfig";
//get all chapters
export const getAllChaptersService = async () => {
  try {
    const response = await axios.get(
      "/api/chapitre/getAll"
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// export const deleteLessonService = async (id: string) => {
//   try {
//     const response = await axios.delete(`/api/cours/delete?id=${id}`);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };
