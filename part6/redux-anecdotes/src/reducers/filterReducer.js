import { createSlice } from "@reduxjs/toolkit";

const initialState = { txt: "" };

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterChange(state, action) {
      return { txt: action.payload };
    },
  },
});

export const { filterChange } = filterSlice.actions;
export default filterSlice.reducer;
