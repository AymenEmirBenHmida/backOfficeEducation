import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AdminState } from "../interfaces/AdminState";
import {
  createChapterService,
  deleteChapterService,
  getAllChaptersService,
  getChapterService,
  updateChapitreService,
} from "@/services/chaptersService";
import { Chapter } from "@/interfaces/Chapter";

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

//creating chapter
export const createChapter = createAsyncThunk(
  "chapters/create",
  async ({ formData }: { formData: Chapter }) => {
    try {
      console.log("create chapter redux ", formData);
      const response = await createChapterService({ formData });
      return response;
    } catch (error) {}
  }
);
//deleting a chapter
export const deleteChapter = createAsyncThunk(
  "chapter/delete",
  async (id: string) => {
    try {
      console.log("delete chapter redux");
      const response = await deleteChapterService(id);
      console.log("redux ", response.data);
      return response.data;
    } catch (error) {}
  }
);
//getting exercice
export const getChapter = createAsyncThunk(
  "chapter/get",
  async (id: string) => {
    try {
      console.log("get chapter redux");
      const response = await getChapterService(id);
      console.log("redux ", response.data);
      return response.data;
    } catch (error) {}
  }
);
//updating exercice
export const updateChapter = createAsyncThunk(
  "chapter/update",
  async ({ formData, id }: { formData: Chapter; id: string }) => {
    try {
      console.log("update exercice redux ", formData);
      const response = await updateChapitreService({ formData, id });
      return response;
    } catch (error) {
      console.error(error);
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
