import HttpMethod from 'consts/httpMethod';

export const API_ENDPOINTS = {
  SEARCH_LOCATION: {
    url: '/cities',
    method: HttpMethod.GET
  },

  GET_FORECAST: {
    url: '/cities/:id/forecast',
    method: HttpMethod.GET
  }
};

export default {};
