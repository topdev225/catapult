import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Box, Card, Divider, Grid, Typography } from "@material-ui/core";
import moment from "moment";

import { SubscribeButton } from "../../components/buttons";
import { EvergreenTag, NewsTag } from "../../components/tags";
import Loader from "../../components/Loader";
import { loadSeriesSingular } from "../../modules/series";
import VideoTime from "../../components/VideoTime";
import VideoEyeOverlay from "../../components/VideoEyeOverlay";

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: "white",
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3)
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
  logo: {
    height: "auto",
    maxWidth: "100%"
  },
  info: {
    display: "flex",
    flexDirection: "column"
  },
  description: {
    paddingBottom: theme.spacing(2)
  },
  footer: {
    marginTop: theme.spacing(2)
  },
  videoLink: {
    textDecoration: "none"
  }
}));

const Series = ({ seriesSingularSelector }) => {
  const classes = useStyles();

  return (
    <div className="series-page">
      <Loader action={loadSeriesSingular} selector={seriesSingularSelector}>
        {seriesSingular => (
          <Card className={classes.card}>
            <Grid container spacing={4}>
              <Grid
                item
                container
                xs={12}
                sm={2}
                md={4}
                justify="center"
                alignItems="flex-start"
              >
                <img
                  src={seriesSingular.thumbnail}
                  alt=""
                  className={classes.logo}
                />
              </Grid>
              <Grid item xs={12} sm={10} md={8} className={classes.info}>
                <Box mb={1}>
                  <Grid container>
                    <Grid item xs={true}>
                      <Typography gutterBottom variant="h5" component="h1">
                        <b className="semibold">{seriesSingular.name}</b>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Box>
                        <Box
                          mr={2}
                          component="span"
                          style={{
                            display: "inline-block",
                            verticalAlign: "middle"
                          }}
                        >
                          {(!seriesSingular.content_stale ||
                            seriesSingular.content_stale === "content_stale" || // @fix-me
                            seriesSingular.content_stale === "evergreen") && (
                            <EvergreenTag />
                          )}
                          {seriesSingular.content_stale === "news" && (
                            <NewsTag />
                          )}
                        </Box>
                        <SubscribeButton seriesId={seriesSingular.id} />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box mb={3}>
                  <Typography variant="body1" component="div">
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6} lg={5}>
                        <b>Creator</b>: {seriesSingular.hosts}
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <b>Delivered</b>: {seriesSingular.delivered}
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6} lg={5}>
                        <b>Formats</b>: {seriesSingular.channels}
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <b>Average length</b>:{" "}
                        {seriesSingular.recommended_age_range}
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6} lg={5}>
                        <b>Topics:</b> {seriesSingular.topics}
                      </Grid>
                    </Grid>
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  component="p"
                  className={classes.description}
                >
                  {seriesSingular.description}
                </Typography>

                <Typography
                  variant="body1"
                  component="p"
                  className={classes.description}
                >
                  <b>About the Creator:</b> {seriesSingular.about_the_creator}
                </Typography>

                <Typography
                  variant="body1"
                  component="p"
                  className={classes.description}
                >
                  <b>Editable?</b>:{" "}
                  {seriesSingular.editable ? "Yes" : "No"}
                </Typography>

                <Typography
                  variant="body1"
                  component="p"
                  className={classes.description}
                >
                  <b>Demographics:</b> {seriesSingular.recommended_age_range}
                </Typography>
              </Grid>
            </Grid>

            <Box my={3}>
              <Divider />
            </Box>

            <Grid container spacing={2}>
              {seriesSingular.raw_videos.map(video => (
                <Grid item xs={12} sm={6} md={3} lg={2}>
                  <Link to={`/video/${video.id}`} className={classes.videoLink}>
                    <Box mb={1} className={classes.videoContainer}>
                      <img
                        src={video.thumbnail}
                        className={classes.responsiveIframe}
                        alt=""
                      />
                      <VideoTime length={video.length} />
                      <VideoEyeOverlay />
                    </Box>
                  </Link>

                  <b className="semibold" style={{ lineHeight: "1.15" }}>
                    {video.title}
                  </b>

                  <Typography component="div" variant="body1">
                    <small>
                      POSTED: {moment(video.date_created).format("MM.DD.YYYY")}
                    </small>
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Card>
        )}
      </Loader>
    </div>
  );
};

export default Series;
