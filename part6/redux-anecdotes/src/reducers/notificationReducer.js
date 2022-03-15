import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "you vote, if you like post", type: "null" };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return { message: action.payload.message, type: action.payload.type };
    },
  },
});

export const { showNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
