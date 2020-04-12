/**
 * 异常处理中间件
 */
import Koa from 'koa';

export default function errorHandle (): Koa.Middleware {
    return async(ctx: Koa.Context, next: Koa.Next) => {
        try {
            await next();
            if (ctx.status === 404) {
                ctx.status = 404;
                ctx.body = {
                    code: 404,
                    msg: '请求地址不存在'
                };
            } else if (ctx.status === 405) {
                ctx.status = 405;
                ctx.body = {
                    code: 405,
                    msg: `${ctx.method} ${ctx.originalUrl} 方法不允许`
                };
            }
        } catch (error) {
            console.error(`${ctx.method} ${ctx.originalUrl} 响应异常!\n`, error);
            ctx.status = 500;
            ctx.body = {
                code: 500,
                msg: '系统异常'
            };
        }
    };
}
