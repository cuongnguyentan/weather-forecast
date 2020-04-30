import { API_ENDPOINTS } from 'consts';
import { processRequest, applyParams } from 'helpers';

export default {
  async search(term = '') {
    const ep = API_ENDPOINTS.SEARCH_LOCATION;
    const res = await processRequest(ep, {
      params: {
        term
      }
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
