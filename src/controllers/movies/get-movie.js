/* @flow */

import Joi from 'joi';

import type { ActionSchema } from '../../helpers/action-creator';
import * as tmdb from '../../network/tmdb';

const actionCreator: ActionSchema = {
  params: {
    id: Joi.number()
      .min(0)
      .required(),
  },
  async action({ params }) {
    const { data } = await tmdb.getMovie(params.id);
    return data;
  },
};

export default actionCreator;
