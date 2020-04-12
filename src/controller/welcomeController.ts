/**
 * 欢迎 Controler
 */
import Koa from 'koa';
import { Controller, Get } from '../common/decorator/controller';

@Controller()
export default class WelcomeController {
    /**
     * 根路径欢迎信息
     * @param ctx 上下文
     */
    @Get('/')
    static async welcome (ctx: Koa.Context) {
        ctx.body = {
            msg: '欢迎使用Node Server Decorator Demo API!'
        };
    }
}
