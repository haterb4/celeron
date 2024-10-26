export class ReflectionUtils {
    static getAllMethodNames(target: any): string[] {
      return Object.getOwnPropertyNames(target.prototype)
        .filter(prop => prop !== 'constructor' && typeof target.prototype[prop] === 'function');
    }
  
    static getMetadata(key: string, target: any, propertyKey?: string | symbol): any {
      return propertyKey
        ? Reflect.getMetadata(key, target, propertyKey)
        : Reflect.getMetadata(key, target);
    }
  
    static defineMetadata(key: string, value: any, target: any, propertyKey?: string | symbol): void {
      if (propertyKey) {
        Reflect.defineMetadata(key, value, target, propertyKey);
      } else {
        Reflect.defineMetadata(key, value, target);
      }
    }
  }