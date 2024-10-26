import { Request, Response, NextFunction } from 'express';
import { ConditionalMiddlewareConfig, MiddlewareFunction } from './middleware.types';

export enum RequestMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
  OPTIONS = 'options',
  HEAD = 'head'
}

export interface Route {
  path: string;
  method: RequestMethod;
  handler: Function;
  middlewares: MiddlewareFunction[];
  conditionalMiddlewares: ConditionalMiddlewareConfig[];
  metadata: RouteMetadata;
}

export interface RouteMetadata {
  roles?: string[];
  isPublic?: boolean;
  rateLimit?: number;
  caching?: boolean;
  validation?: any;
}

export interface HandlerFunction {
  (req: Request, res: Response, next: NextFunction): Promise<any> | any;
}