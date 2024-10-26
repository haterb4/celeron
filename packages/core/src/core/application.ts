import 'reflect-metadata';
import express, { Express } from 'express';
import { Container } from '../di/container';
import { Router } from './router';
import { MiddlewareManager } from './middleware-manager';
import { MiddlewareGroup } from '../types/middleware.types';
import { glob } from 'glob';
import { Constructor } from '../types/common.types';
import path from 'path';
import { MetadataKeys } from '../constants/metadata.keys';

export interface ApplicationOptions {
  controllersPath?: string;
  middlewareGroups?: MiddlewareGroup[];
  globalMiddlewares?: any[];
}

export class Application {
  private app: Express;
  private router: Router;
  private middlewareManager: MiddlewareManager;
  private options: ApplicationOptions;

  constructor(options: ApplicationOptions = {}) {
    this.options = {
      controllersPath: 'src/controllers',
      ...options
    };

    this.app = express();
    this.middlewareManager = new MiddlewareManager();
    this.router = new Router(this.middlewareManager);
    
    this.initializeMiddlewares();
    Container.initialize();
  }

  private initializeMiddlewares(): void {
    // Middlewares de base
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Middlewares globaux
    if (this.options.globalMiddlewares) {
      this.middlewareManager.addGlobalMiddleware(...this.options.globalMiddlewares);
    }

    // Groupes de middleware
    if (this.options.middlewareGroups) {
      this.options.middlewareGroups.forEach(group => {
        this.middlewareManager.addGroup(group);
      });
    }
  }

  public addMiddlewareGroup(group: MiddlewareGroup): void {
    this.middlewareManager.addGroup(group);
  }

  private async loadControllers(): Promise<void> {
    const controllersPath = path.join(process.cwd(), this.options.controllersPath!, '**/*.controller.{ts,js}');
    const controllerFiles = await glob(controllersPath);

    for (const file of controllerFiles) {
      try {
        const controllerModule = await import(file);
        const ControllerClass = Object.values(controllerModule)[0] as Constructor;

        if (Reflect.getMetadata(MetadataKeys.IS_CONTROLLER, ControllerClass)) {
          Container.register(ControllerClass.name, ControllerClass);
          this.router.registerController(ControllerClass);
        }
      } catch (error) {
        console.error(`Error loading controller from ${file}:`, error);
      }
    }
  }

  public async start(port: number = 3000): Promise<void> {
    await this.loadControllers();
    this.app.use(this.router.getRouter());

    // Gestionnaire d'erreurs global
    this.app.use((err: any, req: any, res: any, next: any) => {
      console.error(err);
      res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
      });
    });

    return new Promise((resolve) => {
        this.app.listen(port, () => {
          console.log(`🚀 Celeron application running on port ${port}`);
          resolve();
        });
      });
    }
  
    public getExpressApp(): Express {
      return this.app;
    }
  
    public getRouter(): Router {
      return this.router;
    }
}