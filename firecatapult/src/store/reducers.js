import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appReducer from '../modules/app';
import authReducer from '../modules/auth';
import seriesReducer from '../modules/series';
import videosReducer from '../modules/videos';
import subscriptionsReducer from '../modules/subscriptions';
import loadingReducer from '../modules/loading';

export const makeRootReducer = asyncReducers => {
  const reducers = {
    router: routerReducer,
    app: appReducer,
    auth: authReducer,
    series: seriesReducer,
    videos: videosReducer,
    subscriptions: subscriptionsReducer,
    loading: loadingReducer,
    ...asyncReducers
  };
  return combineReducers(reducers);
};

export default makeRootReducer;
