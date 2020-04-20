import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers } from 'recompose';
import All from './All'
import {
    loadSeries,
    loadMoreSeries,
    loadFilters,
    moreSeriesApiSelector,
    seriesFilersSelector
} from '../../modules/series';

const mapState = state => ({
    moreSeriesApi: moreSeriesApiSelector(state),
    seriesFilters: seriesFilersSelector(state)
})

const mapDispatch = {
    loadSeries,
    loadMoreSeries,
    loadFilters
}

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps
})

const enhance = compose(
    connect(mapState, mapDispatch, mergeProps),
    withHandlers({
        loadMore: props => () => {
            if (props.moreSeriesApi) {
                return props.loadMoreSeries(props.moreSeriesApi)
            }
            return Promise.resolve();
        }
    }),
    lifecycle({
        componentWillMount() {
            this.props.loadFilters()
        }
    })
)

export default enhance(All)
