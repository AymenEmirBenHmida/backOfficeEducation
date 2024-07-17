import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AdminState } from "../interfaces/AdminState";
import { createExerciceService } from "@/services/exerciceService";

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

// Définir le slice Redux pour gérer l'état
const exerciceState = createSlice({
  name: "exercice",
  initialState: {} as AdminState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default exerciceState.reducer;
