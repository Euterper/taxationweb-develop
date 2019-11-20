<template>
  <div class="login">
    <van-cell-group>
      <van-field
        v-model.trim="username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />

      <van-field v-model.trim="password" type="password" label="密码" placeholder="请输入密码" required />
    </van-cell-group>
    <div class="btn">
      <van-button class="login_btn" type="primary" size="large" @click="login()">登录</van-button>
      <van-button class="forget_password" plain type="primary" size="large">忘记密码</van-button>
      <!-- <van-button class="test_btn" type="danger" @click="toIndex(1)">团队长(测试)</van-button>
      <van-button class="test_btn" type="danger" @click="toIndex(2)">销售员(测试)</van-button>-->
      <!-- <van-button class="test_btn" type="danger" @click="delMan()">注销(测试)</van-button> -->
    </div>
  </div>
</template>
<script>
import {
  setToken,
  getToken,
  KEYS,
  getParam,
  removeToken,
  getOpenid
} from "@/service/config";
import { getUrlParam } from "@/service/util";
import { Dialog, Toast } from "vant";
import { apiLogining, apiGetMan, apiZhuXiao } from "@/api/example";
import Cookies from "js-cookie";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      employeeId: "",
      username: "",
      password: ""
    };
  },
  created() {
    document.title = "登录";
  },
  mounted() {
    this.go();
  },
  methods: {
    delMan() {
      apiZhuXiao().then(resp => {
        if (resp.code == 1) {
          Toast.fail("注销成功");
        }
      });
    },
    login() {
      //

      if (!this.username) {
        Toast.fail("请输入账号");
        return;
      }
      if (!this.password) {
        Toast.fail("请输入密码");
        return;
      }
      let open_id = getOpenid();
      apiLogining({
        openid: open_id,
        username: this.username,
        password: this.password
      }).then(resp => {
        if (resp.code == 1) {
          let access_token = resp.data[0].access_token;
          console.log(access_token, "access_token");
          setToken(access_token);
          apiGetMan().then(resp => {
            if (resp.code == 1) {
              console.log(
                resp,
                "获取员工信息接口resprespresp================="
              );
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
              console.log(
                resp,
                "获取员工信息接口resprespresp================="
              );
            } else {
              Toast.fail("账号或者密码错误.");
            }
          });
        } else {
          console.log(resp.message, "messagemessagemessage0");
        }
      });
    },
    go() {},
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


<style scoped lang="scss">
.login {
  margin-top: 20px;
  .van-cell-group {
    padding: 5px 20px;
    .van-cell {
      height: 80px;
      line-height: 80px;
      font-size: 28px;
    }
    .van-cell:nth-child(1) {
      border-bottom: 1px solid #ccc;
    }
  }
}
.btn {
  padding: 10px 20px;
  text-align: center;
  .login_btn {
    margin: 20px 0;
    height: 80px;
    font-size: 34px;
    font-weight: bold;
  }
  .forget_password {
    height: 80px;
    font-size: 34px;
    font-weight: bold;
    margin-bottom: 50px;
  }
}
.test_btn {
  height: 60px;
  line-height: 60px;
  margin: 30px;
  width: 300px;
  font-size: 32px;
}
</style>
