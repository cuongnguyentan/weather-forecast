import { API_ENDPOINTS } from 'consts';
import { processRequest } from 'helpers';

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
  }
};
