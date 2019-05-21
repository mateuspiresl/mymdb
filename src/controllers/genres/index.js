/* @flow */

import { Router } from 'express';

import { createAction } from '../../helpers/action-creator';
import getManyGenres from './get-many-genres';

export default Router().get('/', createAction(getManyGenres));
