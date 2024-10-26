import { MetadataKeys } from '../constants/metadata.keys';
import { MiddlewareFunction, ConditionalMiddlewareConfig } from '../types/middleware.types';

export function UseMiddleware(
    ...middlewares: MiddlewareFunction[]
): MethodDecorator {
  return (target: any, propertyKey: string | symbol) => {
    const existingMiddlewares = Reflect.getMetadata(
      MetadataKeys.MIDDLEWARE,
      target,
      propertyKey
    ) || [];

    Reflect.defineMetadata(
      MetadataKeys.MIDDLEWARE,
      [...existingMiddlewares, ...middlewares],
      target,
      propertyKey
    );
  };
}

export function UseMiddlewareGroup(...groupNames: string[]) {
  return (target: any, propertyKey: string | symbol) => {
    const existingGroups = Reflect.getMetadata(
      MetadataKeys.MIDDLEWARE_GROUPS,
      target,
      propertyKey
    ) || [];

    Reflect.defineMetadata(
      MetadataKeys.MIDDLEWARE_GROUPS,
      [...existingGroups, ...groupNames],
      target,
      propertyKey
    );
  };
}

export function ConditionalMiddleware(config: ConditionalMiddlewareConfig): MethodDecorator {
  return (target: any, propertyKey: string | symbol) => {
    const existingConditions = Reflect.getMetadata(
      MetadataKeys.CONDITIONAL_MIDDLEWARE,
      target,
      propertyKey
    ) || [];

    Reflect.defineMetadata(
      MetadataKeys.CONDITIONAL_MIDDLEWARE,
      [...existingConditions, config],
      target,
      propertyKey
    );
  };
}