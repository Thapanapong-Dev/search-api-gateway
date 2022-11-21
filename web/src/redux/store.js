import { configureStore } from "@reduxjs/toolkit";
import searchByTagReducer from "./slices/searchByTagSlice";
import pinReducer from "./slices/pinSlice";
import deletePinFromDrawerReducer from "./slices/deletePinFromDrawerSlice";
import selectPinReducer from "./slices/selectPinSlice";
import seeAllPinReducer from "./slices/seeAllPinSlice";
import selectRecommendReducer from "./slices/selectRecommendSlice";
import isSelectRecommendReducer from "./slices/isSelectRecommendSlice";
import searchByHeaderReducer from "./slices/searchByHeaderSlice";

export const store = configureStore({
  reducer: {
    searchByTag: searchByTagReducer,
    pin: pinReducer,
    deletePinFromDrawer: deletePinFromDrawerReducer,
    selectPin: selectPinReducer,
    seeAllPin: seeAllPinReducer,
    selectRecommend: selectRecommendReducer,
    isSelectRecommend: isSelectRecommendReducer,
    searchByHeader: searchByHeaderReducer,
  },
});
