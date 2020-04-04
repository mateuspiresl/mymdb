/* @flow */

import { Router } from 'express';

import { createAction } from '../../helpers/action-creator';
import getMovie from './get-movie';
import getManyMovies from './get-many-movies';

export default Router()
  .get('/:id', createAction(getMovie))
  .get('/', createAction(getManyMovies));
