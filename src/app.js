/**
 * app.js
 *
 * @author Mateus Pires <mateusplpl@gmail.com>
 */

/* @flow */

import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';

import config from './config';

export default express()
  .use(compression())
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: config.secret,
    }),
  )

  .get('/', (req, res) => {
    res.send('Live!');
  });
