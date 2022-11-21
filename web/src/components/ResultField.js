import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";

import { useDispatch, useSelector } from "react-redux";
import { setSearchByTag } from "../redux/slices/searchByTagSlice";
import { addPin } from "../redux/slices/pinSlice";
import { deletePin } from "../redux/slices/pinSlice";
import { setIsSelectRecommend } from "../redux/slices/isSelectRecommendSlice";

export const ResultField = (props) => {
  const result = props?.data;
  const dispatch = useDispatch();
  const pin = useSelector((state) => state.pin?.value);

  const [pinButton, setPinButton] = useState(false);
  const deletePinFromDrawer = useSelector(
    (state) => state.deletePinFromDrawer?.value
  );

  const onPinChange = () => {
    if (!pinButton) {
      dispatch(
        addPin({
          title: result.title,
          eid: result.eid,
          url: result.url,
          description: result.description,
          photos: result.photos,
          tags: result.tags,
        })
      );
    } else {
      dispatch(deletePin(result.eid));
    }
    setPinButton(!pinButton);
  };

  useEffect(() => {
    for (let i = 0; i < pin.length; i++) {
      if (deletePinFromDrawer !== pin[i].eid) {
        setPinButton(false);
      }
    }
    for (let i = 0; i < pin.length; i++) {
      if (result.eid === pin[i].eid) {
        setPinButton(true);
      }
    }
    if (deletePinFromDrawer !== "" && pin.length === 0) setPinButton(false);
  }, [setPinButton, pin, result, deletePinFromDrawer]);

  return (
    <div id="result-field">
      <center>
        <Row className="result mt-5 mb-5">
          <Col lg={4}>
            <img
              className="img-main"
              alt={result.title}
              src={result.photos[0]}
            />
          </Col>

          <Col lg={8}>
            <Row>
              <ListItem className="title-button">
                <ListItemText>
                  <a className="title" href={result.url} alt={result.title}>
                    {result.title}
                  </a>
                </ListItemText>

                <IconButton onClick={() => onPinChange()}>
                  {pinButton ? (
                    <PushPinIcon
                      id="PushPinIcon"
                      style={{ color: "#0093E8" }}
                      fontSize="large"
                    />
                  ) : (
                    <PushPinOutlinedIcon
                      id="PushPinOutlinedIcon"
                      style={{ color: "#0093E8" }}
                      fontSize="large"
                    />
                  )}
                </IconButton>
              </ListItem>
            </Row>
            <Row>
              <div className="mt-2 description">
                {result.description.substring(0, 150)}...
                <a href={result.url}>อ่านต่อ</a>
              </div>
            </Row>
            <Row>
              <div>
                <span>หมวด - </span>
                {result.tags.map((value, idx) => (
                  <button
                    key={idx}
                    className="tags"
                    onClick={() => {
                      dispatch(setSearchByTag(value));
                      dispatch(setIsSelectRecommend(false));
                    }}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </Row>
            <Row sm={2} className="bottom">
              {result.photos.map((photo, idx) =>
                idx < 2 ? null : (
                  <Col key={idx}>
                    <img className="img-sub" alt={photo} src={photo} />
                  </Col>
                )
              )}
            </Row>
          </Col>
        </Row>
      </center>
    </div>
  );
};
