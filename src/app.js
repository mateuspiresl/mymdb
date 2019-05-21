/* @flow */

import express from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';

import config from './config';
import moviesRouter from './controllers/movies';
import genresRouter from './controllers/genres';
import imagesRouter from './controllers/images';

export default express()
  .use(cors())
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
  })

  .use('/movies', moviesRouter)
  .use('/genres', genresRouter)
  .use('/images', imagesRouter)

  // eslint-disable-next-line no-unused-vars
  .use((error, req, res, next) => {
    const { statusCode, handled, ...errorData } = error;

    res.status(statusCode || 500);

    if (handled || config.env !== 'production') {
      if (handled) {
        res.json(errorData);
      } else {
        res.send(error.message);
      }
    } else {
      res.send('Server Error');
    }
  });
