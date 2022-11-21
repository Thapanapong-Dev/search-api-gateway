import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const pinSlice = createSlice({
  name: "pin",
  initialState,
  reducers: {
    addPin: (state, action) => {
      state.value.push(action.payload);
    },
    deletePin: (state, action) => {
      state.value = state.value.filter(({ eid }) => eid !== action.payload);
    },
  },
});

export const { addPin, deletePin } = pinSlice.actions;
export default pinSlice.reducer;
