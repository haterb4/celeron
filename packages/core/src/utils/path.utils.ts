import path from 'path';

export class PathUtils {
  static normalizePath(pathStr: string): string {
    return path.normalize(pathStr).replace(/\\/g, '/');
  }

  static joinPaths(...paths: string[]): string {
    return path.join(...paths).replace(/\\/g, '/');
  }

  static getControllerPath(controllerPath: string): string {
    return this.normalizePath(path.join(process.cwd(), controllerPath));
  }
}