import { ControllerError } from '.';

export class MissingFieldError extends ControllerError {
  public readonly code: number;

  constructor(field: string, code?: number) {
    super(`${field} not provided.`);
    this.name = 'MissingFieldError';
    this.code = code ?? 400;
  }
}
