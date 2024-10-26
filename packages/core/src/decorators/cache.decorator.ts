import { MetadataKeys } from '../constants/metadata.keys';

export interface CacheOptions {
  ttl?: number;
  key?: string | ((req: Request) => string);
}

export function Cache(options: CacheOptions = {}) {
  return (target: any, propertyKey: string | symbol) => {
    Reflect.defineMetadata(MetadataKeys.CACHE, options, target, propertyKey);
  };
}