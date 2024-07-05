import axios from "axios";
import { LessonInterface } from "../interfaces/LessonInterface";

export const getAllCours = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.get<{ data: LessonInterface[] }>(
      "http://localhost:3000/api/cours/getAll",
    );
    return response;
  } catch (error) {
    throw error;
  }
};
