<template>
  <div>
    <Header headerName="添加团队成员"></Header>
    <div class="new_content">
      <div class="searInput">
        <input type="text" placeholder="搜索" v-model="searchStr" />
      </div>
    </div>
    <div style="margin-top:140px;">
      <van-loading size="42px" v-show="isLoading" vertical>加载中...</van-loading>
      <van-checkbox-group v-model="result">
        <div class="flexlist" v-for="(item,index) in dataList" :key="index">
          <div class="flexlistimg">
            <img src="../assets/images/imgbg.jpg" />
          </div>
          <div>{{item.employeeName}}</div>
          <div>{{item.employeeId}}</div>
          <div>
            <van-checkbox shape="square" :key="index" :name="item" checked-color="#5A77F7"></van-checkbox>
          </div>
        </div>
      </van-checkbox-group>
    </div>
    <!-- <div class="flexlist">
            <div class="flexlistimg"><img src="../assets/images/imgbg.jpg"></div>
            <div>张三</div>
            <div>A001</div>
            <div><van-checkbox shape="square" v-model="item.checked" checked-color="#5A77F7"></van-checkbox></div>
    </div>-->
    <div class="footerbtn">
      <input type="button" value="确认添加" @click="addSubmit" />
    </div>
  </div>
</template>
<script>
import { getOwner, sendOwner } from "@/api/example";

import Header from "@/components/Header.vue";
import api from "@/service/fetch";
import "../../mock/api/accountListPrivate";
export default {
  name: "AccountListPrivate",
  components: {
    Header
  },
  data() {
    return {
      result: [],
      dataList: [
        //   {index:1,name:'张三',number:'A001',type:'',imgurl:'../assets/images/imgbg.jpg',checked:false},
        //   {index:1,name:'张三',number:'A002',type:'',imgurl:'../assets/images/imgbg.jpg',checked:false},
        //   {index:1,name:'张三',number:'A003',type:'已归属T001',imgurl:'../assets/images/imgbg.jpg',checked:true},
        //   {index:1,name:'张三',number:'A004',type:'',imgurl:'../assets/images/imgbg.jpg',checked:false},
      ],
      checkflag: false,
      searchStr: "",
      isLoading: true
    };
  },
  created() {
    api.MockData("/mock/accountListPrivate").then(res => {
      //this.dataList =res
      //console.log(res,'res')
    });
  },
  mounted() {
    document.title = "保险行业税务计算系统";
    this.getOwnerList();
  },
  methods: {
    getOwnerList() {
      this.dataList = [];
      this.isLoading = true;
      let parmer = {};
      parmer.searchStr = this.searchStr;
      getOwner(parmer).then(resp => {
        console.log(
          resp,
          "3.2.19.（团队配置-添加团队成员）获取无所属正式员工信息===================================="
        );
        this.dataList = resp.data;
        this.isLoading = false;
      });
    },
    addSubmit() {
      console.log(this.result, "this.result==================================");
      let arrey = this.result.map((item, index, input) => {
        return item.employeeId;
      });
      let parmers = {};
      parmers.employeeIds = arrey;
      console.log(arrey, "arrey==================");
      sendOwner(parmers).then(resp => {
        console.log(
          resp,
          "3.2.20.（团队配置-添加团队成员）关联无所属正式员工信息================="
        );
        if (resp.code == 1) {
          this.$router.push({
            name: "Settlement"
          });
        } else {
          Toast.fail(resp.message);
        }
      });
    }
  },
  watch: {
    searchStr: "getOwnerList"
  }
};
</script>
<style scoped lang="scss">
.new_content {
  position: fixed;
  top: 89px;
  width: 100%;
  background: #fff;
  z-index: 1000;
  box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.1);
  .searInput {
    margin: 13px 50px 40px;
    padding: 0 25px;
    background-color: #eef2fb;
    border-radius: 20px;
    height: 70px;
    line-height: 70px;
    input {
      width: 100%;
      height: 70px;
      line-height: 70px;
    }
    input::-ms-input-placeholder {
      text-align: center;
      color: #656a80;
      font-weight: 700;
      font-size: 26px;
      line-height: 70px;
    }
    input::-webkit-input-placeholder {
      text-align: center;
      color: #656a80;
      font-weight: 700;
      font-size: 26px;
      line-height: 70px;
    }
  }
}
.flexlist {
  display: flex;
  justify-content: space-between;
  margin: 20px 50px 0;
  padding: 25px 50px;
  background-color: #fefefe;
  border-radius: 50px;
  line-height: 60px;
  font-size: 32px;
  text-align: center;
  font-weight: 700;
  .flexlistimg {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: auto;
      max-height: 100%;
    }
  }
  div:last-child {
    line-height: 30px;
    font-size: 24px;
    width: 110px;
    min-height: 60px;
    .van-checkbox {
      justify-content: space-around;
    }
  }
}
.footerbtn {
  height: 117px;
  border-top: 1px solid #15153b;
  line-height: 120px;
  background: #fff;
  color: #fff;
  font-weight: 700;
  font-size: 34px;
  position: fixed;
  bottom: 0px;
  width: 100%;
  input {
    width: 100%;
    text-align: center;
    float: left;
    background-color: #242947;
  }
}
</style>
