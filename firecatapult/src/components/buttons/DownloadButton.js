import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import SmallButton from './SmallButton';
import { loadCustomizedVideo, customizedVideosSelector } from '../../modules/videos';
import { userSessionSelector } from '../../modules/auth';
import { BASE_URL } from '../../helpers/http';

const mapState = (state, {
    videoId
}) => {
    const customized = customizedVideosSelector(state);
    const session = userSessionSelector(state);
    const api = `${BASE_URL}/api/v1/customizedvideos/${session.uid}}/${videoId}/`;
    return {
        downloadState: customized[api]
    }
}

const mapDispatch = {
    loadCustomizedVideo
};

const DownloadButton = ({
    onDownload
}) => {
    return <SmallButton text="DOWNLOAD" onClick={onDownload} />
}

export default compose(
    connect(mapState, mapDispatch),
    withHandlers({
        onDownload: ({
            videoId,
            loadCustomizedVideo
        }) => () => {
            loadCustomizedVideo(videoId).then(response => {
                if (response.value.data.status === 'pending') {
                    alert('The video is queued. You will receive an email that has a download link. Or you can try download later.')
                } else if (response.value.data.status === 'ready') {
                    const url = response.value.data.message;
                    const a = document.createElement('a');
                    document.body.appendChild(a);
                    a.download = `Customized Video for Video #${videoId}`;
                    a.target = '_blank';
                    a.href = url;
                    a.click();
                    document.body.removeChild(a);
                }
            })
        }
    })
)(DownloadButton)