<template>
  <div class="hello" style="padding-left: 20px;"></div>
</template>
<script>
import { getUrlParam, serialize, getParam } from "@/service/util";
import { setToken, getToken, KEYS, removeToken } from "@/service/config";
import { Dialog, Toast } from "vant";
import { apiLogining, apiGetMan, apiZhuXiao } from "@/api/example";
import Cookies from "js-cookie";
export default {
  name: "index",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.goHome();
  },
  methods: {
    goHome() {
      apiGetMan().then(resp => {
        if (resp.code == 1) {
          console.log(resp, "获取员工信息接口resprespresp=================");
          let data = resp.data[0];

          // ============================
          this.$store.state.ownName = data.employeeName;
          this.$store.state.employeeId = data.employeeId;
          this.$store.state.teamName = data.teamName; // 所属团队名字
          this.$store.state.entryDate = data.entryDate; // 日期
          this.$store.state.employeeSex = data.employeeSex; // 性别
          this.$store.state.employeePhone = data.employeePhone; // 手机号码
          this.$store.state.bankCard = data.bankInfo.bankCard; // 银行卡号
          this.$store.state.bankName = data.bankInfo.bankName; // 开户银行
          this.$store.state.identityCard = data.identityCard; // 身份证号码
          // ================================
          Cookies.set("ownName", data.employeeName); // 团队长名字
          Cookies.set("employeeId", data.employeeId); // 查询需要用到的id
          Cookies.set("teamName", data.teamName); // 所属团队名字
          Cookies.set("entryDate", data.entryDate); // 日期
          Cookies.set("employeeSex", data.employeeSex); // 性别
          Cookies.set("employeePhone", data.employeePhone); // 手机号码 employeePhone
          Cookies.set("bankCard", data.bankInfo.bankCard); // 银行卡号
          Cookies.set("bankName", data.bankInfo.bankName); // 开户银行
          Cookies.set("identityCard", data.identityCard); // 身份证号码
          // ===============================
          this.employeeId = data.employeeId;
          console.log(
            Cookies.get("employeePhone"),
            "Cookies.get(employeePhone),登录login打印的信息"
          );
          console.log(
            Cookies.get("bankCard"),
            "Cookies.get(bankCard),登录login打印的信息"
          );

          console.log(
            this.$store.state.employeeId,
            "this.$store.state.employeeId=========="
          );
          console.log(
            this.$store.state.ownName,
            "this.$store.state.ownName=========="
          );
          let roleType = resp.data[0].roleType;
          if (roleType == "sales") {
            this.toIndex(2);
          } else if (roleType == "teamLeader") {
            this.toIndex(1);
          } else {
            Toast.fail("当前角色不能登录，请联系管理员");
            this.delMan();
            return;
          }
          console.log(roleType, "roleType角色");
          console.log(resp, "获取员工信息接口resprespresp=================");
        }
      });
    },
    toIndex(type) {
      this.$store.state.loginStatus = type;
      this.$router.push({
        path: `/TobeSet/${this.employeeId}`
      });
      // this.$router.push({
      //     name:'TobeSet'
      // })
    },
    delMan() {
      apiZhuXiao().then(resp => {
        if (resp.code == 1) {
          Toast.fail("注销成功");
          removeToken();
          this.$router.push({
            name: "Login"
          });
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  padding: 20px;
  .router-link {
    // font-size: 18px;
    font-size: 25px;
  }
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.page {
  border: 2px solid #000;
  margin: 5px auto;
  padding: 2px 10px;
  width: 600px;
  height: 75px;
  float: left;
  text-align: center;
  border-radius: 50px;
  background: -webkit-linear-gradient(
    left,
    #4d67f7,
    #e59ab6
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #4d67f7,
    #e59ab6
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    #4d67f7,
    #e59ab6
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #4d67f7, #e59ab6); /* 标准的语法 */
  p {
    color: #fff;
    font-weight: bold;
    font-size: 28px;
  }
}
</style>
