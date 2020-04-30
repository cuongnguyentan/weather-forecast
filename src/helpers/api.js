/* eslint-disable no-param-reassign */

import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { store } from 'store';
import { actions as loaderActions } from 'components/Loader';

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_ROOT,
  headers: { 'Content-Type': 'application/json' }
});

axios.interceptors.request.use((config) => {
  let { requestId } = config;
  if (!requestId) {
    requestId = uuidv4();
    config.requestId = requestId;
  }

  if (config.showLoader !== false) {
    store.dispatch(loaderActions.toggle(true, requestId));
  }

  return config;
}, (err) => {
  if (err.config.showLoader !== false) {
    store.dispatch(loaderActions.toggle(false, err.config.requestId));
  }

  return Promise.reject(err);
});

axios.interceptors.response.use((res) => {
  if (res.config.showLoader !== false) {
    store.dispatch(loaderActions.toggle(false, res.config.requestId));
  }

  return res;
}, async (err) => {
  if (Axios.isCancel(err)) {
    return false;
  }

  if (err.config.showLoader !== false) {
    store.dispatch(loaderActions.toggle(false, err.config.requestId));
  }

  return Promise.reject(err);
});

export default axios;
