import React from "react";
import { Tooltip } from "@material-ui/core";
import Leaf from "./assets/leaf.svg";

const EvergreenTag = ({ width = "20px" }) => {
  return (
    <Tooltip
      title="Evergreen: Content that lasts longer than 2-weeks"
      placement="bottom"
    >
      <img src={Leaf} alt='Evergreen' style={{ width: width }} />
    </Tooltip>
  );
};

export default EvergreenTag;
