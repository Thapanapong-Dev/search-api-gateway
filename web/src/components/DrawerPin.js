import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import PushPinIcon from "@mui/icons-material/PushPin";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

import { Pin } from "./Pin";
import { useDispatch, useSelector } from "react-redux";
import { setSelectPin } from "../redux/slices/selectPinSlice";
import { setSeeAllPin } from "../redux/slices/seeAllPinSlice";
import { setIsSelectRecommend } from "../redux/slices/isSelectRecommendSlice";

export const DrawerPin = () => {
  const dispatch = useDispatch();
  const pin = useSelector((state) => state.pin?.value);
  const [drawer, setDrawer] = useState(false);

  const pinSelection = (eid) => {
    setDrawer(false);
    dispatch(setSelectPin(eid));
    dispatch(setIsSelectRecommend(false));
    dispatch(setSeeAllPin(false));
    window.scrollTo(0, 0);
  };

  const seeAllPin = () => {
    setDrawer(false);
    dispatch(setSelectPin(""));
    if (pin.length > 0) {
      dispatch(setSeeAllPin(true));
      dispatch(setIsSelectRecommend(false));
    }
    window.scrollTo(0, 0);
  };

  return (
    <span className="d-inline drawer-pin">
      <button
        type="button"
        onClick={() => setDrawer(true)}
        className="header-button"
      >
        ปักหมุด
        <PushPinIcon id="PushPinIcon" style={{ color: "#0093E8" }} />
      </button>
      <Drawer action="left" open={drawer} onClose={() => setDrawer(false)}>
        <Box role="presentation" className="pin">
          <div>
            <div className="topic float-start">ปักหมุด</div>
            <div className="float-end">
              <Nav.Link
                className="see-all"
                onClick={() => seeAllPin()}
                type="button"
              >
                ดูทั้งหมด
              </Nav.Link>
            </div>
          </div>

          {pin.length === 0 ? (
            <div className="message">
              <span>ลองปักหมุดทริปที่สนใจดูสิ</span>
            </div>
          ) : (
            pin.map((value, idx) => (
              <ListItem disablePadding key={idx}>
                <ListItemButton onClick={() => pinSelection(value.eid)}>
                  <ListItemText>
                    <Row sm={12}>
                      <Col sm={5}>
                        <img src={value.photos[0]} alt={value.title} />
                      </Col>
                      <Col sm={7} className="title">
                        {value.title.substring(0, 60)}...
                      </Col>
                    </Row>
                  </ListItemText>
                </ListItemButton>
                <Pin data={value.eid} />
              </ListItem>
            ))
          )}
        </Box>
      </Drawer>
    </span>
  );
};
