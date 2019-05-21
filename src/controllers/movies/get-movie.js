/* @flow */

import Joi from 'joi';

import type { ActionSchema } from '../../helpers/action-creator';
import * as tmdb from '../../network/tmdb';
import { notFoundError } from '../../helpers/errors';

type Params = {
  id: number,
};

const actionCreator: ActionSchema<Params> = {
  params: {
    id: Joi.number()
      .min(0)
      .required(),
  },
  async action({ params }) {
    const data = await tmdb.getMovie(params.id);

    if (!data) {
      throw notFoundError(new Error(), {
        resource: 'movies',
      });
    }

    return data;
  },
};

export default actionCreator;
