/* eslint-disable import/prefer-default-export */
/* @flow */

import axios from 'axios';

import config from '../config';

const instance = axios.create({
  baseURL: config.tmdb.baseUrl,
  timeout: config.tmdb.requestTimeout,
});

instance.interceptors.request.use(requestConfig => {
  // eslint-disable-next-line no-param-reassign
  requestConfig.params = {
    ...requestConfig.params,
    api_key: config.tmdb.apiKey,
  };

  return requestConfig;
});

export function getPopularMovies(page: number = 1) {
  return instance.get('movie/popular', {
    params: { page },
  });
}

export function searchMovies(title: string, page: number = 1) {
  return instance.get('search/movie', {
    params: { query: title, page },
  });
}

export function getMovie(movieId: number) {
  return instance.get(`movie/${movieId}`);
}
