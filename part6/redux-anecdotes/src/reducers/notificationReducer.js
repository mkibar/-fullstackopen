import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    newNotificationMessage(state, action) {
      state.push({ message: action.payload });
    },
    deleteNotificationMessage(state, action) {
      state.shift();
    },
  },
});

export const showNotification = (message, timeOut) => {
  return (dispatch) => {
    dispatch(newNotificationMessage(message));
    setTimeout(() => {
      dispatch(deleteNotificationMessage());
    }, timeOut);
  };
};

export const { newNotificationMessage, deleteNotificationMessage } =
  notificationSlice.actions;
export default notificationSlice.reducer;
