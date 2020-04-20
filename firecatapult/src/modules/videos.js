import { handleActions, createAction } from 'redux-actions';
import { createSelector } from 'reselect';
import { request } from '../helpers/http';
import { fulfilled } from '../helpers';
import { LOAD_VIDEO, LOAD_VIDEOS, LOAD_MORE_VIDEOS, LOAD_CUSTOMIZED_VIDEO } from './actions';

// ==================================
// Selectors
// ==================================
export const videosSelector = createSelector(
  state => state.videos,
  videos => videos.list
);

export const moreVideosApiSelector = createSelector(
  state => state.videos,
  videos => videos.next
);

export const customizedVideosSelector = createSelector(
  state => state.videos,
  videos => videos.customized
)

// export const seriesSingularSelector = createSelector(
//   state => state.series,
//   series => series
// )

// ==================================
// Actions
// ==================================
export const loadVideo = createAction(LOAD_VIDEO, id => (
  request({
    url: `/api/v1/rawvideos/${id}/`,
  })
));

export const loadVideos = createAction(LOAD_VIDEOS, params => {
  let path = '/api/v1/rawvideos/'
  if (params) {
    path = path + '?' + Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
  }
  return request({
    url: path,
  })
});

export const loadMoreVideos = createAction(LOAD_MORE_VIDEOS, next => {
  return request({
    fullUrl: next,
  });
});

export const loadCustomizedVideo = createAction(LOAD_CUSTOMIZED_VIDEO, videoId => (_, getState) => {
  const uid = getState().auth.uid;
  return request({
    url: `/api/v1/customizedvideos/${uid}/${videoId}/`
  })
});

// ==================================
// Action Handlers
// ==================================
const ACTION_HANDLERS = {
    [fulfilled(loadVideo)]: (state, {
      payload: { data }
    }) => ({
      ...state,
      list: state.list.find(({ id }) => data.id === id)
        ? state.list.map(e => e.id === data.id ? data : e)
        : [...state.list, data].sort((a, b) => a.id - b.id)
    }),
    [fulfilled(loadVideos)]: (state, {
      payload: { data }
    }) => ({
      ...state,
      count: data.count,
      next: data.next,
      previous: data.previous,
      list: data.results
    }),
    [fulfilled(loadMoreVideos)]: (state, {
      payload: { data }
    }) => ({
      ...state,
      count: data.count,
      next: data.next,
      previous: data.previous,
      list: [
        ...state.list,
        ...data.results
      ]
    }),
    [fulfilled(loadCustomizedVideo)]: (state, action) => ({
      ...state,
      customized: {
        [action.payload.config.url]: action.payload.data
      }
    })
};

// ==================================
// Reducer
// ==================================
const initialState = {
  totalCount: 0,
  next: '',
  previous: '',
  list: [],
  customized: {}
};

export default handleActions(ACTION_HANDLERS, initialState);

