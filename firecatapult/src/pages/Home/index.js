import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers } from 'recompose';
import Home from './Home'
import {
    loadVideos,
    loadMoreVideos,
    moreVideosApiSelector
} from '../../modules/videos';
import {
    loadSubscriptions,
    loadMoreSubscriptions,
    moreSubscriptionsApiSelector
} from '../../modules/subscriptions';

const mapProps = state => ({
    moreVideosApi: moreVideosApiSelector(state),
    moreSubscriptionsApi: moreSubscriptionsApiSelector(state)
});

const mapDispatch = {
    loadVideos,
    loadMoreVideos,
    loadSubscriptions,
    loadMoreSubscriptions
};

const enhance = compose(
    connect(mapProps, mapDispatch),
    withHandlers({
        loadMore: props => type => {
            if (type === 'post' && props.moreVideosApi) {
                return props.loadMoreVideos(props.moreVideosApi)
            }
            if (type === 'subscription' && props.moreSubscriptionsApi) {
                return props.loadMoreSubscriptions(props.moreSubscriptionsApi)
            }
            return Promise.resolve();
        }
    }),
    lifecycle({
        componentWillMount() {
            this.props.loadVideos({
                ordering: '-date_created'
            });
            this.props.loadSubscriptions();
        }
    })
)

export default enhance(Home)
