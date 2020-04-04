/**
 * Loads the configuration from /config considering the environment.
 *
 * Common configuration should be included in /config/default.json. Any other configuration should
 * be included in the corresponding environment file. To overwrite any without changing scripts,
 * create a file called /config/local.json and add the custom configuration there.
 *
 * Based on https://github.com/mozilla/node-convict/blob/master/README.md
 */

/* @flow */

import convict from 'convict';

const CONFIG_DEFAULT = './config/default.json';
const CONFIG_LOCAL = './config/local.json';

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
    arg: 'env',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 0,
    env: 'PORT',
    arg: 'port',
  },
  tmdb: {
    apiKey: {
      doc: 'The TMDb API key.',
      format: '*',
      default: null,
      env: 'TMBD_KEY',
      arg: 'tmdb-key',
    },
    baseUrl: {
      doc: 'The TMDb base URL.',
      format: '*',
      default: null,
      env: 'TMBD_URL',
      arg: 'tmdb-url',
    },
    imageBaseUrl: {
      doc: 'The TMDb base URL.',
      format: '*',
      default: null,
      env: 'TMBD_IMAGE_URL',
      arg: 'tmdb-image-url',
    },
    requestTimeout: {
      doc: 'The request timeout.',
      format: 'nat',
      default: 0,
      env: 'TMBD_TIMEOUT',
      arg: 'tmdb-timeout',
    },
  },
});

const env = config.get('env');

// Load default and environment configs
config.loadFile([CONFIG_DEFAULT, `./config/${env}.json`]);

// Load local config if exists
try {
  config.loadFile(CONFIG_LOCAL);
} catch (_) {
  // Ignore
}

config.validate({ allowed: 'strict' });

export default config.getProperties();
