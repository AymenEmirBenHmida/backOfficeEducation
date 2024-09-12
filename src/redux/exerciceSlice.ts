import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AdminState } from "../interfaces/AdminState";
import {
  approveExerciceService,
  createExerciceService,
  deleteExerciceService,
  getAllExercicesService,
  getAllPendingExercicesService,
  getExerciceService,
  refuseExerciceService,
  updateExerciceService,
} from "@/services/exerciceService";
//creating exercice
export const createExercice = createAsyncThunk(
  "exercice/create",
  async ({ formData }: { formData: any }) => {
    try {
      console.log("create exercice redux ", formData);
      const response = await createExerciceService({ formData });
      return response;
    } catch (error) {
      throw error;
    }
  }
);
//getting all exercices
export const getAllExercices = createAsyncThunk("exercice/getAll", async () => {
  try {
    console.log("get all exercices redux");
    const response = await getAllExercicesService();
    console.log("redux ", response.data);
    return response.data;
  } catch (error) {}
});
//getting all pending exercices
export const getAllPendingExercices = createAsyncThunk(
  "exercice/getAllPending",
  async (user: any) => {
    try {
      console.log("get all exercices redux");
      const response = await getAllPendingExercicesService(user);
      console.log("redux ", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
//approving an exercice
export const approvingAnExercice = createAsyncThunk(
  "exercice/approve",
  async (user: any) => {
    try {
      console.log("approve exercice redux");
      const response = await approveExerciceService(user);
      console.log("redux ", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
//refuse an exercice
export const refusingAnExercice = createAsyncThunk(
  "exercice/refuse",
  async ({ id, comment }: { id: string; comment: string }) => {
    try {
      console.log("refuse exercice redux");
      const response = await refuseExerciceService({ id, comment });
      console.log("redux ", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
//deleting all exercices
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
//getting exercice
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
//updating exercice
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
