/**
 * Service 装饰器
 */
import { PoolConnection } from 'mysql';
import { execute, executeTransaction } from '../../db/execute';

/**
 * Service 类装饰器
 */
export const Service: ClassDecorator = ( target:any ) => {
  const propKeys: string[] = Object.getOwnPropertyNames(target);
  propKeys.forEach((key: string) => {
    const curProp = target[key];
    const isExecute: boolean = Reflect.getMetadata('isExecute', target, key) || false;
    const isTransaction: boolean = Reflect.getMetadata('isTransaction', target, key) || false;
    if (typeof curProp === 'function' && !isTransaction && !isExecute) {
        target[key] = async (...params: any[]) => {
        return await execute(async (connection: PoolConnection) => {
          return await curProp.apply({ connection }, params);
        });
      }
    }
  });
};

/**
 * 普通执行方法装饰器
 */
export const Execute: MethodDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => {
  const oldValue = descriptor.value;
  descriptor.value = async (...params: any[]) => {
    return await execute(async (connection: PoolConnection) => {
      return await oldValue.apply({ connection }, params);
    });
  };
  Reflect.defineMetadata('isExecute', true, target, key);
  return descriptor;
};

/**
 * 事务执行方法装饰器
 */
export const Transaction: MethodDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => {
  const oldValue = descriptor.value;
  descriptor.value = async (...params: any[]) => {
    return await executeTransaction(async (connection: PoolConnection) => {
      return await oldValue.apply({ connection }, params);
    });
  };
  Reflect.defineMetadata('isTransaction', true, target, key);
  return descriptor;
};
