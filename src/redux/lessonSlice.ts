import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Commercial } from "../interfaces/Commercial";
import { Teacher } from "../interfaces/Teacher";
import { Admin } from "../interfaces/Admin";
import { AdminState } from "../interfaces/AdminState";
import CryptoJS from "crypto-js"; // Import crypto-js library
import { jwtDecode } from "jwt-decode";
import { access } from "fs";
import { AccessToken } from "../interfaces/AcessToken";
import { CoursInterface } from "../interfaces/LessonInterface";
import axios from "../config/axiosConfig";


export const getAllLessons = createAsyncThunk(
  "courses/getAll", // Utilisez le bon nom pour l'action
  async () => {
    try {
      const response = await axios.get<{ data: CoursInterface[] }>(
        "/api/cours/getAll"
      );
      return response;
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
