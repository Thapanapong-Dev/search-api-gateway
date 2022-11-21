import React, { useState } from "react";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import IconButton from "@mui/material/IconButton";

import { useDispatch } from "react-redux";
import { deletePin } from "../redux/slices/pinSlice";
import { setDeletePinFromDrawer } from "../redux/slices/deletePinFromDrawerSlice";

export const Pin = (props) => {
  const result = props?.data;
  const dispatch = useDispatch();
  const [pinButton, setPinButton] = useState(false);

  const onPinChange = () => {
    dispatch(deletePin(result));
    dispatch(setDeletePinFromDrawer(result));
    setPinButton(pinButton);
  };

  return (
    <IconButton onClick={() => onPinChange()}>
      {!pinButton ? (
        <PushPinIcon style={{ color: "#0093E8" }} />
      ) : (
        <PushPinOutlinedIcon style={{ color: "#0093E8" }} />
      )}
    </IconButton>
  );
};
