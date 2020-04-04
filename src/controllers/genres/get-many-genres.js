/* @flow */

import type { ActionSchema } from '../../helpers/action-creator';
import * as tmdb from '../../network/tmdb';

const actionCreator: ActionSchema<> = {
  async action() {
    const data = await tmdb.getGenres();
    return { results: data };
  },
};

export default actionCreator;
