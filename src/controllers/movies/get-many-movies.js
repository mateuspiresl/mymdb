/* @flow */

import Joi from 'joi';

import type { ActionSchema } from '../../helpers/action-creator';
import * as tmdb from '../../network/tmdb';

type Query = {
  title: string,
  page: number,
};

const actionCreator: ActionSchema<void, Query> = {
  query: {
    title: Joi.string(),
    page: Joi.number().min(1),
  },
  action({ query }) {
    return query.title
      ? tmdb.searchMovies(query.title, query.page)
      : tmdb.getPopularMovies(query.page);
  },
};

export default actionCreator;
