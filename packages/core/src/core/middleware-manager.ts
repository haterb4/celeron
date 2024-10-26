import { MiddlewareFunction, MiddlewareGroup, ConditionalMiddlewareConfig } from '../types/middleware.types';

export class MiddlewareManager {
  private groups: Map<string, MiddlewareGroup>;
  private globalMiddlewares: MiddlewareFunction[];

  constructor() {
    this.groups = new Map();
    this.globalMiddlewares = [];
  }

  public addGroup(group: MiddlewareGroup): void {
    this.groups.set(group.name, {
      ...group,
      priority: group.priority || 0
    });
  }

  public getGroup(name: string): MiddlewareGroup | undefined {
    return this.groups.get(name);
  }

  public addGlobalMiddleware(...middlewares: MiddlewareFunction[]): void {
    this.globalMiddlewares.push(...middlewares);
  }

  public resolveMiddlewares(
    routeMiddlewares: MiddlewareFunction[] = [],
    groupNames: string[] = [],
    conditionalMiddlewares: ConditionalMiddlewareConfig[] = []
  ): MiddlewareFunction[] {
    const resolvedMiddlewares: MiddlewareFunction[] = [
      ...this.globalMiddlewares,
      ...this.resolveGroupMiddlewares(groupNames),
      ...routeMiddlewares,
      this.createConditionalMiddlewareHandler(conditionalMiddlewares)
    ];

    return resolvedMiddlewares;
  }

  private resolveGroupMiddlewares(groupNames: string[]): MiddlewareFunction[] {
    return groupNames
      .map(name => this.groups.get(name))
      .filter((group): group is MiddlewareGroup => group !== undefined)
      .sort((a, b) => (b.priority || 0) - (a.priority || 0))
      .flatMap(group => group.middlewares);
  }

  private createConditionalMiddlewareHandler(
    conditionalMiddlewares: ConditionalMiddlewareConfig[]
  ): MiddlewareFunction {
    return async (req, res, next) => {
      try {
        for (const { middleware, condition } of conditionalMiddlewares) {
          if (await condition(req)) {
            await middleware(req, res, () => {});
          }
        }
        next();
      } catch (error) {
        next(error);
      }
    };
  }
}
