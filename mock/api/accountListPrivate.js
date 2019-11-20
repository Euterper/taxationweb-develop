var Mock = require('mockjs')
var Random = Mock.Random;

export function getData() {
    var data = {       
            "type": "应付",
            "name": "孙尚香",
            "price1":"2000",
            "price2":"0",
            "price3":"3000",
            "time":'0322'
    }   
    return data;
}

export function getData1() {
    var data = {       
            "type": "应付",
            "name": "孙尚香",
            "price1":"2000",
            "price2":"0",
            "price3":"3000",
            "time":'0322'
    }   
    return data;
}

Mock.mock('/mock/accountListPrivate', 'post', getData());
Mock.mock('/mock/accountListPrivate1', 'post', getData1());
