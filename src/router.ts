/**
 * 路由
 */
import path from 'path';
import ScanRouter from './common/scanRouter';

const router = new ScanRouter();

router.scan([path.resolve(__dirname, './controller')]);

export default router;

// 获取所有用户
// http://localhost:3000/users/

// 获取指定ID的用户
// http://localhost:3000/users/3571a123-0454-49b4-a2bc-8b30a37f0b14
// http://localhost:3000/users/3571a123-0454-49b4-a2bc-8b30a37f0b14?withRoles=1

// 更新指定用户的角色列表
// http://localhost:3000/users/3571a123-0454-49b4-a2bc-8b30a37f0b14/roles
// { "roleIds": [ "7e8627d9-dc78-414b-b9ca-233911f8d7ec", "21be076f-f668-4880-8812-99b56bc56413" ] }

// 获取所有角色
// http://localhost:3000/roles/

// 获取指定ID的角色
// http://localhost:3000/roles/21be076f-f668-4880-8812-99b56bc56413



