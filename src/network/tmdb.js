/* eslint-disable import/prefer-default-export */
/* @flow */

import axios from 'axios';

import config from '../config';
import logger from '../logger';

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

function handleErrors(error) {
  if (error.response) {
    logger.error('tmdb: %d, %s', error.response.status, error.response.data);
  } else {
    logger.error('tmdb: %s', error.message);
  }

  throw new Error(error.message);
}

export async function getPopularMovies(page: number = 1) {
  try {
    const { data } = await instance.get('movie/popular', {
      params: { page },
    });

    return data;
  } catch (error) {
    return handleErrors(error);
  }
}

export async function searchMovies(title: string, page: number = 1) {
  try {
    const { data } = await instance.get('search/movie', {
      params: { query: title, page },
    });

    return data;
  } catch (error) {
    return handleErrors(error);
  }
}

export async function getMovie(movieId: number) {
  try {
    const { data } = await instance.get(`movie/${movieId}`);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }

    return handleErrors(error);
  }
}
