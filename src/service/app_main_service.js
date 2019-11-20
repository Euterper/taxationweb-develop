import { findArrayReturnValue} from './utils_service.js'
/**
 * [getSendSmsState 获取短信发送状态]
 * @return {[type]} [description]
 */
export function getSettlementStatus(type,id) {
    let arr = [
        { status: 1, statusName: '已结算' },
        { status: 2, statusName: '未提交' },
        { status: 3, statusName: '未调整' },
        { status: 4, statusName: '已作废' }
    ]
    switch (type) {
        case 1:
            return arr;
        case 2:
            return findArrayReturnValue(arr,"status",id,"statusName");
        case 3:
            return findArrayReturnValue(arr,"status",id,"color");
        default:
            return arr;
    }
}