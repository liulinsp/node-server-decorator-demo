/**
 * 自动扫描路由
 */
import fs from 'fs';
import path from 'path';
import KoaRouter from 'koa-router';
import { Route } from './decorator/controller';

/**
 * 扫描指定目录的Controller并添加路由
 * @param dirPath 扫描的目录
 * @param router 路由对象
 */
// 扫描指定目录的Controller并添加路由
function scanController(dirPath: string, router: KoaRouter): void {
    if (!fs.existsSync(dirPath)) {
        console.warn(`目录不存在！${dirPath}`);
        return;
    }
    const fileNames: string[] = fs.readdirSync(dirPath);

    for (const name of fileNames) {
        const curPath: string = path.join(dirPath, name);
        if (fs.statSync(curPath).isDirectory()) {
            scanController(curPath, router);
            continue;
        }
        if (!(/(.js|.jsx|.ts|.tsx)$/.test(name))) {
            continue;
        }
        try {
            const scannedModule = require(curPath);
            const controller = scannedModule.default || scannedModule;
            const isController: boolean = Reflect.hasMetadata('basePath', controller);
            const hasRoutes: boolean = Reflect.hasMetadata('routes', controller);
            if (isController && hasRoutes) {
                const basePath: string = Reflect.getMetadata('basePath', controller);
                const routes: Route[] = Reflect.getMetadata('routes', controller);
                let curPath: string, curRouteHandler;
                routes.forEach( (route: Route) => {
                    curPath = path.posix.join('/', basePath, route.path);
                    curRouteHandler = controller[route.propertyKey];
                    router[route.method](curPath, curRouteHandler);
                    console.info(`router: ${controller.name}.${route.propertyKey} [${route.method}] ${curPath}`)
                })
            }
        } catch (error) {
            console.warn('文件读取失败！', curPath, error);
        }

    }
}

export default class ScanRouter extends KoaRouter {
    constructor(opt?: KoaRouter.IRouterOptions) {
        super(opt);
    }

    scan (scanDir: string | string[]) {
        if (typeof scanDir === 'string') {
            scanController(scanDir, this);
        } else if (scanDir instanceof Array) {
            scanDir.forEach(async (dir: string) => {
                scanController(dir, this);
            });
        }
    }
}
