import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Nav from "react-bootstrap/Nav";

import { useDispatch, useSelector } from "react-redux";
import { addSelectRecommend } from "../redux/slices/selectRecommendSlice";
import { deleteSelectRecommend } from "../redux/slices/selectRecommendSlice";
import { setIsSelectRecommend } from "../redux/slices/isSelectRecommendSlice";
import axios from "axios";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const Recommend = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const selectRecommend = useSelector((state) => state.selectRecommend?.value);

  const recommendSelection = (value) => {
    if (selectRecommend.length > 0) {
      dispatch(deleteSelectRecommend(selectRecommend[0].eid));
    }
    dispatch(addSelectRecommend(value));
  };

  useEffect(() => {
    if (data.length === 0) {
      axios
        .get("http://localhost:5000/api/all-trips")
        .then((response) => {
          const isError = response.data.error;
          const isEmpty = response.data.message === "No results found";
          if (!isError && !isEmpty) {
            setData(response.data.data);
          }
        })
        .catch((error) => {
          console.log("API Error: ", error);
        });
    }
  }, [data]);
  return (
    <section className="recommend">
      <div className="container">
        <div className="row">
          <div className="col-12 recommend-bx">
            <ListItem>
              <ListItemText>
                <h2>ทริปแนะนำสำหรับคุณ</h2>
              </ListItemText>
              <IconButton onClick={() => dispatch(setIsSelectRecommend(false))}>
                <ClearIcon
                  style={{ color: "rgb(160, 160, 160)" }}
                  fontSize="large"
                />
              </IconButton>
            </ListItem>

            <Carousel
              responsive={responsive}
              // infinite={true}
              className="owl-carousel owl-theme recommend-slider"
            >
              {data.map((value, idx) => (
                <div key={idx} className="item">
                  <Nav.Link
                    href="#result-field"
                    onClick={() => recommendSelection(value)}
                  >
                    <img src={value.photos[2]} alt={value.title} />
                  </Nav.Link>
                  <Nav.Link
                    className="trip-link"
                    href="#result-field"
                    onClick={() => recommendSelection(value)}
                  >
                    {value.title}
                  </Nav.Link>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};
