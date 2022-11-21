import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

const searchByTagSlice = createSlice({
  name: "searchByTag",
  initialState,
  reducers: {
    setSearchByTag: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchByTag } = searchByTagSlice.actions;
export default searchByTagSlice.reducer;
