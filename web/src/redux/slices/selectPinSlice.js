import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

const selectPinSlice = createSlice({
  name: "selectPin",
  initialState,
  reducers: {
    setSelectPin: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectPin } = selectPinSlice.actions;
export default selectPinSlice.reducer;
