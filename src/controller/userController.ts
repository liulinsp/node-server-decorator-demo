/**
 * 用户 Controler
 */
import Koa from 'koa';
import { Controller, Get, Put } from '../common/decorator/controller';
import UserService from '../service/userService';

@Controller('/users')
export default class UserController {
    /**
     * 获取所有用户
     * @param ctx 上下文
     * @return {Promise.<Array<User>>}
     */
    @Get()
    static async getUsers (ctx: Koa.Context) {
        const users = await UserService.findUsers();
        ctx.body = users;
    }

    /**
     * 根据ID获取所有用户
     * @param ctx 上下文
     * @return {Promise.<User>}
     */
    @Get('/:id')
    static async getUserById (ctx: Koa.Context) {
        // 用户ID
        const id = ctx.params.id;
        // 是否包含用户角色信息，如果withRoles 为 "1" 表示需要包含角色信息
        const withRoles = ctx.query.withRoles;

        console.log('id =', id);
        console.log('withRoles =', withRoles);

        let user;
        if (withRoles === '1') {
            user = await UserService.findUserWithRoles(id);
        } else {
            user = await UserService.findUserById(id);
        }
        if (user) {
            ctx.body = user;
        } else {
            ctx.body = {
                code: 1004,
                msg: '用户不存在!'
            }
        }
    }

    /**
     * 更新用户的角色
     * @param ctx
     * @return {Promise.<void>}
     */
    @Put('/:userId/roles')
    static async updateUserRoleRelations (ctx: Koa.Context) {
        const userId = ctx.params.userId;
        const roleIds = ctx.request.body.roleIds;
        console.log('userId=', userId);
        console.log('roleIds=', roleIds);

        await UserService.updateUserRoleRelations(userId, roleIds);
        ctx.body = {
            msg: '操作成功'
        };
    }
}
