/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */

export function validationError(error, details) {
  error.name = 'ValidationError';
  error.message = 'Missing or invalid param.';
  error.statusCode = 400;
  error.details = details;
  return error;
}
