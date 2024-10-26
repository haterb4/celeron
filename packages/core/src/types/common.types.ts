export type Constructor<T = any> = new (...args: any[]) => T;
export type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
export type MethodDecorator = <T>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;
