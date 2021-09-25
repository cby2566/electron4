const fs = require("fs");
const path = require('path');
const mysql = require('mysql');
const config = require('./config');
// 导出

module.exports = {
    //封装重命名函数,重命名文件后缀
    insertSql(keys,values){
        // 连接信息
        const connection = mysql.createConnection(config);
        // 建立连接
        connection.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            console.log('connected as id ' + connection.threadId);
        });
    
        // 批量插入
        //执行sql   第二个参数要加"[]"
        // let arr1 = ['author','biz_name','origin_name','other','url'].join()
            
        let userAddSql = `INSERT INTO src_table(${keys}) VALUES ? `;
        let query = connection.query(userAddSql,[values],function (err, result) {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            }
        });
        console.log(query)
    
        connection.end();
    },
    intoSql(sql_key,fn){
        // 连接信息
        const connection = mysql.createConnection(config);
        // 建立连接
        connection.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            console.log('connected as id ' + connection.threadId);
        });
    
        // 执行查询
        connection.query(sql_key,fn);
    
        connection.end();
    }
}