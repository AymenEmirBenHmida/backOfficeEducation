import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AdminState } from "../interfaces/AdminState";
import { LessonInterface } from "../interfaces/LessonInterface";
import axios from "../config/axiosConfig";
import {
  createLessonService,
  deleteLessonService,
  getLessonService,
  updateLessonService,
} from "@/services/lessonService";
import { getUrlFileService, uploadFileService } from "@/services/fileService";
//getting all lessons
export const getAllLessons = createAsyncThunk<LessonInterface[]>(
  "courses/getAll", // Utilisez le bon nom pour l'action
  async () => {
    try {
      const response = await axios.get<{ data: LessonInterface[] }>(
        "/api/cours/getAll"
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);
//delete lesson
export const deleteLesson = createAsyncThunk(
  "courses/delete",
  async (id: string) => {
    try {
      console.log("delete redux");
      const response = await deleteLessonService(id);
      console.log("redux ", response.data);
      return response.data;
    } catch (error) {}
  }
);
//getting lesson
export const getLesson = createAsyncThunk("lesson/get", async (id: string) => {
  try {
    console.log("get exercice redux");
    const response = await getLessonService(id);
    console.log("redux ", response.data);
    return response.data;
  } catch (error) {}
});
//create lesson
export const createLesson = createAsyncThunk(
  "lesson/create",
  async ({
    formData,
    images,
    audio,
    videos,
  }: {
    formData: any;
    images: any[];
    videos?: any[];
    audio?: any[];
  }) => {
    try {
      console.log("create lesson redux ", formData);
      let imagesUrl: string[] = [];
      // let videosUrl: string[] = [];
      // let audioUrl: string[] = [];

      if (images.length > 0) {
        const responseFileUpload = await uploadFileService({ files: images });
        console.log("responseFileUpload:", responseFileUpload);
        console.log("responseFileUpload.data:", responseFileUpload.data);
        console.log(
          "responseFileUpload.data.data:",
          responseFileUpload.data.data
        );

        await Promise.all(
          responseFileUpload.data.data.map(async (fileInfo: any) => {
            console.log("file info ", fileInfo);
            const fileUrl = await getUrlFileService({
              path: fileInfo.path,
            });
            console.log(fileUrl);
            imagesUrl.push(fileUrl.data);
          })
        );
      }

      // if (videos.length > 0) {
      //   const responseFileUpload = await uploadFileService({ files: videos });
      //   console.log("responseFileUpload:", responseFileUpload);
      //   console.log("responseFileUpload.data:", responseFileUpload.data);
      //   console.log(
      //     "responseFileUpload.data.data:",
      //     responseFileUpload.data.data
      //   );

      //   await Promise.all(
      //     responseFileUpload.data.data.map(async (fileInfo: any) => {
      //       console.log("file info ", fileInfo);
      //       const fileUrl = await getUrlFileService({
      //         path: fileInfo.path,
      //       });
      //       console.log(fileUrl);
      //       videosUrl.push(fileUrl);
      //     })
      //   );
      // }
      // if (audio.length > 0) {
      //   const responseFileUpload = await uploadFileService({ files: audio });
      //   await Promise.all(
      //     responseFileUpload.data.data.map(async (fileInfo: any) => {
      //       console.log("file info ", fileInfo);
      //       const fileUrl = await getUrlFileService({
      //         path: fileInfo.path,
      //       });
      //       console.log(fileUrl);
      //       audioUrl.push(fileUrl);
      //     })
      //   );
      // }
      const response = await createLessonService({
        formData: { ...formData, images: imagesUrl },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);
//updating exerclessonice
export const updatLesson = createAsyncThunk(
  "lesson/update",
  async ({ formData, images }: { formData: any; images: any }) => {
    try {
      let imagesUrl: string[] = [];
      if (images.length > 0) {
        const responseFileUpload = await uploadFileService({ files: images });
        console.log("responseFileUpload:", responseFileUpload);
        console.log("responseFileUpload.data:", responseFileUpload.data);
        console.log(
          "responseFileUpload.data.data:",
          responseFileUpload.data.data
        );

        await Promise.all(
          responseFileUpload.data.data.map(async (fileInfo: any) => {
            console.log("file info ", fileInfo);
            const fileUrl = await getUrlFileService({
              path: fileInfo.path,
            });
            console.log(fileUrl);
            imagesUrl.push(fileUrl.data);
          })
        );
      }
      if (imagesUrl.length > 0) {
        formData = { ...formData, images: [...imagesUrl, ...formData.images] };
      }
      console.log("update exercice redux ", formData);
      const response = await updateLessonService({
        formData,
      });
      return response;
    } catch (error) {
      console.error(error);
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
