import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Link,
  Typography
} from "@material-ui/core";
import TextTruncate from "react-text-truncate";
import ReactFitText from "react-fittext";

import { EvergreenTag, NewsTag } from "../../components/tags";

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: "white"
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
    paddingBottom: theme.spacing(2)
  },
  seriesLink: {
    textTransform: "capitalize"
  },
  seriesTypeIcon: {
    position: "absolute",
    right: "8px",
    top: "8px"
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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    position: "relative"
  }
}))(CardContent);

const videoStats = [
  { key: "hosts", name: "Creators" },
  { key: "average_length", name: "Average length" },
  { key: "channels", name: "Formats" },
  { key: "editable", name: "Editable?" },
  { key: "recommended_age_range", name: "Demographics" },
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
    <Card className={classes.card}>
      <Grid container spacing={0}>
        <Grid
          item
          container
          justify="center"
          alignItems="flex-start"
          xs={12}
          sm={6}
        >
          <StyledLink
            component={RouterLink}
            to={`/series/${series.id}`}
            color="inherit"
          >
            <img src={series.thumbnail} alt="" className={classes.logo} />
          </StyledLink>
        </Grid>
        <Grid item xs={12} sm={6} container>
          <StyledCardContent>
            <ReactFitText compressor={1.25} maxFontSize={24}>
              <Typography variant="h6" component="h2">
                <StyledLink
                  component={RouterLink}
                  to={`/series/${series.id}`}
                  color="inherit"
                >
                  {series.name}
                </StyledLink>
              </Typography>
            </ReactFitText>

            <Box className={classes.seriesTypeIcon}>
              {(!series.content_stale ||
                series.content_stale === "content_stale" ||
                series.content_stale === "evergreen") && <EvergreenTag />}
              {series.content_stale === "news" && <NewsTag />}
            </Box>

            <Typography variant="body1" component="div">
              <Box mt={1.5}>
                {videoStats.map(stat => (
                  <Box key={stat.key} mb={0.75}>
                    <Box mr={1} component="span">
                      <b className="semibold">{stat.name}</b>:
                    </Box>
                    {getVideoStat(series, stat.key)}
                  </Box>
                ))}
              </Box>
              <Box>
                <b className="semibold">Description</b>:<br />
                <TextTruncate
                  line={3}
                  element="span"
                  truncateText="…"
                  text={series.description}
                />{" "}
              </Box>{" "}
            </Typography>
          </StyledCardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Series;
