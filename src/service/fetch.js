import axios from "axios";
//使用假数据
const isRealData = false; //true 真实接口 false请求假数据
// 封装axios的post请求
export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        if(isRealData){
            axios.post(url, params).then(response => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        }else{
            axios.post(url, params).then(response => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        }
    })
}
export default {
    MockData(url, params) {
        return fetch(url, params);
    }
}