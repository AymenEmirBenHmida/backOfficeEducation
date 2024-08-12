import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AdminState } from "../interfaces/AdminState";
import { getAllLevelsService } from "@/services/levelsService";

//getting all exercices
export const getAllLevels = createAsyncThunk("level/getAll", async () => {
  try {
    console.log("get all levels redux");
    const response = await getAllLevelsService();
    console.log("redux ", response.data);
    return response.data;
  } catch (error) {}
});

// Définir le slice Redux pour gérer l'état
const levelState = createSlice({
  name: "level",
  initialState: {} as AdminState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default levelState.reducer;
