import React from "react";
import { Tooltip } from "@material-ui/core";
import News from "./assets/news.svg";

const Tag = ({ width = "24px" }) => {
  return (
    <Tooltip title="News content" placement="bottom">
      <img src={News} alt="News" style={{ width: width }} />
    </Tooltip>
  );
};

export default Tag;
