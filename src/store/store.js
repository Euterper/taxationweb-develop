import app from './modules/app.js'
import user from './modules/user.js'
import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app,
        user,
    },
    state: {
        pageStatus: 1,
        loginStatus: 1,
        ownName:'',
        employeeId:'',
        teamName:'',          // 所属团队名字
        entryDate:'',       // 日期
        employeeSex:'',    // 性别
        employeePhone:'',  // 手机号码
        bankCard:'', // 银行卡号
        bankName:'', // 开户银行
        identityCard:'', // 身份证号码
        tiaozhengList:[],
        systemBillId:'',
        workerList:[],
        isRouterAlived:true
    }
})

export default store