/**
 * 数据库连接池
 */
import mysql, { Connection } from 'mysql';
import config from '../config';

// 创建数据库连接池
const pool: mysql.Pool = mysql.createPool(config.mysql);

pool.on('acquire', (connection: Connection) => {
    console.log(`获取数据库连接 [${connection.threadId}]`);
});
pool.on('connection', (connection: Connection) => {
    console.log(`创建数据库连接 [${connection.threadId}]`);
});
pool.on('enqueue', () => {
    console.log('正在等待可用数据库连接');
});
pool.on('release', (connection: Connection) => {
    console.log(`数据库连接 [${connection.threadId}] 已释放`);
});

export default pool;