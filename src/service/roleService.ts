/**
 * 角色 Service
 */
import BaseService from '../common/baseService';
import { Service }  from '../common/decorator/service';
import RoleDao from '../dao/roleDao';

@Service
export default class RoleService extends BaseService{

    static async findRoles() {
        return await RoleDao.queryRoles(this.connection);
    }

    static async findRoleById(id: string) {
        return await RoleDao.queryRoleById(this.connection, id);
    }
}
