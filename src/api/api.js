/**
 * 请求路径必须以 API_开头
 */
//测试 以下为接口事例代码 ，请参照此处接口url的编写
// import { projectName} from '@/services/config'
const projectName ='/taxweb';

export const API_SHOUQUAN = projectName+ "/oauth/sso/wechat/getAuthorizeUrl";

export const API_Login = projectName+ "/tax/employee/relaEmployee";

// 3.2.4.获取员工信息
export const API_GetMan = projectName+ "/tax/employee/getEmployee";


// 3.2.4.获取私属员工信息
export const API_GetNew = projectName+ "/tax/employee/getSubEmployee";

// 3.2.5.获取通知结算单（新通知）（销售员/团长）
export const API_GetBill = projectName+ "/tax/insuranceBill/getInsuranceBillsByEmployeeIdAtNotice";

// 3.2.5.获取获取我的结算单（销售员/团长）
export const API_MyBill = projectName+ "/tax/insuranceBill/getInsuranceBillsByEmployeeIdAtMyBills";

// 3.2.7.删除私属人员（销售员）
export const API_DelNew = projectName+ "/tax/employee/deleteEmployee";
                                        
// 3.2.8.获取结算单详细信息（销售员/团长）
export const API_TeamBill = projectName+ "/tax/insuranceBill/getInsuranceBillDetail";

// 3.2.4.注销当前用户oppeid关联的员工信息
export const API_ZhuXiao = projectName+ "/tax/employee/cancelRelaEmployee";

// 3.2.10.（新建结算单）获取所有保险公司
export const API_AddBao = projectName+ "/tax/insurance/getInsurances";

//3.2.11.（新建结算单）获取所有正式员工信息（本单业务员选择）
export const API_AddMan = projectName+ "/tax/employee/getAllRegularEmployees";


// 3.2.12.（新建结算单）人员选择（选择）
export const API_AddSuperMan = projectName+ "/tax/employee/getRegularEmployeeAndSubEmployee";

// 3.2.13.（新建结算单）移动端保存/更新结算单（调整确认/保存结算单）
export const API_UpdateMan = projectName+ "/tax/insuranceBill/saveAndFlushInsuranceBill";

// 3.2.14.（新建结算单）调整结算单分配
export const API_EditMan = projectName+ "/tax/insuranceBill/trimInsuranceBill";

// 3.2.15.（新建结算单/待提交结算单）提交结算单 
export const API_UpdateInsuranceBillStatus = projectName+ "/tax/insuranceBill/updateInsuranceBillStatus";

// 3.2.16.（待提交）获取待提交结算单 这个是和上面的一个接口一样的

// 3.2.17.（待提交）删除待提交结算单
export const API_DeleteInsuranceBill = projectName+ "/tax/insuranceBill/deleteInsuranceBill";

// 3.2.18.（团队配置-新建私属成员）保存/更新私属员工信息
export const API_saveBill = projectName+ "/tax/employee/save";

// 3.2.19.（团队配置-添加团队成员）获取无所属正式员工信息
export const API_getOwner = projectName+ "/tax/employee/getOwnershipEmployees";

// 3.2.20.（团队配置-添加团队成员）关联无所属正式员工信息
export const API_sendOwner = projectName+ "/tax/employee/relaOwnershipEmployees";

// 3.2.21.（团队结算单）获取团队结算单
export const API_getTeamInsuranceBills = projectName+ "/tax/insuranceBill/getTeamInsuranceBills";

// 3.2.22.上传头像接口
export const API_uploadImg = projectName+ "/tax/pictureUpload";

// 3.2.23.（团队配置-团队成员）获取团队信息
export const API_getTeamInfo = projectName+ "/tax/team/getTeamInfo";

// 3.2.24.（新建结算单）保存结算单（保存结算单）
export const API_sureBill = projectName+ "/tax/insuranceBill/saveBill";




