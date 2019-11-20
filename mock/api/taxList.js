var Mock = require('mockjs')
var Random = Mock.Random;

export function getData() {
    var data = {
        code: 200,
        rows: [],
        message: '获取列表成功',
    }
    var len = 10;//随机生成的数据量
    for (var i = 0; i < len; i++) {
        data.rows.push({
            "id": i + 1,
            "time":"@natural(1, 30)",
            "price1":"@natural(1000, 5000)",
            "price2":"@natural(1000, 5000)",
            "price3":"@natural(1000, 5000)",
            "price4":"@natural(1000, 5000)",
            "price5":"@natural(1000, 5000)"
        })
    }
    return data;
}

Mock.mock('/mock/taxList', 'post', getData());
