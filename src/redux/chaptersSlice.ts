import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AdminState } from "../interfaces/AdminState";
import { LessonInterface } from "../interfaces/LessonInterface";
import { getAllChaptersService } from "@/services/chaptersService";

//getting all chapters
export const getAllChapters = createAsyncThunk(
  "chapters/getAll", // Utilisez le bon nom pour l'action
  async () => {
    try {
    console.log("get all chapters redux");
    const response = await getAllChaptersService();
    console.log("redux ", response.data);
    return response.data;
    } catch (error) {
      throw error;
    }
  }
);


// Définir le slice Redux pour gérer l'état
const chaptersState = createSlice({
  name: "chapters",
  initialState: {} as AdminState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default chaptersState.reducer;
