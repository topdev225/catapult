import React from "react";
import { connect } from 'react-redux';
import { Box, Button } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { loadSubscriptions, subscribe, unsubscribe } from '../../modules/subscriptions';
import { subscriptionsSelector } from '../../modules/subscriptions';
import { isLoading } from '../../modules/loading'

const useStyles = makeStyles(theme => ({
  root: {
    textTransform: "capitalize"
  }
}));

const mapState = (state, ownProps) => ({
  isBusy: isLoading(subscribe)(state) || isLoading(unsubscribe)(state),
  getSubscription () {
    const subscriptions = subscriptionsSelector(state);
    return subscriptions.find(subscription => subscription.series === ownProps.seriesId);
  }
});

const mapProps = {
  loadSubscriptions,
  subscribe,
  unsubscribe
};

const SubscribeButton = ({ isBusy, seriesId, getSubscription, loadSubscriptions, subscribe, unsubscribe }) => {
  const classes = useStyles();
  const subscription = getSubscription();

  React.useEffect(() => {
    loadSubscriptions({
      serise: seriesId
    })
  }, [seriesId])

  return (
    <Button
      className={classes.root}
      size="small"
      variant="contained"
      color="secondary"
      onClick={async () => {
        if (subscription) {
          await unsubscribe(subscription.id);
        } else {
          await subscribe(seriesId);
        }
        loadSubscriptions({
          serise: seriesId
        })
      }}
      disabled={isBusy}
    >
      {subscription && (
        <Box mr={0.5} component="span" style={{ lineHeight: 1 }}>
          <Check style={{ fontSize: 16 }} />
        </Box>
      )}
      {subscription ? "Subscribed" : "Subscribe"}
    </Button>
  );
};

export default connect(mapState, mapProps)(SubscribeButton);
