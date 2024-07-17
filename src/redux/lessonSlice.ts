import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AdminState } from "../interfaces/AdminState";
import { LessonInterface } from "../interfaces/LessonInterface";
import axios from "../config/axiosConfig";

export const getAllLessons = createAsyncThunk<LessonInterface[]>(
  "courses/getAll", // Utilisez le bon nom pour l'action
  async () => {
    try {
      const response = await axios.get<{ data: LessonInterface[] }>(
        "/api/cours/getAll"
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

// Définir le slice Redux pour gérer l'état
const lessonState = createSlice({
  name: "lesson",
  initialState: {} as AdminState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default lessonState.reducer;
