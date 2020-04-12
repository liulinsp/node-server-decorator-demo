/**
 * 数据库
 */
const { execute, executeTransaction } = require('./execute');
const { query, queryOne, insert, update, del } = require('./curd');

module.exports = {
    execute,
    executeTransaction,
    query,
    queryOne,
    insert,
    update,
    del
};