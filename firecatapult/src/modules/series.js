import qs from 'qs';
import { handleActions, createAction } from 'redux-actions';
import { createSelector } from 'reselect';
import { request } from '../helpers/http';
import { fulfilled } from '../helpers';
import { LOAD_SERIES, LOAD_SERIES_SINGULAR, LOAD_MORE_SERIES, LOAD_FILTERS } from './actions';

// ==================================
// Selectors
// ==================================
export const seriesAllSelector = createSelector(
  state => state.series,
  series => series.list
);

export const moreSeriesApiSelector = createSelector(
  state => state.series,
  series => series.next
);

export const seriesFilersSelector = createSelector(
  state => state.series,
  series => series.filters
);

// export const seriesSingularSelector = createSelector(
//   state => state.series,
//   series => series
// )

// ==================================
// Actions
// ==================================
export const loadSeries = createAction(LOAD_SERIES, (filters = {}) => {
  const query = qs.stringify(filters)
  return request({
    url: `/api/v1/series/?${query}`,
  });
});

export const loadSeriesSingular = createAction(LOAD_SERIES_SINGULAR, id => (
  request({
    url: `/api/v1/series/${id}/`,
  })
))

export const loadMoreSeries = createAction(LOAD_MORE_SERIES, next => {
  return request({
    fullUrl: next,
  });
});

export const loadFilters = createAction(LOAD_FILTERS, () => {
  return request({
    url: '/api/v1/series/populate/'
  })
});

// ==================================
// Action Handlers
// ==================================
const ACTION_HANDLERS = {
    [fulfilled(loadSeries)]: (state, {
      payload: { data }
    }) => ({
        ...state,
        count: data.count,
        next: data.next,
        previous: data.previous,
        list: data.results
    }),
    [fulfilled(loadSeriesSingular)]: (state, {
      payload: { data }
    }) => ({
      ...state,
      list: state.list.find(({ id }) => data.id === id)
        ? state.list.map(e => e.id === data.id ? data : e)
        : [...state.list, data].sort((a, b) => a.id - b.id)
    }),
    [fulfilled(loadMoreSeries)]: (state, {
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
    [fulfilled(loadFilters)]: (state, {
      payload: { data }
    }) => ({
      ...state,
      filters: data
    })
}

// ==================================
// Reducer
// ==================================
const initialState = {
  totalCount: 0,
  next: '',
  previous: '',
  list: [],
  filters: {}
};

export default handleActions(ACTION_HANDLERS, initialState);

