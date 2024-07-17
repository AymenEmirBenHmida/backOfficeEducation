import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import lessonReducer from "./lessonSlice";
import exerciceSlice from "./exerciceSlice";
const store = configureStore({
  reducer: {
    admin: adminReducer,
    lesson: lessonReducer,
    exercice: exerciceSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
