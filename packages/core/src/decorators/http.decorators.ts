import { MetadataKeys } from '../constants/metadata.keys';
import { RequestMethod, RouteMetadata } from '../types/http.types';

interface RouteDecoratorOptions extends RouteMetadata {
  path?: string;
}

function createRouteDecorator(method: RequestMethod) {
  return (pathOrOptions?: string | RouteDecoratorOptions): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
      const options: RouteDecoratorOptions = typeof pathOrOptions === 'string'
        ? { path: pathOrOptions }
        : pathOrOptions || {};

      const path = options.path || '';
      delete options.path;

      Reflect.defineMetadata(MetadataKeys.HTTP_METHOD, method, target, propertyKey);
      Reflect.defineMetadata(MetadataKeys.ROUTE_PATH, path, target, propertyKey);
      Reflect.defineMetadata(MetadataKeys.ROUTE_METADATA, options, target, propertyKey);

      // Transformer le handler pour supporter async/await et gestion d'erreurs
      const originalMethod = descriptor.value;
      descriptor.value = async function (...args: any[]) {
        try {
          const result = await originalMethod.apply(this, args);
          const [, res] = args;
          
          if (!res.headersSent) {
            res.json(result);
          }
        } catch (error) {
          const [, , next] = args;
          next(error);
        }
      };
    };
  };
}

export const Get = createRouteDecorator(RequestMethod.GET);
export const Post = createRouteDecorator(RequestMethod.POST);
export const Put = createRouteDecorator(RequestMethod.PUT);
export const Delete = createRouteDecorator(RequestMethod.DELETE);
export const Patch = createRouteDecorator(RequestMethod.PATCH);
export const Options = createRouteDecorator(RequestMethod.OPTIONS);
export const Head = createRouteDecorator(RequestMethod.HEAD);