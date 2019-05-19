/* @flow */

import Joi from 'joi';

import type { ActionSchema } from '../../helpers/action-creator';
import * as tmdb from '../../network/tmdb';

const actionCreator: ActionSchema = {
  query: {
    title: Joi.string(),
    page: Joi.number().min(1),
  },
  async action({ query }) {
    if (query.title) {
      const { data } = await tmdb.searchMovies(query.title, query.page);
      return data;
    }

    const { data } = await tmdb.getPopularMovies(query.page);
    return data;
  },
};

export default actionCreator;
