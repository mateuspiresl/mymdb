/* @flow */

import { Router } from 'express';

import { createAction } from '../../helpers/action-creator';
import getImage from './get-image';

export default Router().get('/:name', createAction(getImage));
