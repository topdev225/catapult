import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Box, Card, CardContent, Link, Typography } from "@material-ui/core";
import TextTruncate from "react-text-truncate";
import ReactFitText from "react-fittext";

import { EvergreenTag, NewsTag } from "../../components/tags";

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: "white",
    position: "relative",
    "&:hover > div": {
      visibility: "visible"
    },
    "&:hover > img": {
      filter: "blur(5px)"
    }
  },
  header: {
    paddingBottom: theme.spacing(1)
  },
  logo: {
    height: "auto",
    maxWidth: "100%",
    display: "block"
  },
  description: {
    fontSize: "14px",
    fontWeight: 300,
    lineHeight: "20px"
  },
  seriesLink: {
    textTransform: "capitalize"
  },
  seriesTypeIcon: {
    position: "absolute",
    right: "10px",
    top: "10px"
  },
  title: {
    color: "white",
    fontSize: "22px",
    fontWeight: 500,
    lineHeight: "26px"
  },
  videoStats: {
    marginTop: "5px",
    marginBottom: "10px"
  },
  videoStatKey: {
    fontSize: "10px",
    textTransform: "uppercase"
  },
  videoStatValue: {
    color: "#FFCB37",
    fontSize: "12px"
  }
}));

const StyledLink = withStyles(theme => ({
  root: {
    display: "block",
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.primary.main
    },
    position: "relative"
  }
}))(Link);

const StyledCardContent = withStyles(theme => ({
  root: {
    backgroundColor: `rgba(0,0,0,0.75)`,
    color: "#fff",
    padding: theme.spacing(3.75),
    position: "absolute",
    left: "0",
    top: "0",
    height: "100%",
    width: "100%",
    visibility: "hidden"
  }
}))(CardContent);

const videoStats = [
  { key: "topics", name: "Topics" },
  { key: "hosts", name: "Creators" },
  { key: "average_length", name: "Average length" },
  { key: "channels", name: "Formats" },
  { key: "delivered", name: "Delivered" }
];

const getVideoStat = (series, key) => {
  if (key === "editable") {
    return series[key] ? "Yes" : "No";
  }
  return series[key];
};

const Series = ({ series }) => {
  const classes = useStyles();

  return (
    <StyledLink
      component={RouterLink}
      to={`/series/${series.id}`}
      color="inherit"
    >
      <Card className={classes.card}>
        <img src={series.thumbnail} alt="" className={classes.logo} />

        <StyledCardContent>
          <ReactFitText compressor={1.25} maxFontSize={22}>
            <Typography variant="h6" component="h2" className={classes.title}>
              {series.name}
            </Typography>
          </ReactFitText>

          <Box className={classes.seriesTypeIcon}>
            {(!series.content_stale ||
            series.content_stale === "content_stale" || // @fix-me
              series.content_stale === "evergreen") && (
              <EvergreenTag width="15px" />
            )}
            {series.content_stale === "news" && <NewsTag width="15px" />}
          </Box>

          <Typography variant="body1" component="div">
            <Box className={classes.videoStats}>
              {videoStats.map(stat => (
                <Box key={stat.key}>
                  <Box mr={1} component="span" className={classes.videoStatKey}>
                    {stat.name}:
                  </Box>
                  <b className={`semibold ${classes.videoStatValue}`}>
                    {getVideoStat(series, stat.key)}
                  </b>
                </Box>
              ))}
            </Box>
            <Box className={classes.description}>
              <TextTruncate
                line={4}
                element="span"
                truncateText="…"
                text={series.description}
              />
            </Box>
          </Typography>
        </StyledCardContent>
      </Card>
    </StyledLink>
  );
};

export default Series;
