import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_ROOT || 'https://www.metaweather.com/api',
  headers: { 'Content-Type': 'application/json' }
});

axios.interceptors.request.use((config) => {
  // handle request
  return config;
}, (err) => {
  // handle request error
  return Promise.reject(err);
});

axios.interceptors.response.use((res) => {
  // handle response
  return res;
}, async (err) => {
  // handle response error
  return Promise.reject(err);
});

export default axios;
