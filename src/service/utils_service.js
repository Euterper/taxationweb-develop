/**
 * @param arr 查找数组
 * @param property 查找属性
 * @param value 查找值
 * @des:查找到值后返回其值
 */
export function findArrayReturnValue(arr,property,value,findKey){
    let len,
        findValue;
    if(!Array.isArray(arr)){
        return;
    }
    len = arr.length;
    for (var i = 0; i<len; i++){
        if(arr[i].hasOwnProperty(property) && arr[i][property] == value && arr[i].hasOwnProperty(findKey)){
            findValue = arr[i][findKey];
            break;
        }
    }
    return findValue;
}