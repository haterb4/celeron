import { Router as ExpressRouter } from 'express';
import { Route, HandlerFunction } from '../types/http.types';
import { MiddlewareManager } from './middleware-manager';
import { MetadataKeys } from '../constants/metadata.keys';
import { Constructor } from '../types/common.types';

export class Router {
  private router: ExpressRouter;
  private middlewareManager: MiddlewareManager;

  constructor(middlewareManager: MiddlewareManager) {
    this.router = ExpressRouter();
    this.middlewareManager = middlewareManager;
  }

  public registerController(controller: Constructor): void {
    const instance = new controller();
    const options = Reflect.getMetadata(MetadataKeys.CONTROLLER_OPTIONS, controller) || {};
    const prefix = options.prefix || '';
    const version = options.version ? `/v${options.version}` : '';
    const basePath = `${version}${prefix}`;

    this.extractRoutes(controller, instance).forEach(route => {
      const path = this.normalizePath(`${basePath}${route.path}`);
      const handler = route.handler.bind(instance);
      const middlewares = this.middlewareManager.resolveMiddlewares(
        route.middlewares,
        route.metadata.roles || [],
        route.conditionalMiddlewares
      );

      this.router[route.method](path, ...middlewares, handler);
    });
  }

  private extractRoutes(controller: Constructor, instance: any): Route[] {
    return Object.getOwnPropertyNames(controller.prototype)
      .filter(prop => prop !== 'constructor')
      .map(prop => {
        const method = Reflect.getMetadata(MetadataKeys.HTTP_METHOD, controller.prototype, prop);
        if (!method) return null;

        return {
          path: Reflect.getMetadata(MetadataKeys.ROUTE_PATH, controller.prototype, prop) || '',
          method,
          handler: instance[prop],
          middlewares: Reflect.getMetadata(MetadataKeys.MIDDLEWARE, controller.prototype, prop) || [],
          conditionalMiddlewares: Reflect.getMetadata(MetadataKeys.CONDITIONAL_MIDDLEWARE, controller.prototype, prop) || [],
          metadata: Reflect.getMetadata(MetadataKeys.ROUTE_METADATA, controller.prototype, prop) || {}
        };
      })
      .filter((route): route is Route => route !== null);
  }

  private normalizePath(path: string): string {
    return `/${path}`.replace(/\/+/g, '/');
  }

  public getRouter(): ExpressRouter {
    return this.router;
  }
}