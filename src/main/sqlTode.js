
const fs = require('fs');
const fsPromise = fs.promises;
const fileTo = require('./ftlToRAR.js');


module.exports = {
    likeSelect(value, factor) {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * from src_table WHERE ${factor} LIKE '%${value}%'`
            // let sqlQuery = `SELECT * from src_table`
            console.log(sqlQuery)
            fileTo.intoSql(sqlQuery, function (err, result) {
                if (err) {
                    console.log('err:' + err)
                    reject(err)
                }
                // console.log(result)
                resolve(result);
            })
        }).catch((error) => {
            console.log('err:' + error)
        })
    },
    //批量删除
    anyDelete(value) {
        return new Promise((resolve, reject) => {
            let sqlQuery = `delete from src_table where origin_name in (  ?  ) `
            console.log(sqlQuery)
            fileTo.intoSql(sqlQuery, [value], function (err, result) {
                if (err) {
                    console.log('err:' + err)
                    reject(err)
                }
                console.log(result)
                resolve(result);
            })
        }).catch((error) => {
            console.log('err:' + error)
        })
    },
    // 全量查询
    allSelect(tableName) {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * from ${tableName}`
            // let sqlQuery = `SELECT * from src_table`
            console.log(sqlQuery)
            fileTo.intoSql(sqlQuery, function (err, result) {
                if (err) {
                    console.log('err:' + err)
                    reject(err)
                }
                // console.log(result)
                resolve(result);
            })
        }).catch((error) => {
            console.log('err:' + error)
        })
    },
};