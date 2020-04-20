import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Box, Card, Chip, Typography, Link } from "@material-ui/core";
import moment from "moment";
import TextTruncate from "react-text-truncate";

import VideoTime from "../../components/VideoTime";
import VideoEyeOverlay from "../../components/VideoEyeOverlay";
import { DownloadButton } from "../../components/buttons";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "white",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    position: "relative",
    width: "100%"
  },
  header: {
    paddingBottom: theme.spacing(1)
  },
  videoContainer: {
    position: "relative",
    overflow: "hidden",
    paddingTop: "56.25%"
  },
  responsiveIframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: 0
  },
  info: {
    display: "flex",
    flexDirection: "column"
  },
  description: {
    paddingBottom: theme.spacing(2)
  },
  keywords: {
    marginTop: "auto",
    overflow: 'hidden',
    height: '24px'
  },
  tag: {
    marginRight: theme.spacing(0.75)
  }
}));

const StyledLink = withStyles(theme => ({
  root: {
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.primary.main
    }
  }
}))(Link);

const Video = ({
  id,
  series,
  thumbnail,
  description,
  length,
  keywords,
  title,
  date_created,
  tags
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Grid container spacing={3} className={classes.header}>
        <Grid item xs={6}>
          <Typography variant="body1" component="h6">
            <StyledLink
              component={RouterLink}
              to={`/series/${series.id}`}
              color="inherit"
            >
              {series.name}
            </StyledLink>
          </Typography>
        </Grid>
        <Grid item xs={6} justify="flex-end" container>
          <DownloadButton videoId={id} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <StyledLink
            to={`/video/${id}`}
            component={RouterLink}
            color="inherit"
          >
            <div className={classes.videoContainer}>
              <img
                src={thumbnail}
                className={classes.responsiveIframe}
                alt=""
              />
              <VideoTime length={length} />
              <VideoEyeOverlay />
            </div>
          </StyledLink>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.info}>
          <Typography gutterBottom variant="h6" component="h2">
            <StyledLink
              to={`/video/${id}`}
              component={RouterLink}
              color="inherit"
            >
              <TextTruncate
                line={3}
                element="span"
                truncateText="…"
                text={title}
              />
            </StyledLink>
          </Typography>
          <Typography
            variant="body1"
            component="div"
            className={classes.description}
          >
            <TextTruncate
              line={3}
              element="span"
              truncateText="…"
              text={description}
            />
          </Typography>
          <Box className={classes.keywords}>
            {tags && tags.split(',').map((tag, index) => (
              <Chip
                key={index}
                size="small"
                label={tag}
                className={classes.tag}
              />
            ))}
          </Box>
        </Grid>
      </Grid>

      <Box mt={2}>
        <Grid container justify="flex-end" className={classes.footer}>
          <small>
            Upload Date: {moment(date_created).format("MM.DD.YYYY")}
          </small>
        </Grid>
      </Box>
    </Card>
  );
};

export default Video;
