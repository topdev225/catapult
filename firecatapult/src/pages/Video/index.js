import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Video from './Video'
import { loadVideo, videosSelector } from '../../modules/videos';
import { withRouter } from "react-router-dom";

const mapProps = null

const mapDispatch = {
    loadVideo
}

const mergeProps = (stateProps, dispatchProps, {
    match
}) => ({
    ...stateProps,
    ...dispatchProps,
    videoId: match.params.id,
    videoSelector (state) {
        const videos = videosSelector(state)
        return videos.find(({ id }) => id === Number(match.params.id))
    }
})

const enhance = compose(
    withRouter,
    connect(mapProps, mapDispatch, mergeProps),
    lifecycle({
        componentWillMount() {
            this.props.loadVideo(this.props.videoId);
        },
        componentWillUpdate(nextProps) {
            if (this.props.videoId !== nextProps.videoId) {
                this.props.loadVideo(nextProps.videoId);
            }
        }
    })
)

export default enhance(Video)
