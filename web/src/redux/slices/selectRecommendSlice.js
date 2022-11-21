import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const selectRecommendSlice = createSlice({
  name: "selectRecommend",
  initialState,
  reducers: {
    addSelectRecommend: (state, action) => {
      state.value.push(action.payload);
    },
    deleteSelectRecommend: (state, action) => {
      state.value = state.value.filter(({ eid }) => eid !== action.payload);
    },
  },
});

export const { addSelectRecommend, deleteSelectRecommend } =
  selectRecommendSlice.actions;
export default selectRecommendSlice.reducer;
