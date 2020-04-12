/**
 * 用户 Dao
 */
import { query, queryOne, insert, del } from '../db/curd';
import { Connection } from 'mysql';
import { stringify } from 'querystring';

export default class UserDao {
    /**
     * 根据用户ID查询用户信息
     * @param connection 数据库连接
     * @param id 用户ID
     * @return {Promise.<User>} 用户信息
     */
    static async queryUserById (connection: Connection, id: string): Promise<any> {
        const sql: string = `SELECT user.id, user.account, user.name, user.email, user.phone,
                          user.birthday, user.enable, user.deleteFlag, user.createTime,
                          user.updateTime
                   FROM sys_user user
                   WHERE user.id = ?`;
        const user: any = await queryOne(connection, sql, id);
        return user;
    }

    /**
     * 查询所有用户信息
     * @param connection 数据库连接
     * @return {Promise.<Array>} 用户信息数组
     */
    static async queryUsers (connection: Connection): Promise<any[]> {
        const sql: string = `SELECT user.id, user.account, user.name, user.email, user.phone,
                          user.birthday, user.enable, user.deleteFlag, user.createTime, 
                          user.updateTime
                   FROM sys_user user
                   WHERE user.deleteFlag = ?`;
        const list: any[] = await query(connection, sql, [0]);
        // await new Promise( resolve => setTimeout(() => resolve(), 5000));
        return list;
    }

    /**
     * 根据用户ID查询
     * @param connection
     * @param userId
     * @return {Promise.<Array<String>>}
     */
    static async queryUserRoleIds (connection: Connection, userId: string): Promise<string[]> {
        const querySql: string = `SELECT roleId, userId FROM sys_r_user_role WHERE userId = ?`;
        const list: any[] = await query(connection, querySql, userId);
        const roleIds: string[] = list.map(item => item.roleId);
        return roleIds;
    }

    /**
     * 增加用户与角色的关联关系
     * @param connection 数据库连接
     * @param userId 用户ID
     * @param roleIds 角色ID数组
     * @return {Promise.<void>}
     */
    static async insertUserRoleRelations (connection: Connection, userId: string, roleIds: string[]): Promise<void> {
        const sql: string = `INSERT INTO sys_r_user_role(roleId, userId) VALUES (?, ?)`;
        let i: number, roleId: string;
        for (i = 0; i < roleIds.length; i++) {
            roleId = roleIds[i];
            await insert(connection, sql, [ roleId, userId ], true);
        }
    }

    /**
     * 删除用户与角色的关联关系
     * @param connection 数据库连接
     * @param userId 用户ID
     * @param roleIds 角色ID数组
     * @return {Promise.<void>}
     */
    static async deleteUserRoleRelations (connection: Connection, userId: string, roleIds: string[]): Promise<void> {
        const sql = `DELETE FROM sys_r_user_role WHERE roleId = ? AND  userId = ?`;
        let i: number, roleId: string;
        for (i = 0; i < roleIds.length; i++) {
            roleId = roleIds[i];
            await del(connection, sql, [roleId, userId]);
        }
    }
}
