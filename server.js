/* @flow */

import http from 'http';

import config from './src/config';
import logger from './src/logger';
import app from './src/app';

const server = http.createServer(app);

logger.info('Starting server at %d', config.port);
server.listen(config.port);

export default server;
