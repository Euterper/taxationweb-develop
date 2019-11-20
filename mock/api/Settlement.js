var Mock = require('mockjs')
var Random = Mock.Random;

export function getData() {
    var data = {
        code: 200,
        rows: [],
        message: '获取列表成功',
    }
    var len = 3; //随机生成的数据量
    for (var i = 0; i < len; i++) {
        data.rows.push({
            "id": i + 1,
            "name": "@cname",
            "img": '@image()',
            "num": "@natural(1000, 1009)",
            "isDisplay": false,
            "child|3": [{
                "id": i + 1,
                "name": "@cname",
                "img": '@image()',
                "num": "@natural(1000, 1009)"
            }]
        })
    }
    return data;
}

Mock.mock('/mock/Settlement', 'post', getData());