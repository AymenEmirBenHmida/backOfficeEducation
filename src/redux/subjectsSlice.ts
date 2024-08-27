import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AdminState } from "../interfaces/AdminState";
import {
  createSubjectService,
  deleteSubjectService,
  getAllSubjectsService,
  getSubjectService,
  updateSubjectService,
} from "@/services/subjectsService";
import { Subject } from "@/interfaces/Subject";
//creating subject
export const createSubject = createAsyncThunk(
  "subject/create",
  async ({ formData }: { formData: any }) => {
    try {
      console.log("create subject redux ", formData);
      const response = await createSubjectService({ formData });
      return response;
    } catch (error) {}
  }
);
//getting all subjects
export const getAllSubjects = createAsyncThunk("subject/getAll", async () => {
  try {
    console.log("get all subjects redux");
    const response = await getAllSubjectsService();
    console.log("redux ", response.data);
    return response.data;
  } catch (error) {}
});
//deleting all subjects
export const deleteSubject = createAsyncThunk(
  "subject/delete",
  async (id: string) => {
    try {
      console.log("delete redux");
      const response = await deleteSubjectService(id);
      console.log("redux ", response.data);
      return response.data;
    } catch (error) {}
  }
);
//getting subject
export const getSubject = createAsyncThunk(
  "subject/get",
  async (id: string) => {
    try {
      console.log("get subject redux");
      const response = await getSubjectService(id);
      console.log("redux ", response.data);
      return response.data;
    } catch (error) {}
  }
);
//updating subject
export const updatSubject = createAsyncThunk(
  "subject/update",
  async ({ formData }: { formData: Subject }) => {
    try {
      console.log("update subject redux ", formData);
      const response = await updateSubjectService({
        formData: formData,
      });
      return response;
    } catch (error) {}
  }
);

// Définir le slice Redux pour gérer l'état
const subjectState = createSlice({
  name: "subject",
  initialState: {} as AdminState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default subjectState.reducer;
