import { API_ENDPOINTS } from 'consts';
import { processRequest, applyParams } from 'helpers';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

let searchSource;
const searchRequestId = uuidv4();

export default {
  async search(term = '') {
    const ep = API_ENDPOINTS.SEARCH_LOCATION;

    if (searchSource) {
      searchSource.cancel(searchRequestId);
    }

    searchSource = axios.CancelToken.source();

    const res = await processRequest(ep, {
      params: {
        term
      },
      showLoader: false,
      searchRequestId,
      cancelToken: searchSource.token
    });

    if (res.data && res.data.length) {
      return res.data;
    }

    return [];
  },

  async forecast(cityId) {
    const ep = API_ENDPOINTS.GET_FORECAST;
    const res = await processRequest({
      ...ep,
      url: applyParams(ep.url, cityId)
    });

    return res.data || {};
  }
};
