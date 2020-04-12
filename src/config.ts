/**
 * 配置文件
 */
interface MysqlConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    connectionLimit: number;
    queueLimit: number;
}

interface Config {
    port: number;
    mysql: MysqlConfig;
}

const config: Config = {
    // 服务端口号
    port: 3000,
    // mysql数据库配置
    mysql: {
        // 主机
        host: 'localhost',
        // 端口
        port: 3306,
        // 用户名
        user: 'root',
        // 密码
        password: 'root',
        // 数据库名
        database: 'server-demo-mysql',
        // 连接池允许创建的最大连接数，默认值为10
        connectionLimit: 2,
        // 允许挂起的最大连接数,默认值为0,代表挂起的连接数无限制
        queueLimit: 0
    }
};

export default config;
