/**
 * 用户 Service
 */
import BaseService from '../common/baseService';
import { Service, Execute, Transaction } from '../common/decorator/service';
import UserDao from '../dao/userDao';
import RoleDao from '../dao/roleDao';

@Service
export default class UserService extends BaseService{
    static ddd: string = 'ddd'
    
    @Execute
    static async findUsers () {
        return await UserDao.queryUsers(this.connection);
    }

    
    static async findUserById (id: string) {
        return await UserDao.queryUserById(this.connection, id);
    }

    static async findUserWithRoles (id: string) {
        const user = await UserDao.queryUserById(this.connection, id);
        if (user) {
            user.roles = await RoleDao.queryRolesByUserId(this.connection, id);
        }
        return user;
    }

    @Transaction
    static async updateUserRoleRelations (userId: string, roleIds: string[]) {
        const oldRoleIds: string[] = await UserDao.queryUserRoleIds(this.connection, userId);
        const newRoleIds: string[] = roleIds || [];
        // 新增的角色数组
        const addList: string[] = [];
        // 移除的角色数组
        const removeList: string[] = [];
        newRoleIds.forEach((roleId: string) => {
            if (oldRoleIds.indexOf(roleId) === -1) {
                addList.push(roleId);
            }
        });
        oldRoleIds.forEach((roleId: string) => {
            if (newRoleIds.indexOf(roleId) === -1) {
                removeList.push(roleId);
            }
        });

        if (addList.length > 0) {
            await UserDao.insertUserRoleRelations(this.connection, userId, addList);
        }
        if (removeList.length > 0) {
            await UserDao.deleteUserRoleRelations(this.connection, userId, removeList);
        }
    }
}
