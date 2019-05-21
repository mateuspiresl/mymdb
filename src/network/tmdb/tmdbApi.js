/* @flow */

import type { Response } from 'axios';

import logger from '../../logger';
import { commonHttp, imageHttp } from './tmdbHttp';

function handleErrors(error) {
  if (error.response) {
    logger.error('tmdb: %d, %s', error.response.status, error.response.data);
  } else {
    logger.error('tmdb: %s', error.message);
  }

  return new Error(error.message);
}

export async function getPopularMovies(page: number = 1): Object {
  try {
    const { data } = await commonHttp.get('movie/popular', {
      params: { page },
    });

    return data;
  } catch (error) {
    return handleErrors(error);
  }
}

export async function searchMovies(title: string, page: number = 1): Object {
  try {
    const { data } = await commonHttp.get('search/movie', {
      params: { query: title, page },
    });

    return data;
  } catch (error) {
    throw handleErrors(error);
  }
}

export async function getMovie(movieId: number): Object {
  try {
    const { data } = await commonHttp.get(`movie/${movieId}`);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }

    throw handleErrors(error);
  }
}

export async function getGenres() {
  try {
    const { data } = await commonHttp.get('genre/movie/list');
    return data.genres;
  } catch (error) {
    throw handleErrors(error);
  }
}

export async function getImage(
  imageName: string,
  original: boolean = true,
): Response {
  try {
    const quality = original ? 'original' : 'w500';

    const { data } = await imageHttp.get(`${quality}/${imageName}`, {
      responseType: 'arraybuffer',
    });

    return data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }

    throw handleErrors(error);
  }
}
