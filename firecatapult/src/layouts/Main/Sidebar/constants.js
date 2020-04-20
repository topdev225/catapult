import React from "react";

import Home from "@material-ui/icons/Home";
import PlayCircle from "@material-ui/icons/PlayCircleOutlineRounded";
import List from "@material-ui/icons/FormatListBulleted";
import DateRange from "@material-ui/icons/DateRange";
import Send from "@material-ui/icons/Send";

const iconStyle = { fontSize: "1.4rem" };

export const sidebarLinks = [
  {
    icon: <Home style={iconStyle} />,
    linkTo: "/",
    title: "Home"
  },
  {
    icon: <PlayCircle style={iconStyle} />,
    linkTo: "/series",
    title: "Series"
  },
  {
    badge: "2",
    icon: <List style={iconStyle} />,
    linkTo: "",
    title: "Queue",
    disabled: true
  },
  {
    icon: <DateRange style={iconStyle} />,
    linkTo: "",
    title: "Calendar",
    disabled: true
  },
  {
    icon: <Send style={iconStyle} />,
    popupRoute: true,
    popupType: 'distribution',
    title: "Distribute",
    disabled: false,
    style: {
      color: 'grey'
    }
  }
];
