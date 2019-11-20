import Vue from "vue";
import {setToken,getToken,KEYS,setOpenid, getOpenid,removeToken} from "@/service/config"
import Router from "vue-router";
import Store from "@/store/store";
import { getUrlParam } from "@/service/util"
import {apiShouQuan} from "@/api/example"

const index = () =>
    import ("@/views/index.vue");
const TobeSubmitted = () =>
    import ("@/views/TobeSubmitted.vue");
const PersonInfo = () =>
    import ("@/views/PersonInfo.vue");
const SettlementSheet = () =>
    import ("@/views/SettlementSheet.vue");
const SettlementSheetOnly = () =>
    import ("@/views/SettlementSheetOnly.vue");
// const TeamStatement = () => import("@/views/TeamStatement.vue");
const TobeSet = () =>
    import ("@/views/TobeSet.vue");
const Bill = () =>
    import ("@/views/Bill.vue");
const Settlement = () =>
    import ("@/views/Settlement.vue");
const AccountList = () =>
    import ("@/views/AccountList.vue");
const AccountListPrivate = () =>
    import ("@/views/AccountListPrivate.vue");
const BusStatistics = () =>
    import ("@/views/BusStatistics.vue");
const AddTeamMember = () =>
    import ("@/views/AddTeamMember.vue");
const Addme = () =>
    import ("@/views/Addme.vue");
const Allocation = () =>
    import ("@/views/Allocation.vue");
const Login = () =>
    import ("@/views/Login.vue");
const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: "/",
            name: "index",
            component: index,
            describe: "主页",
            meta: {
                keepAlive: false // 不需要被缓存
              }
        },
        {
            path: "/Login",
            name: "Login",
            component: Login,
            describe: "登录",
            meta: {
                keepAlive: true // 需要被缓存
              }

        },
        // 团对长
        {
            path: "/TobeSubmitted",
            name: "TobeSubmitted",
            component: TobeSubmitted,
            describe: "待提交（团队长）",
            meta: {
                keepAlive: false // 不需要被缓存
              }
        },
        // 个人信息
        {
            path: "/PersonInfo",
            name: "PersonInfo",
            component: PersonInfo,
            describe: "个人信息",
            meta: {
                keepAlive: false // 不需要被缓存
              }
        },
        // 新建结算单
        {
            path: "/Bill",
            name: "Bill",
            component: Bill,
            describe: "新建 分配金额",
            meta: {
                keepAlive: true // 需要被缓存
              }
        },
        {
            path: "/TobeSet/:employeeId",
            name: "TobeSet",
            component: TobeSet,
            describe: "首页（团队长）",
            meta: {
                keepAlive: false // 不需要被缓存
              }
        },
        {
            path: "/Addme",
            name: "Addme",
            component: Addme,
            describe: "新增私属人员",
            meta: {
                keepAlive: false // 不需要被缓存
              }
        },
        {
            path: "/Settlement",
            name: "Settlement",
            component: Settlement,
            describe: "团队配置(团长)",
            meta: {
                keepAlive: false // 不需要被缓存
              }
        },
        {
            path: "/AccountList",
            name: "AccountList",
            component: AccountList,
            describe: "我的结算单首页（团队长）",
            meta: {
                keepAlive: false // 不需要被缓存
              }
        },
        {
            path: "/SettlementSheet",
            name: "SettlementSheet",
            component: SettlementSheet,
            describe: "新通知,团队结算单",
            meta: {
                keepAlive: false // 不需要被缓存
              }
        },
        {

            path: "/SettlementSheetOnly",
            name: "SettlementSheetOnly",
            component: SettlementSheetOnly,
            describe: "团队结算单详情",
            meta: {
                keepAlive: false // 不需要被缓存
              }
        },
        {
            path: "/AddTeamMember",
            name: "AddTeamMember",
            component: AddTeamMember,
            describe: "添加团队成员",
            meta: {
                keepAlive: false // 不需要被缓存
              }
        },
        {
            path: "/BusStatistics",
            name: "BusStatistics",
            component: BusStatistics,
            describe: "业绩统计（团队长）",
            meta: {
                keepAlive: false // 不需要被缓存
              }
        },
        {
            path: "/AccountListPrivate",
            name: "AccountListPrivate",
            component: AccountListPrivate,
            describe: "我的结算单（私属成员）",
            meta: {
                keepAlive: false // 不需要被缓存
              }
        },
        {
            path: "/Allocation/:id",
            name: "Allocation",
            component: Allocation,
            describe: "分配调整",
            meta: {
                     keepAlive: false // 不需要被缓存
                   }
        },

    ]
});
router.beforeEach((to, from, next) => {
    if(to.meta.title) {
        document.title = to.meta.describe;    //在路由里面写入的meta里面的title字段
      }
        let  token= getToken();
        if(!!token){
            console.log(to.path,'这是路径');
            console.log(token,'token');  
            next();
            console.log(token,'next');  
        }else{
            let data =JSON.parse(getUrlParam("data")) ;
            if(!!data){
                console.log('无需授权');  
                let token=data.access_token;
                if(!!token){
                    let openid=data.openid;
                    if(!!openid){
                        setOpenid(openid)
                    }
                    setToken(token);
                    next(); 
                }else{
                    let openid=data.openid;
                    console.log(openid,'openid');   
                    setOpenid(openid)
                    //跳转登录页面
                    if(to.path==="/Login"){
                        next();
                    }else{
                        next({
                            path: '/Login'
                            });
                    }  
                }
            }else{
                console.log('微信授权');  
                apiShouQuan({
                    redirect_uri:encodeURIComponent(window.location.origin+"/taxweb/#"+'/Login') //线上部署
                    // redirect_uri:encodeURIComponent(window.location.origin+"/#"+'/Login')//本地调试
                }).then((resp) => {
                    window.location.href=resp;
                    console.log(resp,'redirect_uri');   
                })
            }
            
        }
    }
      );
Vue.use(Router);
export default router;