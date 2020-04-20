import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Card, Chip, Grid, Link, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import TextTruncate from "react-text-truncate";
import moment from "moment";
import { get } from "lodash";

import Loader from "../../components/Loader";
import { SubscribeButton, DownloadButton } from "../../components/buttons";
import VideoEyeOverlay from "../../components/VideoEyeOverlay";
import VideoTime from "../../components/VideoTime";
import { loadVideo } from "../../modules/videos";
import { loadSeriesSingular, seriesAllSelector } from "../../modules/series";

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: "white",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2.5)
  },
  header: {
    paddingBottom: theme.spacing(2)
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
  relatedEpisodesBox: {
    display: "flex",
    flexDirection: "column",
    minHeight: `calc(100vh - 60px - ${theme.spacing(7)}px)`,
    marginBottom: 0
  },
  relatedEpisode: {
    paddingBottom: theme.spacing(2)
  },
  videoCol: {
    minHeight: `calc(100vh - 60px - ${theme.spacing(7)}px)`,
    marginBottom: 0,

    display: "flex",
    flexDirection: "column"
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

const Video = ({ videoSelector }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item md={7}>
      <Card className={`${classes.card} ${classes.videoCol}`}>
          <Loader action={loadVideo} selector={videoSelector}>
            {video => (
              <>
                <Grid container spacing={1} className={classes.header}>
                  <Grid item xs={true}>
                    <Typography variant="subtitle1" component="h6">
                      <b className="semibold">
                        <StyledLink
                          component={RouterLink}
                          to={`/series/${video.series.id}`}
                          color="inherit"
                        >
                          {video.series.name}
                        </StyledLink>
                      </b>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Box>
                      <SubscribeButton seriesId={video.series.id} />
                    </Box>
                  </Grid>
                </Grid>

                <Box mb={2}>
                  <div className={classes.videoContainer}>
                    <iframe
                      src={get(video, "video")}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title="video"
                      className={classes.responsiveIframe}
                    />
                  </div>
                </Box>

                <Box mb={1}>
                  <Grid container spacing={1}>
                    <Grid item xs={true}>
                      <Typography variant="h6" component="h1">
                        {video.title}
                      </Typography>

                      {video.tags && (
                        <Typography variant="body2" component="div">
                          {video.tags.split(",").map((tag, index) => (
                            <Chip
                              key={index}
                              size="small"
                              label={tag}
                              className={classes.tag}
                            />
                          ))}
                          {get(video, "series.recommended_keywords")}{" "}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item>
                      <Box>
                        <Box component="span" ml={1}>
                          <DownloadButton videoId={video.id} />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box mb={1}>
                  <Loader action={loadVideo} selector={videoSelector}>
                    {video => (
                      <Typography>
                        <TextTruncate
                          line={3}
                          element="span"
                          truncateText="…"
                          text={get(video, "description")}
                        />
                      </Typography>
                    )}
                  </Loader>
                </Box>

                {/* <Box mt={2}>
                  <Typography variant="body1" component="p">
                    <Box mr={1} component="span">
                      <Typography variant="caption">
                        <b>TAGS</b>
                      </Typography>
                      :
                    </Box>
                    {get(video, "series.recommended_keywords")}
                  </Typography>
                </Box> */}

                <Box mt={"auto"}>
                  <Grid container spacing={1}>
                    <Grid item xs={true}>
                      <b>Formats</b>: {get(video, "series.channels")}
                    </Grid>
                    <Grid container item xs={true} justify="flex-end">
                      <b>Upload date</b>:{" "}
                      {moment(get(video, "date_created")).format("MM.DD.YYYY")}
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
          </Loader>
        </Card>
      </Grid>
      <Grid item md={5}>
        <Card className={`${classes.card} ${classes.relatedEpisodesBox}`}>
          <Box mb={1}>
            <b className="semibold">Related Episodes</b>
          </Box>

          <Loader action={loadVideo} selector={videoSelector}>
            {thisVideo => (
              <Loader
                action={loadSeriesSingular}
                selector={state =>
                  seriesAllSelector(state).find(
                    ({ id }) => id === thisVideo.series.id
                  )
                }
                triggerAction
                actionParams={thisVideo.series.id}
              >
                {series =>
                  series.raw_videos
                    .filter(video => video.id !== thisVideo.id)
                    .map(video => (
                      <Link
                        component={RouterLink}
                        to={`/video/${video.id}`}
                        color="inherit"
                        key={video.id}
                        style={{ textDecoration: "none" }}
                      >
                        <Grid
                          container
                          spacing={2}
                          className={classes.relatedEpisode}
                        >
                          <Grid item xs={12} sm={5}>
                            <div className={classes.videoContainer}>
                              <img
                                src={video.thumbnail}
                                className={classes.responsiveIframe}
                                alt=""
                              />
                              <VideoTime length={video.length} />
                              <VideoEyeOverlay />
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={7}>
                            <Typography variant="h6">
                              <TextTruncate
                                line={1}
                                element="div"
                                truncateText="…"
                                text={video.title}
                              />
                            </Typography>
                            <Typography component="div">
                              <TextTruncate
                                line={2}
                                element="div"
                                truncateText="…"
                                text={video.description}
                              />
                            </Typography>
                          </Grid>
                        </Grid>
                      </Link>
                    ))
                }
              </Loader>
            )}
          </Loader>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Video;
