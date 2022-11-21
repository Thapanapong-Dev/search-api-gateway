import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

const isSelectRecommendSlice = createSlice({
  name: "isSelectRecommend",
  initialState,
  reducers: {
    setIsSelectRecommend: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsSelectRecommend } = isSelectRecommendSlice.actions;
export default isSelectRecommendSlice.reducer;
