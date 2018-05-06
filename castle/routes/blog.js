const fs = require('then-fs')
    , path = require('path')
    , COMPONENT = path.join('./blogs')

/**
 * @description 读取文件
 * @returns { Promise<Array> } 获取文件数据 
 */
function getBlogs() {
    return fs.readdir(COMPONENT).then( files => {
        // all_files_loadings 是一个 Promise构成的数组
        // 其元素是 Promise 蕴含的值是 `文本数据` 
        let all_files_loadings = files.map( file => {
            return fs.readFile(`${COMPONENT}/${file}`,'utf-8')
        });
        
        
        // [Promise<String>] => [String]
        return Promise.all(all_files_loadings);
    })
}

module.exports = getBlogs;