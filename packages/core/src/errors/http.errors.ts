export class HttpError extends Error {
    constructor(public status: number, message: string) {
      super(message);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class BadRequestError extends HttpError {
    constructor(message: string = 'Bad Request') {
      super(400, message);
    }
  }
  
  export class UnauthorizedError extends HttpError {
    constructor(message: string = 'Unauthorized') {
      super(401, message);
    }
  }
  
  export class ForbiddenError extends HttpError {
    constructor(message: string = 'Forbidden') {
      super(403, message);
    }
  }
  
  export class NotFoundError extends HttpError {
    constructor(message: string = 'Not Found') {
      super(404, message);
    }
  }