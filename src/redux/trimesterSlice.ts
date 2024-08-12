import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AdminState } from "../interfaces/AdminState";
import { createTrimesterService, deleteTrimesterService, getAllTrimestersService, getTrimesterService } from "@/services/trimesterService";

//creating trimester
export const createTrimester = createAsyncThunk(
  "trimester/create",
  async ({ formData }: { formData: any }) => {
    try {
      console.log("create trimester redux ", formData);
      const response = await createTrimesterService({ formData });
      return response;
    } catch (error) {}
  }
);
//getting all trimesters
export const getAllTrimesters = createAsyncThunk("trimester/getAll", async () => {
  try {
    console.log("get all trimesters redux");
    const response = await getAllTrimestersService();
    console.log("redux ", response.data);
    return response.data;
  } catch (error) {}
});
//deleting all trimesters
export const deleteTrimester = createAsyncThunk(
  "trimester/delete",
  async (id: string) => {
    try {
      console.log("delete redux");
      const response = await deleteTrimesterService(id);
      console.log("redux ", response.data);
      return response.data;
    } catch (error) {}
  }
);
//getting trimester
export const getTrimester = createAsyncThunk(
  "trimester/get",
  async (id: string) => {
    try {
      console.log("get trimester redux");
      const response = await getTrimesterService(id);
      console.log("redux ", response.data);
      return response.data;
    } catch (error) {}
  }
);
//updating trimester
export const updateTrimester = createAsyncThunk(
  "trimester/update",
  async ({ formData, id }: { formData: any; id: string }) => {
    try {
      console.log("update trimester redux ", formData);
      const response = await createTrimesterService({ formData });
      return response;
    } catch (error) {}
  }
);

// Définir le slice Redux pour gérer l'état
const trimesterState = createSlice({
  name: "trimester",
  initialState: {} as AdminState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default trimesterState.reducer;
