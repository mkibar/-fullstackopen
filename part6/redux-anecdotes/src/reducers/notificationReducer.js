import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "you vote, if you like post" };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateMessage(state, action) {
      //console.log("notification, update", state, action);
      return { message: action.payload };
    },
  },
});

export const showNotification = (message, timeOut) => {
  return (dispatch) => {
    //console.log("notification, update0", message);
    dispatch(updateMessage(message));
    setTimeout(() => {
      dispatch(updateMessage(""));
    }, timeOut);
  };
};

export const { updateMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
