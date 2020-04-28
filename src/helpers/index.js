import apiHandler from './api';

export const applyParams = (...args) => {
  let route = args[0] || '';

  let i = 1;
  while (i < args.length) {
    route = route.replace(/:[a-zA-Z-_]+\??/, args[i]);
    i += 1;
  }

  return route;
};

export const processRequest = (ep, config) => {
  const { method, url } = ep;

  return apiHandler({
    method,
    url,
    ...config,
  });
};

export default {};
