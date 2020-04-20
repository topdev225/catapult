import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reduxThunkFsa from 'redux-thunk-fsa';
import promiseMiddleware from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import { initHttp } from '../helpers';
import makeRootReducer from './reducers';

export default (initialState = {}, history) => {
  let ENV = process.env.NODE_ENV;
  // ========================================
  // Middleware Configuration
  // ========================================
  const middleware = [
    reduxThunkFsa,
    promiseMiddleware,
    routerMiddleware(history)
  ];
  if (ENV !== 'production') {
    middleware.push(createLogger({ collapsed: true, duration: true }))
  };

  // ========================================
  // Store Enhancers
  // ========================================
  const enhancers = [];
  let composeEnhancers = compose;

  if (ENV !== 'production') {
    const composeWithDevToolsExtension =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  // ========================================
  // Store Instantiation
  // ========================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middleware), ...enhancers)
  );

  store.asyncReducers = {};

  const onUnauthCallback = () => {
  };
  initHttp(store, onUnauthCallback);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextMakeRootReducer = require('./reducers').default
      store.replaceReducer(nextMakeRootReducer(store.asyncReducers))
    });
  }

  return store
}
