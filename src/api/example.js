import { fetchPost, fetchGet,fetchUpload } from '@/api/fetch'
import {API_sureBill,API_getTeamInfo,API_getTeamInsuranceBills ,API_sendOwner,API_getOwner ,API_uploadImg,API_saveBill,API_DeleteInsuranceBill ,API_UpdateInsuranceBillStatus,API_SHOUQUAN ,API_Login,API_GetMan,API_GetNew,API_GetBill,API_MyBill,API_DelNew,API_ZhuXiao,API_TeamBill,API_AddBao,API_AddMan,API_AddSuperMan,API_UpdateMan,API_EditMan} from '@/api/api'

/**
 * [apiTestQuery 事例接口]
 * @return {[type]} [description]
 * 在别的页面应用方法如下：
 * import { apiTestQuery} from "@/api/example"

 * apiShouQuan({
                companyid:this.session.companyid
            }).then((resp) => {}
 */

// 授权
export function apiShouQuan(paramter){
   return fetchGet(API_SHOUQUAN, paramter,true);  
}

// 登录
export function apiLogining(paramter){
   return fetchPost(API_Login, paramter,true);  
}

// 获取员工信息  apiGetnews
export function apiGetMan(paramter){
   return fetchPost(API_GetMan, paramter);  
}

// 获取私属员工信息  
export function apiGetnews(paramter){
   return fetchPost(API_GetNew, paramter,true);  
}

// 获取通知结算单（新通知）（销售员/团长）  
export function apiGetBill(paramter){
   return fetchPost(API_GetBill, paramter,true);  
}

// 3.2.6.获取我的结算单（销售员/团长）
export function apiGetMyBill(paramter){
   return fetchPost(API_MyBill, paramter,true);  
}

// 3.2.7.删除私属人员（销售员）
export function apiDelNew(paramter){
   return fetchPost(API_DelNew, paramter,true);  
}

// 3.2.4.注销当前用户oppein关联的员工信息
export function apiZhuXiao(paramter){
   return fetchPost(API_ZhuXiao, paramter,true);  
}

// 3.2.8.获取结算单详细信息（销售员/团长）
export function apiTeamBill(paramter){
   return fetchPost(API_TeamBill, paramter,true);  
}

// 3.2.10.（新建结算单）获取所有保险公司
export function apiAddBao(paramter){
   return fetchPost(API_AddBao, paramter);  
}

// 3.2.11.（新建结算单）获取所有正式员工信息（本单业务员选择）
export function apiAddMan(paramter){
   return fetchPost(API_AddMan, paramter);  
}

// API_AddSuperMan （新建结算单）人员选择（选择）结算人员
export function apiAddSuperMan(paramter){
   return fetchPost(API_AddSuperMan, paramter,true);  
}

//  （新建结算单）移动端保存/更新结算单（调整确认/保存结算单）
export function apiUpdateMan(paramter){
   return fetchPost(API_UpdateMan, paramter,true);  
}

// API_EditMan	 （新建结算单）调整结算单分配
export function apiEditMan(paramter){
   return fetchPost(API_EditMan, paramter,true);  
}

//3.2.15.（新建结算单/待提交结算单）提交结算单
export function UpdateInsuranceBillStatus(paramter){
   return fetchPost(API_UpdateInsuranceBillStatus, paramter,true);  
}

//3.2.15.（新建结算单/待提交结算单）提交结算单
export function DeleteInsuranceBill(paramter){
   return fetchPost(API_DeleteInsuranceBill, paramter,true);  
}
//3.2.18.（团队配置-新建私属成员）保存/更新私属员工信息API_saveBill
export function SaveBill(paramter){
   return fetchPost(API_saveBill, paramter,true);  
}

// 3.2.19.（团队配置-添加团队成员）获取无所属正式员工信息
export function getOwner(paramter){
   return fetchPost(API_getOwner, paramter,true);  
}

// 3.2.20.（团队配置-添加团队成员）关联无所属正式员工信息
export function sendOwner(paramter){
   return fetchPost(API_sendOwner, paramter,true);  
}

// 3.2.21.（团队结算单）获取团队结算单
export function getTeamInsuranceBills(paramter){
   return fetchPost(API_getTeamInsuranceBills, paramter,true);  
}

//3.2.22.上传头像接口
export function UploadImg(paramter){
   return fetchUpload(API_uploadImg, paramter,true);  
}

//3.2.23.（团队配置-团队成员）获取团队信息
export function GetTeamInfo(paramter){
   return fetchPost(API_getTeamInfo, paramter,true);  
}

//3.2.23.（团队配置-团队成员）获取团队信息
export function sureBill(paramter){
   return fetchPost(API_sureBill, paramter,true);  
}