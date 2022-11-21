import React, { useState, useEffect } from "react";
import { DrawerPin } from "./DrawerPin";
import RecommendIcon from "@mui/icons-material/Recommend";

import { useDispatch, useSelector } from "react-redux";
import { setIsSelectRecommend } from "../redux/slices/isSelectRecommendSlice";
import { setSearchByHeader } from "../redux/slices/searchByHeaderSlice";
import { deleteSelectRecommend } from "../redux/slices/selectRecommendSlice";
import { setSelectPin } from "../redux/slices/selectPinSlice";
import { setSeeAllPin } from "../redux/slices/seeAllPinSlice";

export default function Header() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const searchByHeader = useSelector((state) => state.searchByHeader?.value);
  const selectRecommend = useSelector((state) => state.selectRecommend?.value);
  const isSelectRecommend = useSelector(
    (state) => state.isSelectRecommend?.value
  );
  const buttonDisable = isSelectRecommend ? true : false;

  const onSearch = (e) => {
    setSearch(e);
  };

  const isRecommend = () => {
    dispatch(setIsSelectRecommend(true));
    dispatch(setSeeAllPin(false));
    dispatch(setSelectPin(""));
    if (selectRecommend.length > 0) {
      dispatch(deleteSelectRecommend(selectRecommend[0].eid));
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.length > 2) {
        dispatch(setSearchByHeader(search));
        dispatch(setIsSelectRecommend(false));
        dispatch(setSeeAllPin(false));
        dispatch(setSelectPin(""));
      }
    }, 1000);
    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [search, dispatch]);

  useEffect(() => {
    if (searchByHeader !== "") {
      setSearch("");
      dispatch(setSearchByHeader(""));
    }
  }, [search, searchByHeader, dispatch]);

  return (
    <div sx={{ flexGrow: 1 }} className="header">
      <DrawerPin />
      <div className="d-inline">
        <input
          value={search}
          type="text"
          placeholder="ค้นหาทริป"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="d-inline">
        <button
          type="button"
          className={!buttonDisable ? "header-button" : "header-button-disable"}
          onClick={() => isRecommend()}
          disabled={buttonDisable}
        >
          ทริปแนะนำ
          <RecommendIcon
            style={
              !buttonDisable
                ? { color: "#0093E8" }
                : { color: "rgb(160, 160, 160)" }
            }
          />
        </button>
      </div>
    </div>
  );
}
