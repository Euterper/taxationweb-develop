var Mock = require('mockjs')
var Random = Mock.Random;

export function getData() {
    var data = {
        code: 200,
        rows: [],
        message: '获取列表成功',
    }
    var len = 6;//随机生成的数据量
    for (var i = 0; i < len; i++) {
        data.rows.push({
            "id": i + 1,
            "payName": "张晓明",
            "getName": "孙尚香",
            "price1":"3000",
            "price2":"0",
            "price3":"3000",
            "time":'0322'
        })
    }
    return data;
}

Mock.mock('/mock/accountList', 'post', getData());
