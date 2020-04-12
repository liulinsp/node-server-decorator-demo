/**
 * 角色 Controler
 */
import Koa from 'koa';
import { Controller, Get } from '../common/decorator/controller';
import RoleService from '../service/roleService';

@Controller()
export default class RoleController {

    @Get('/roles')
    static async getRoles (ctx: Koa.Context) {
        const roles = await RoleService.findRoles();
        ctx.body = roles;
    }

    @Get('/roles/:id')
    static async getRoleById (ctx: Koa.Context) {
        const id = ctx.params.id;
        console.log('id=', id);
        const role = await RoleService.findRoleById(id);
        ctx.body = role;
    }
}
