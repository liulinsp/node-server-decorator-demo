/**
 * Controller 装饰器
 */
export interface Route {
    propertyKey: string,
    method: string;
    path: string;
}

/**
 * Controller 类装饰器工厂
 * @param {string} path 类下面所有路由的跟路径
 * @return {ClassDecorator} 类装饰器
 */
export function Controller(path: string = ''): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata('basePath', path, target);
    }
}


export type RouterDecoratorFactory = (path?: string) => MethodDecorator;

/**
 * 创建路由装饰器工厂
 * @param {string} method 路由method('get'、'post' 等)
 * @return {RouterDecoratorFactory} 路由装饰器工厂
 */
export function createRouterDecorator(method: string): RouterDecoratorFactory {
    return (path?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const route: Route = {
            propertyKey,
            method,
            path: path || ''
        };
        if (!Reflect.hasMetadata('routes', target)) {
            Reflect.defineMetadata('routes', [], target);
        }
        const routes = Reflect.getMetadata('routes', target);
        routes.push(route);
    }
}

// get 方法的路由装饰器工厂
export const Get: RouterDecoratorFactory = createRouterDecorator('get');

// post 方法的路由装饰器工厂
export const Post: RouterDecoratorFactory = createRouterDecorator('post');

// put 方法的路由装饰器工厂
export const Put: RouterDecoratorFactory = createRouterDecorator('put');

// delete 方法的路由装饰器工厂
export const Delete: RouterDecoratorFactory = createRouterDecorator('delete');

// patch 方法的路由装饰器工厂
export const Patch: RouterDecoratorFactory = createRouterDecorator('patch');
