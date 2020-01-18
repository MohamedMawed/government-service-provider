import { applyMiddleware, createStore } from 'redux';

import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = (middleware) => {

  return applyMiddleware(...middleware);
};

function configureStore(reducer) {
  const persistedReducer = reducer;
  const store = createStore(
    persistedReducer,
    bindMiddleware([sagaMiddleware]),
  );
    console.log('MPStore',store);
  const persistor = persistStore(store);


  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSagaTask();

  return { store, persistor };
}

export default configureStore;
