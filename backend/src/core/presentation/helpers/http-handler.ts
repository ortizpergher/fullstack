import { Response } from 'express';
import { DomainError } from '../../domain/errors';
import { ControllerError } from '../errors';

export const ok = (res: Response, data?: any) => {
  return res.status(200).send({
    success: true,
    data,
  });
};

export const serverError = (res: Response, error?: any) => {
  if (error instanceof DomainError || error instanceof ControllerError) {
    return res.status(error.code).send({
      success: false,
      error: error.message,
      identifier: error.name,
    });
  }

  if (error instanceof Error) {
    return res.status(500).send({
      success: false,
      error: error.message,
      identifier: error.name,
    });
  }

  return res.status(500).send({
    success: false,
    error,
    identifier: 'unkwnown',
  });
};

export const badRequest = (res: Response, reason?: string) => {
  return res.status(400).send({
    success: false,
    reason,
  });
};
