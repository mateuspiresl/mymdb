/* @flow */

import axios from 'axios';

import config from '../../config';

export const commonHttp = axios.create({
  baseURL: config.tmdb.baseUrl,
  timeout: config.tmdb.requestTimeout,
});

commonHttp.interceptors.request.use(requestConfig => {
  // eslint-disable-next-line no-param-reassign
  requestConfig.params = {
    ...requestConfig.params,
    api_key: config.tmdb.apiKey,
  };

  return requestConfig;
});

export const imageHttp = axios.create({
  baseURL: config.tmdb.imageBaseUrl,
  timeout: config.tmdb.requestTimeout,
});
