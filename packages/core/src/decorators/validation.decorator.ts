import { MetadataKeys } from '../constants/metadata.keys';
import { ValidationSchema } from '../types/validation.types';

export function Validate(schema: ValidationSchema) {
  return (target: any, propertyKey: string | symbol) => {
    Reflect.defineMetadata(MetadataKeys.VALIDATION, schema, target, propertyKey);
  };
}