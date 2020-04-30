import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import loader from 'components/Loader/LoaderReducer';

const reducers = {
  loader
};

const rootReducer = combineReducers(reducers);

const persistConfig = {
  key: `weather-forecast.${process.env.REACT_APP_STORE_KEY}`,
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['loader']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  applyMiddleware(
    thunkMiddleware
  )
);

export const persistor = persistStore(store);
