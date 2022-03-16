import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

export const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const anecdoteToChange = state.find((n) => n.id === action.payload.id);
      const changedAnecdote = {
        ...anecdoteToChange,
        ...action.payload,
      };
      return state.map((anecdote) =>
        anecdote.id !== action.payload.id ? anecdote : changedAnecdote
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdote(state, action) {
      return action.payload;
    },
  },
});

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newObj = { content, votes: 0, id: Math.floor(Math.random() * 10000) };
    const newAnecdote = await anecdoteService.createNew(newObj);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const vote = (id, anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(id, anecdote);
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.getAll();
    dispatch(setAnecdote(anecdote));
  };
};

// Action creators are generated for each case reducer function
export const { updateAnecdote, appendAnecdote, setAnecdote } =  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
