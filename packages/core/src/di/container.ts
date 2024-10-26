import { createContainer, InjectionMode, AwilixContainer, asClass, asFunction, asValue, Lifetime, InjectionModeType, LifetimeType } from 'awilix';
import { Constructor } from '../types/common.types';

export interface ContainerOptions {
  injectionMode?: InjectionModeType;
  lifetime?: LifetimeType;
}

export class Container {
  private static container: AwilixContainer;
  private static options: ContainerOptions = {
    injectionMode: InjectionMode.CLASSIC,
    lifetime: Lifetime.SINGLETON
  };

  static initialize(options?: ContainerOptions) {
    this.options = { ...this.options, ...options };
    this.container = createContainer({
      injectionMode: this.options.injectionMode
    });
  }

  static register(name: string, value: any, options: { type?: 'class' | 'function' | 'value', lifetime?: LifetimeType } = {}) {
    const { type = 'class', lifetime = this.options.lifetime } = options;

    let registration;
    switch (type) {
      case 'class':
        registration = asClass(value, { lifetime });
        break;
      case 'function':
        registration = asFunction(value, { lifetime });
        break;
      case 'value':
        registration = asValue(value);
        break;
      default:
        throw new Error(`Invalid registration type: ${type}`);
    }

    this.container.register(name, registration);
  }

  static registerMany(registrations: Record<string, Constructor>) {
    Object.entries(registrations).forEach(([name, value]) => {
      this.register(name, value);
    });
  }

  static resolve<T>(name: string): T {
    return this.container.resolve<T>(name);
  }

  static getContainer(): AwilixContainer {
    return this.container;
  }

  static dispose(): void {
    if (this.container) {
      this.container.dispose();
    }
  }
}