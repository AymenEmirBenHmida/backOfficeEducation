import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AdminState } from "../interfaces/AdminState";
import {
  createTrimesterService,
  deleteTrimesterService,
  getAllTrimestersService,
  getTrimesterService,
  updateTrimesterService,
} from "@/services/trimesterService";
import { Trimester } from "@/interfaces/Trimester";

// Creating a trimester
export const createTrimester = createAsyncThunk(
  "trimester/create",
  async ({ formData }: { formData: Trimester }) => {
    try {
      console.log("create trimester redux ", formData);
      const response = await createTrimesterService({ formData });
      return response;
    } catch (error) {
      // Handle error (e.g., return a specific error action)
    }
  }
);

// Getting all trimesters
export const getAllTrimesters = createAsyncThunk(
  "trimester/getAll",
  async () => {
    try {
      console.log("get all trimesters redux");
      const response = await getAllTrimestersService();
      console.log("redux ", response.data);
      return response.data;
    } catch (error) {
      // Handle error (e.g., return a specific error action)
    }
  }
);

// Deleting a trimester
export const deleteTrimester = createAsyncThunk(
  "trimester/delete",
  async (id: string) => {
    try {
      console.log("delete redux");
      const response = await deleteTrimesterService(id);
      console.log("redux ", response.data);
      return response.data;
    } catch (error) {
      // Handle error (e.g., return a specific error action)
    }
  }
);

// Getting a trimester
export const getTrimester = createAsyncThunk(
  "trimester/get",
  async (id: string) => {
    try {
      console.log("get trimester redux");
      const response = await getTrimesterService(id);
      console.log("redux ", response.data);
      return response.data;
    } catch (error) {
      // Handle error (e.g., return a specific error action)
    }
  }
);

// Updating a trimester
export const updateTrimester = createAsyncThunk(
  "trimester/update",
  async ({ formData, id }: { formData: Trimester; id: string }) => {
    try {
      console.log("update trimester redux ", formData);
      const response = await updateTrimesterService({ formData, id });
      return response;
    } catch (error) {
      // Handle error (e.g., return a specific error action)
    }
  }
);

// Define the Redux slice to manage state
const trimesterState = createSlice({
  name: "trimester",
  initialState: {} as AdminState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle extra reducers here (e.g., loading, success, failure states)
  },
});

export default trimesterState.reducer;
