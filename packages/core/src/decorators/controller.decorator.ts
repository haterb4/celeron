import { MetadataKeys } from '../constants/metadata.keys';
import { Constructor } from '../types/common.types';

export interface ControllerOptions {
  prefix?: string;
  version?: string | number;
  tags?: string[];
}

export function Controller(prefixOrOptions?: string | ControllerOptions): ClassDecorator {
  return (target: Function) => {
    const options: ControllerOptions = typeof prefixOrOptions === 'string'
      ? { prefix: prefixOrOptions }
      : prefixOrOptions || {};

    Reflect.defineMetadata(MetadataKeys.CONTROLLER_OPTIONS, options, target);
    Reflect.defineMetadata(MetadataKeys.IS_CONTROLLER, true, target);
  };
}