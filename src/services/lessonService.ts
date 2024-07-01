import axios from "axios";
import { CoursInterface } from "../interfaces/LessonInterface";

export const getAllCours = async () => {
  try {
    const response = await axios.get<{ data: CoursInterface[] }>(
      "http://localhost:3000/api/cours/getAll"
    );
    return response;
  } catch (error) {
    throw error;
  }
};
