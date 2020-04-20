import React, { useRef, useEffect } from "react";
import {
  Grid,
  List,
  ListItem,
  ListSubheader,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Loader from "../../components/Loader";
import { loadVideos, videosSelector } from "../../modules/videos";
import {
  loadSubscriptions,
  subscriptionsSelector
} from "../../modules/subscriptions";
import { loadSeriesSingular, seriesAllSelector } from "../../modules/series";

import Video from "./Video";
import Series from "./Series";

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: theme.spacing(-2),
    marginRight: theme.spacing(-2),
    width: "auto"
  },
  list: {
    width: "100%",
    position: "relative",
    overflow: "auto",
    maxHeight: `calc(100vh - 60px - ${theme.spacing(6)}px)`,
    padding: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  listHeader: {
    backgroundColor: "#f2f2f2",
    paddingBottom: theme.spacing(1),
    marginLeft: theme.spacing(-2),
    marginRight: theme.spacing(-2)
  },
  listItem: {
    padding: 0
  },
  series: {
    paddingBottom: theme.spacing(3)
  }
}));

const LABEL_HEIGHT = 47;

let loadingMoreVideos = false
let loadingMoreSubscriptions = false

const HomePage = ({
  loadMore
}) => {
  const classes = useStyles();
  const recentPostsEl = useRef();
  const subscriptionsEl = useRef();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  function handleScroll(e) {
    if (e.target.id === "recentPosts" && recentPostsEl.current) {
      if (
        e.target.scrollTop + e.target.offsetHeight - LABEL_HEIGHT !==
          recentPostsEl.current.offsetHeight ||
          loadingMoreVideos
      )
        return;
      loadingMoreVideos = true;
      loadMore("post").then(() => {
        loadingMoreVideos = false;
      })
    }
    if (e.target.id === "subscriptions" && subscriptionsEl.current) {
      if (
        e.target.scrollTop + e.target.offsetHeight - LABEL_HEIGHT !==
          subscriptionsEl.current.offsetHeight ||
          loadingMoreSubscriptions
      )
        return;
      loadingMoreSubscriptions = true;
      loadMore("subscription").then(() => {
        loadingMoreSubscriptions = false;
      })
    }
  }

  return (
    <Grid container direction="row" spacing={0} className={classes.container}>
      <Grid item md={6}>
        <List id="recentPosts" className={classes.list}>
          <ListSubheader className={classes.listHeader}>
            <Typography variant="h5" component="h2" gutterBottom>
              Recently posted
            </Typography>
          </ListSubheader>

          <div ref={recentPostsEl}>
            <Loader action={loadVideos} selector={videosSelector}>
              {videos =>
                videos.map((video, index) => (
                  <ListItem
                    key={`item-recentlyPosted-${index}`}
                    className={classes.listItem}
                  >
                    <Video {...video} />
                  </ListItem>
                ))
              }
            </Loader>
          </div>
        </List>
      </Grid>
      <Grid item md={6}>
        <List id="subscriptions" className={classes.list}>
          <ListSubheader className={classes.listHeader}>
            <Typography variant="h5" component="h2" gutterBottom>
              Your Subscriptions
            </Typography>
          </ListSubheader>

          <div ref={subscriptionsEl}>
            <Loader action={loadSubscriptions} selector={subscriptionsSelector}>
              {subscriptions =>
                subscriptions.map((subscription, index) => (
                  <ListItem
                    key={`item-subscriptions-${index}`}
                    className={classes.listItem}
                  >
                    <Loader
                      action={loadSeriesSingular}
                      selector={state =>
                        seriesAllSelector(state).find(
                          ({ id }) => id === subscription.series
                        )
                      }
                      triggerAction
                      actionParams={subscription.series}
                    >
                      {series => (
                        <div className={classes.series}>
                          <Series series={series} />
                        </div>
                      )}
                    </Loader>
                  </ListItem>
                ))
              }
            </Loader>
          </div>
        </List>
      </Grid>
    </Grid>
  );
};

export default HomePage;
