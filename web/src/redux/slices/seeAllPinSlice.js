import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

const seeAllPinSlice = createSlice({
  name: "seeAll",
  initialState,
  reducers: {
    setSeeAllPin: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSeeAllPin } = seeAllPinSlice.actions;
export default seeAllPinSlice.reducer;
