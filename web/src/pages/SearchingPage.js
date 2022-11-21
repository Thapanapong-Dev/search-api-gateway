import React, { useState, useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { ResultField } from "../components/ResultField";

import { useDispatch, useSelector } from "react-redux";
import { setSearchByTag } from "../redux/slices/searchByTagSlice";
import { setSelectPin } from "../redux/slices/selectPinSlice";
import { setSeeAllPin } from "../redux/slices/seeAllPinSlice";
import { setIsSelectRecommend } from "../redux/slices/isSelectRecommendSlice";
import { setSearchByHeader } from "../redux/slices/searchByHeaderSlice";

import axios from "axios";
import ReactLoading from "react-loading";
import Container from "react-bootstrap/Container";
import { Recommend } from "../components/Recommend";

const useNavigateSearch = () => {
  const navigate = useNavigate();
  return (pathname, params) =>
    navigate(decodeURI(`${pathname}?${createSearchParams(params)}`));
};

export default function SearchingPage() {
  const dispatch = useDispatch();
  const searchByTag = useSelector((state) => state.searchByTag?.value);
  const selectPin = useSelector((state) => state.selectPin?.value);
  const pin = useSelector((state) => state.pin?.value);
  const seeAllPin = useSelector((state) => state.seeAllPin?.value);
  const selectRecommend = useSelector((state) => state.selectRecommend?.value);
  const searchByHeader = useSelector((state) => state.searchByHeader?.value);
  const isSelectRecommend = useSelector(
    (state) => state.isSelectRecommend?.value
  );

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigateSearch = useNavigateSearch();
  const [results, setResults] = useState([]);
  const beseSearchAPI = "http://localhost:5000/api/trips?";
  const [currentURL, setCurrentURL] = useState(window.location.href);
  const [message, setMessage] = useState("");

  const updatePath = () => {
    if (search.length > 2) {
      navigateSearch("/api/trips", {
        title: search,
        description: search,
        tags: search,
      });
    }
  };

  const onSearch = (e) => {
    setSearch(e);
    dispatch(setSearchByTag(""));
    dispatch(setSelectPin(""));
    dispatch(setSeeAllPin(false));
    dispatch(setIsSelectRecommend(false));
    dispatch(setSearchByHeader(""));
  };

  const loading = () => {
    return (
      <ReactLoading
        className="loading"
        type="spinningBubbles"
        color="#0093E8"
        height={100}
        width={50}
      />
    );
  };

  useEffect(() => {
    if (
      currentURL.search("title") !== -1 ||
      currentURL.search("description") !== -1 ||
      currentURL.search("tags") !== -1
    ) {
      const searchFromURL = decodeURI(
        currentURL.substring(
          currentURL.indexOf("=") + 1,
          currentURL.indexOf("&")
        )
      );

      if (search.length < 2) {
        setSearch(searchFromURL);
      }
    }
  }, [currentURL, search]);

  useEffect(() => {
    if (search.length > 0) setIsLoading(true);
    if (search.length > 2) {
      const delayDebounceFn = setTimeout(() => {
        updatePath();
        setIsLoading(false);
        axios
          .get(
            `${beseSearchAPI}title=${search}&description=${search}&tags=${search}`
          )
          .then((response) => {
            const isError = response.data.error;
            const isEmpty = response.data.message === "No results found";
            if (isEmpty) setMessage("ไม่พบทริปที่คุณต้องการ ลองค้นหาใหม่ดูสิ");
            if (!isError && !isEmpty) {
              setMessage("");
              setResults(response.data.data);
            }
          })
          .catch((error) => {
            console.log("API Error: ", error);
          });
      }, 1000);
      return () => {
        clearTimeout(delayDebounceFn);
        setResults([]);
      };
    } else {
      updatePath();
      setCurrentURL("http://localhost:3000/");
      const delayDebounceFn = setTimeout(() => {
        setIsLoading(false);
        navigateSearch("/");
        if (search.length > 0) {
          setMessage("ไม่พบทริปที่คุณต้องการ ลองค้นหาใหม่ดูสิ");
        } else {
          setMessage("");
        }
      }, 1000);
      return () => {
        clearTimeout(delayDebounceFn);
        setResults([]);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (searchByTag !== "") {
      setSearch(searchByTag);
      dispatch(setSearchByTag(""));
      dispatch(setSelectPin(""));
      dispatch(setSeeAllPin(false));
    } else if (searchByHeader !== "") {
      setSearch(searchByHeader);
      dispatch(setSearchByHeader(""));
      dispatch(setSearchByTag(""));
    } else if (selectPin !== "" || seeAllPin) {
      setSearch("");
    } else if (isSelectRecommend) {
      setSearch("");
    }
  }, [
    search,
    dispatch,
    searchByTag,
    searchByHeader,
    seeAllPin,
    selectPin,
    isSelectRecommend,
  ]);

  const specifiedResult = () => {
    if (selectRecommend.length > 0 && isSelectRecommend) {
      return selectRecommend.map((value, idx) => (
        <div key={idx}>
          <ResultField data={value} />
        </div>
      ));
    } else if (selectPin !== "") {
      return pin.map((value, idx) =>
        value.eid === selectPin ? (
          <div key={idx}>
            <ResultField data={value} />
          </div>
        ) : null
      );
    } else if (seeAllPin) {
      return pin.map((value, idx) => (
        <div key={idx}>
          <ResultField data={value} />
        </div>
      ));
    } else {
      return results.map((value, idx) => (
        <div key={idx}>
          <ResultField data={value} />
        </div>
      ));
    }
  };

  return (
    <Container>
      <div className="search" id="search">
        <div className="topic-wrap">
          <a className="topic" href="http://localhost:3000/" alt="เที่ยวไหนดี">
            เที่ยวไหนดี
          </a>
        </div>
        <input
          type="text"
          value={search}
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          onChange={(e) => onSearch(e.target.value)}
        />
        <div className="message mt-5">{message}</div>
        {isSelectRecommend ? <Recommend /> : null}
        {isLoading ? loading() : specifiedResult()}
      </div>
    </Container>
  );
}
