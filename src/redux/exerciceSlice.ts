import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AdminState } from "../interfaces/AdminState";
import {
  createExerciceService,
  deleteExerciceService,
  getAllExercicesService,
  getExerciceService,
  updateExerciceService,
} from "@/services/exerciceService";

export const createExercice = createAsyncThunk(
  "exercice/create",
  async ({ formData }: { formData: any }) => {
    try {
      console.log("create exercice redux ", formData);
      const response = await createExerciceService({ formData });
      return response;
    } catch (error) {}
  }
);
export const getAllExercices = createAsyncThunk("exercice/getAll", async () => {
  try {
    console.log("get all exercices redux");
    const response = await getAllExercicesService();
    console.log("redux ", response.data);
    return response.data;
  } catch (error) {}
});

export const deleteExercice = createAsyncThunk(
  "exercice/delete",
  async (id: string) => {
    try {
      console.log("delete redux");
      const response = await deleteExerciceService(id);
      console.log("redux ", response.data);
      return response.data;
    } catch (error) {}
  }
);

export const getExercice = createAsyncThunk(
  "exercice/get",
  async (id: string) => {
    try {
      console.log("get exercice redux");
      const response = await getExerciceService(id);
      console.log("redux ", response.data);
      return response.data;
    } catch (error) {}
  }
);

export const updatExercice = createAsyncThunk(
  "exercice/update",
  async ({ formData, id }: { formData: any; id: string }) => {
    try {
      console.log("update exercice redux ", formData);
      const response = await updateExerciceService({ formData, id });
      return response;
    } catch (error) {}
  }
);

// Définir le slice Redux pour gérer l'état
const exerciceState = createSlice({
  name: "exercice",
  initialState: {} as AdminState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default exerciceState.reducer;
