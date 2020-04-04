/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */

export function validationError(error, details) {
  error.name = 'ValidationError';
  error.message = 'Missing or invalid param.';
  error.statusCode = 400;
  error.details = details;
  error.handled = true;
  return error;
}

export function notFoundError(error, details) {
  error.name = 'NotFoundError';
  error.message = 'Record not found.';
  error.statusCode = 404;
  error.details = details;
  error.handled = true;
  return error;
}

export function internalServerError(error, details) {
  error.name = 'InternalServerError';
  error.message = 'Internal server error.';
  error.statusCode = 500;
  error.details = details;
  error.handled = false;
  return error;
}
