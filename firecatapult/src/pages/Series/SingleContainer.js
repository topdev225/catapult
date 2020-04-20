import { connect } from 'react-redux';
import moment from 'moment';
import { compose, lifecycle } from 'recompose';
import Single from './Single'
import { loadSeriesSingular, seriesAllSelector } from '../../modules/series';

const mapState = null

const mapDispatch = {
    loadSeriesSingular
}

const mergeProps = (stateProps, dispatchProps, {
    match
}) => ({
  ...stateProps,
  ...dispatchProps,
  seriesId: match.params.id,
  seriesSingularSelector (state) {
    const seriesAll = seriesAllSelector(state)
    const seriesSingular = seriesAll.find(({ id }) => id === Number(match.params.id))
    return seriesSingular ? {
        ...seriesSingular,
        raw_videos: seriesSingular.raw_videos.sort((a, b) => moment(a.date_created).isBefore(moment(b.date_created)) ? 1 : -1)
    } : null
  }
})

const enhance = compose(
    connect(mapState, mapDispatch, mergeProps),
    lifecycle({
        componentDidMount() {
            this.props.loadSeriesSingular(this.props.seriesId);
        }
    })
)

export default enhance(Single)
