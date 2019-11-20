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
            "insuranceName": "平安财险",
            "insuranceNum": "1049500390532305964",
            "price":"@natural(1000, 5000)",
            "peopleNum":"@natural(1, 8)",
            "status":"@natural(1, 4)",
            "time":'@natural(1200, 1230)'
        })
    }
    return data;
}

Mock.mock('/mock/newAbout', 'post', getData());
