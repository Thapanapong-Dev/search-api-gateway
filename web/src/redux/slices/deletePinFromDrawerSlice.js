import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

const deletePinFromDrawerSlice = createSlice({
  name: "deletePinFromDrawer",
  initialState,
  reducers: {
    setDeletePinFromDrawer: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDeletePinFromDrawer } = deletePinFromDrawerSlice.actions;
export default deletePinFromDrawerSlice.reducer;
