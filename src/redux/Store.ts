import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import lessonReducer from "./lessonSlice";
const store = configureStore({
  reducer: {
    admin: adminReducer,
    lesson:lessonReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
