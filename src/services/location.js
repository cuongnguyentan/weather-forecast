import { API_ENDPOINTS } from 'consts';
import { processRequest } from 'helpers';

export default {
  async search(query = '') {
    const ep = API_ENDPOINTS.SEARCH_LOCATION;
    const res = processRequest(ep, {
      params: {
        query
      }
    });

    if (res.data && res.data.length) {
      const cities = res.data.filter((item) => item.location_type.toLowerCase() === 'city');
      return cities.map(({ title, woeid, latt_long }) => { // eslint-disable-line camelcase
        const coorsArr = latt_long.split(/,\s*/);
        const coors = {
          latt: parseFloat(coorsArr[0]),
          long: parseFloat(coorsArr[1])
        };

        return {
          title,
          woeid,
          coors
        };
      });
    }

    return [];
  }
};
