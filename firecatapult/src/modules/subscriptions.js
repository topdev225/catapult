import { handleActions, createAction } from 'redux-actions';
import { createSelector } from 'reselect';
import { request } from '../helpers/http';
import { fulfilled } from '../helpers';
import { LOAD_SUBSCRIPTIONS, LOAD_MORE_SUBSCRIPTIONS, SUBSCRIBE, UNSUBSCRIBE } from './actions';

// ==================================
// Selectors
// ==================================
export const subscriptionsSelector = createSelector(
  state => state.subscriptions,
  subscriptions => subscriptions.list
);

export const moreSubscriptionsApiSelector = createSelector(
  state => state.subscriptions,
  subscriptions => subscriptions.next
);

// export const seriesSingularSelector = createSelector(
//   state => state.series,
//   series => series
// )

// ==================================
// Actions
// ==================================

export const loadSubscriptions = createAction(LOAD_SUBSCRIPTIONS, filters => (_, getState) => {
  // ToDo
  // /api/v1/subscriptions API should open to authenticated users and retrieve their subscriptions only. For now, it retrieves all subscriptions including others.
  const uid = getState().auth.uid;
  let path = '/api/v1/subscriptions/'
  const enhancedFilters = {
    ...filters,
    user: uid
  }
  path = path + '?' + Object.keys(enhancedFilters).map(key => `${key}=${enhancedFilters[key]}`).join('&')
  return request({
      url: path
  })
});

export const loadMoreSubscriptions = createAction(LOAD_MORE_SUBSCRIPTIONS, next => {
  return request({
    fullUrl: next,
  });
});

export const subscribe = createAction(SUBSCRIBE, seriesId => (_, getState) => {
  const uid = getState().auth.uid;
  return request({
    url: '/api/v1/subscriptions/',
    method: 'post',
    body: {
      user: uid,
      series: seriesId
    }
  });
});

export const unsubscribe = createAction(UNSUBSCRIBE, seriesId => {
  return request({
    url: `/api/v1/subscriptions/${seriesId}/`,
    method: 'delete'
  });
});

// ==================================
// Action Handlers
// ==================================
const ACTION_HANDLERS = {
    [fulfilled(loadSubscriptions)]: (state, {
      payload: { data }
    }) => ({
      ...state,
      count: data.count,
      next: data.next,
      previous: data.previous,
      list: data.results
    }),
    [fulfilled(loadMoreSubscriptions)]: (state, {
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
    })
};

// ==================================
// Reducer
// ==================================
const initialState = {
  totalCount: 0,
  next: '',
  previous: '',
  list: []
};

export default handleActions(ACTION_HANDLERS, initialState);

