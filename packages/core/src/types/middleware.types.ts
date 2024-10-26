import { Request, Response, NextFunction } from "express";

export interface MiddlewareFunction {
    (req: Request, res: Response, next: NextFunction): Promise<void> | void;
}

export type MiddlewareCondition = (req: Request) => boolean | Promise<boolean>;

export interface ConditionalMiddlewareConfig {
    middleware: MiddlewareFunction;
    condition: MiddlewareCondition;
}
  
export interface MiddlewareGroup {
    name: string;
    middlewares: MiddlewareFunction[];
    priority?: number;
}