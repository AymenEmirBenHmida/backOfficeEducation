import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import lessonReducer from "./lessonSlice";
import exerciceSlice from "./exerciceSlice";
import chaptersSlice from "./chaptersSlice";
import subjectsSlice from "./subjectsSlice";
import levelSlice from "./levelSlice";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    lesson: lessonReducer,
    exercice: exerciceSlice,
    chapter: chaptersSlice,
    subject: subjectsSlice,
    level: levelSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
