/**
 * action-creator.js
 *
 * Creates an action (express middleware) from an action schema.
 *
 * @author Mateus Pires <mateusplpl@gmail.com>
 */

/* eslint-disable import/prefer-default-export */
/* @flow */

import type { $Request, $Response, NextFunction, Middelware } from 'express';
import Joi, { type Schema } from 'joi';

import { validationError } from './errors';

export type ActionSchema<P = Object, Q = Object, B = Object> = {
  params?: Schema,
  query?: Schema,
  body?: Schema,
  action: (inputs: { params: P, query: Q, body: B }) => Promise<Object>,
};

function filterValidationValue(result) {
  return result.value || {};
}

export function createAction({
  params: paramsSchema,
  query: querySchema,
  body: bodySchema,
  action,
}: ActionSchema<>): Middelware {
  return (req: $Request, res: $Response, next: NextFunction): void => {
    const validation = [
      paramsSchema ? Joi.validate(req.params, paramsSchema) : {},
      querySchema ? Joi.validate(req.query, querySchema) : {},
      bodySchema ? Joi.validate(req.body, bodySchema) : {},
    ];

    const failed = validation.find(result => result.error);

    if (failed) {
      throw validationError(new Error(), failed.error.details);
    }

    const [params, query, body] = validation.map(filterValidationValue);

    action
      .call({ req, res }, { params, query, body })
      .then(data => {
        if (!res.headersSent) {
          res.json(data);
        }
      })
      .catch(next);
  };
}