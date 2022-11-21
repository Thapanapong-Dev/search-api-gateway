import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

const searchByHeaderSlice = createSlice({
  name: "searchByHeader",
  initialState,
  reducers: {
    setSearchByHeader: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchByHeader } = searchByHeaderSlice.actions;
export default searchByHeaderSlice.reducer;
