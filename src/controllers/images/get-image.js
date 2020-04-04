/* @flow */

import Joi from 'joi';

import type { ActionSchema } from '../../helpers/action-creator';
import * as tmdb from '../../network/tmdb/tmdbApi';
import { notFoundError } from '../../helpers/errors';

type Params = {
  name: string,
};

type Query = {
  original?: boolean,
};

const actionCreator: ActionSchema<Params, Query> = {
  params: {
    name: Joi.string().required(),
  },
  query: {
    original: Joi.bool(),
  },
  async action({ params, query }) {
    const data = await tmdb.getImage(params.name, query.original);

    if (!data) {
      throw notFoundError(new Error(), {
        resource: 'images',
      });
    }

    this.res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    this.res.end(data, 'binary');
  },
};

export default actionCreator;
