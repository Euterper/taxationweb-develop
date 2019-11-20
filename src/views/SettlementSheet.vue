<template>
  <div>
    <Header :headerName="pageStatus==1?'新通知':pageStatus==2?'待提交':pageStatus==3?'团队结算单':'我的结算单'"></Header>
    <!-- 我是结算单 -->
    <div class="my_header" v-if="pageStatus==4">
      <div class="my_header_box">
        <span class="my_header_sum">年度累计收入</span>
        <span class="my_header_price">{{employeeTax.yearTotalIncome}}</span>
        <div class="my_header_nav">
          <div>
            <span>累计个税</span>
            <span>{{employeeTax.yearTotalIncomeTax}}</span>
          </div>
          <div>
            <span>累计城建税</span>
            <span>{{employeeTax.yearTotalCityTax}}</span>
          </div>
          <div>
            <span>当前税率</span>
            <span>{{employeeTax.taxrate}}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="pageStatus==4?'Team_filter fixed_456':'Team_filter'"
      v-if="pageStatus==3||pageStatus==4"
    >
      <van-dropdown-menu active-color="#303766">
        <van-dropdown-item title="筛选" v-model="value1" :options="option" />
      </van-dropdown-menu>
      <div class="filter_time">
        <span
          :class="timeStatus==1?'active month':'month'"
          @click="pageStatus==4 ? getapiGetMyBill(1) : getInsuranceBills(1)"
        >本月</span>
        <span
          :class="timeStatus==3?'active threeMonth':'threeMonth'"
          @click="pageStatus==4 ? getapiGetMyBill(3) : getInsuranceBills(3)"
        >三个月</span>
        <span
          :class="timeStatus==6?'active year':'year'"
          @click="pageStatus==4 ? getapiGetMyBill(6) : getInsuranceBills(6)"
        >半年</span>
      </div>
    </div>
    <div
      :class="(pageStatus==1||pageStatus==2)?'new_content':pageStatus==3?'new_content header_top':'new_content header_top_538'"
    >
      <span
        v-if="pageStatus==1||pageStatus==2"
        class="new_content_title"
      >{{pageStatus==1?(total==0?'您目前暂无新的结算单':'你有1个新的结算单已结算'):'请及时处理'}}</span>
      <van-loading size="42px" v-show="isLoading" vertical>加载中...</van-loading>
      <div
        @click="toDetail(item.billId,item.systemBillId)"
        :class="pageStatus==2?'new_content_info new_content_info_height':'new_content_info'"
        v-for="(item,index) in row"
        :key="index"
      >
        <div class="time">
          <span>
            <!-- {{item.time}} -->
            {{item.beginDate}}
          </span>
        </div>
        <div class="info">
          <div class="info_name">
            <!-- <span>{{item.insuranceName}}</span><span>{{item.insuranceNum}}</span> -->
            <span>{{item.insuranceName}}</span>
            <span>{{item.billId}}</span>
          </div>
          <div class="info_mess">
            <div>
              <span>税前佣金</span>
              <!-- <span>{{item.price}}</span> -->
              <span>{{item.commission}}</span>
            </div>
            <div>
              <span>结算人数</span>
              <!-- <span>{{item.peopleNum}}</span> -->
              <span>{{item.pepoleNum}}</span>
            </div>
            <div>
              <span>结算状态</span>
              <span
                :class="item.status==1?'status1':item.status==2?'status2':item.status==3?'status3':'status4'"
              >{{item.status==1?'待支付':item.status==2?'已支付':item.status==-1?'废弃单':'新建'}}</span>
            </div>
          </div>
          <div class="info_btn" v-if="pageStatus==2">
            <span
              :class="item.status!=3?'btn_del btn_width':'btn_del'"
              @click.stop="deleythis(item.billId,item.systemBillId)"
            >删除</span>
            <span class="btn_edit" v-if="item.status==3">调整</span>
            <span class="btn_sub" @click.stop="next1(item.billId,item.systemBillId)">提交结算单</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import api from "@/service/fetch";
import "../../mock/api/newAbout";
import { getSettlementStatus } from "@/service/app_main_service";
import {
  apiGetBill,
  apiGetMyBill,
  apiTeamBill,
  DeleteInsuranceBill,
  UpdateInsuranceBillStatus,
  getTeamInsuranceBills,
  apiAddBao
} from "@/api/example";
import Cookies from "js-cookie";

export default {
  name: "HelloWorld",
  components: {
    Header
  },
  data() {
    return {
      total: 0,
      row: [],
      employeeTax: {
        taxrate: "0.00%",
        yearTotalCityTax: "0.00",
        yearTotalIncome: "0.00",
        yearTotalIncomeTax: "0.00"
      },
      // employeeId:this.$store.state.employeeId,
      // employeeId:Cookies.get('employeeId'),
      employeeId: Cookies.get("employeeId") || this.$route.query.employeeId,

      pageStatus: 1, //1新通知，2待提交 3团队结算单 4.我的结算单
      timeStatus: 1, //1本月 2 三个月 3半年
      newAboutList: [],
      value1: undefined,
      option: [], 
      option1: [
        // { text: "人民保险", value: 0 },
        // { text: "平安保险", value: 1 },
        // { text: "人寿保险", value: 2 }
      ],
      yearData: 2019,
      yearOption: [
        { text: "2019", value: 2019 },
        { text: "2018", value: 2018 },
        { text: "2017", value: 2017 },
        { text: "2016", value: 2016 },
        { text: "2015", value: 2015 },
        { text: "2014", value: 2014 }
      ],
      isLoading: true
    };
  },
  created() {
    // this.pageStatus = this.$store.state.pageStatus||1;
    this.pageStatus = Cookies.get("pageStatus") || 1;
    // console,log(this.employeeId,'employeeIdemployeeIdemployeeId=============')
    console.log(this.pageStatus, "this.pageStatus=============");
    // console.log(this.$route,'routr')
    // api.MockData('/mock/newAbout').then(res=>{
    //     this.newAboutList =res.rows
    //     this.newAboutList.forEach(item=>{
    //         item.statusName= getSettlementStatus(2,item.status)
    //     })

    //     console.log(res,'res')
    // })
    // this.$router.go(0);

    document.title = "保险行业税务计算系统";
    this.getInsurances();
  },
  mounted() {
    // this.$store.state.isRouterAlived =false;
    console.log(
      this.$store.state.employeeId,
      "新通知this.$store.state.employeeId=========="
    );
    console.log(
      Cookies.get("employeeId"),
      "新通知Cookies.get(employeeId)=========="
    );
    // location.reload();
    if (this.pageStatus == 4) {
      this.getapiGetMyBill(1);
    } else if (this.pageStatus == 1) {
      this.getapiGetBill(1);
    } else if (this.pageStatus == 3) {
      this.getInsuranceBills(1);
    } else if (this.pageStatus == 2) {
      this.getapiGetBill(2);
      // this.getapiwhoTeamBill()
    }
  },
  methods: {
    getInsuranceBills(type) {
      var insuranceId = !!this.value1 ? this.value1 : ''
      if (typeof(type) == "undefined") {
        type = this.timeStatus
      }
      this.isLoading = true;
      this.row = [];

      this.timeStatus = type;
      let parmer = {};
      if (type == 1) {
        parmer.month = "1";
      } else if (type == 3) {
        parmer.month = "3";
      } else if (type == 6) {
        parmer.month = "6";
      } else {
        parmer.month = "1";
      }
      parmer.insuranceId = insuranceId
      getTeamInsuranceBills(parmer).then(resp => {
        console.log(
          "3.2.21.（团队结算单）获取团队结算单================有月份和本月之分"
        );
        if (resp.code == 1) {
          this.row = resp.data;
        }
        this.isLoading = false;
      });
    },
    next1(billId, systemBillId) {
      console.log("进入第二个按钮===============");
      let parmers = {};
      parmers.systemBillId = systemBillId;
      parmers.status = "1";
      parmers.billId = billId;
      UpdateInsuranceBillStatus(parmers).then(resp => {
        if (resp.code == 0) {
          this.$toast(resp.message);
        }
        console.log(
          resp,
          "3.2.15.（新建结算单/待提交结算单）提交结算单=================="
        );
      });
    },
    //  apiLogining({
    //             openid:this.openid,
    //             username:this.username,
    //             password:this.password
    //           }).then((resp) => {
    deleythis(billId, systemBillId) {
      let parmer = {};
      parmer.billId = billId;
      parmer.systemBillId = systemBillId;
      parmer.status = "0";
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否删除"
        })
        .then(() => {
          DeleteInsuranceBill(parmer).then(resp => {
            console.log(resp, "删除成功");
            this.getapiGetBill(2);
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    getapiwhoTeamBill(billId, systemBillId) {
      let parmer = {
        systemBillId,
        billId
      };
      console.log(parmer, "parmer=================");
      apiTeamBill(parmer).then(resp => {
        console.log(
          resp,
          "3.2.8.获取结算单详细信息（销售员/团长）===================="
        );
      });
    },
    getapiGetMyBill(mth) {
      var insuranceId = !!this.value1 ? this.value1 : ''
      if (typeof(mth) == "undefined") {
        mth = this.timeStatus
      }
      
      this.isLoading = true;
      this.row = [];

      var nowDate = new Date();
      this.timeStatus = mth;
      apiGetMyBill({
        // employeeId:this.$store.state.employeeId,Cookies.get('employeeId')
        employeeId: Cookies.get("employeeId"),
        year: nowDate.getFullYear() + "",
        month: mth + "",
        insuranceId: insuranceId
      }).then(resp => {
        console.log(
          resp,
          "3.2.7.获取我的结算单（销售员/团长）===================="
        );
        if (resp.code == 1) {
          this.row = resp.data[0].insuranceLists;
          console.log(
            this.row,
            "resp.data[0].insuranceLists==================="
          );
        }
        this.isLoading = false;
      });
    },

    getapiGetBill(type) {
      this.row = [];
      this.total = 0;

      const toast = this.$toast.loading({
        duration: 0,
        message: "加载中...",
        mask: true,
        forbidClick: true
      });

      let parmer = {
        // employeeId:this.$store.state.employeeId,
        employeeId: Cookies.get("employeeId")
      };
      if (type == 1) {
        parmer.status = "2";
      } else if (type == 2) {
        parmer.status = "0";
      }
      console.log(parmer, "parmer=================");
      apiGetBill({
        // employeeId:this.$store.state.employeeId,
        employeeId: Cookies.get("employeeId") || this.$store.state.employeeId,
        status: parmer.status
      }).then(resp => {
        console.log(
          resp,
          "获取通知结算单（新通知）（销售员/团长）===================="
        );
        if (resp.code == 1) {
          this.row = resp.data;
          this.total = resp.total;
        }
        this.isLoading = false;

        toast.clear();
      });
    },
    timeChange(type) {
      this.timeStatus = type;
    },
    //pageStatus == 3 跳到团队结算单详情 4.跳到我的结算单 详情
    toDetail(billId, systemBillId) {
      console.log(billId, "这是点击详情的时候传过去的billId");
      console.log(systemBillId, "这是点击详情的时候传过去的systemBillId");

      if (this.pageStatus == 3) {
        this.$router.push({
          name: "SettlementSheetOnly",
          query: {
            billId: billId,
            systemBillId: systemBillId
          }
        });
      } else {
        this.$router.push({
          name: "AccountList",
          query: {
            billId: billId,
            systemBillId: systemBillId
          }
        });
      }
    },
    getInsurances() {
      apiAddBao().then(resp => {
        if (resp.code == 1) {
          let data = resp.data;
          let op = [];
          data.forEach(function(item, index, array) {
            op.push({ text: item.insuranceName, value: item.insuranceId });
          });
          this.option = op;
        }
      });
    }
  },
  watch: {
    value1(newName, oldName){
      if (this.pageStatus==4) {
        this.getapiGetMyBill();
      } else {
        this.getInsuranceBills();
      }
    }
  }
};
</script>
<style scoped lang="scss">
.header_top {
  margin-top: 220px !important;
}
.header_top_538 {
  margin-top: 538px !important;
}
.Team_filter {
  height: 94px;
  background: #fff;
  position: fixed;
  top: 90px;
  width: 100%;
  padding-left: 70px;
  z-index: 999;
  .van-dropdown-menu {
    display: inline-block;
    // position:absolute;
    // left:70px;
    // top:50%;
    // transform:translateY(-50%);
    // width: 134px;
    // height: 48px;
    // background: #303766;
    // color: #fff;
    // border-radius: 24px;
    // line-height: 48px;
    margin-top: 25px;
    padding-bottom: 18px;

    // >div{
    //     width: 134px;
    //     height: 48px;
    //     background: #303766;
    //     color: #fff;
    //     border-radius: 24px;
    //     line-height: 48px;
    // }
    .van-ellipsis::after {
      display: none;
    }
  }
  .filter_time {
    display: inline-block;
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-50%);
    padding: 0;
    width: 390px;
    height: 48px;
    border-radius: 24px;
    background: #f5f8fa;
    span {
      padding: 0 36px;
      display: inline-block;
      height: 48px;
      line-height: 48px;
      border-right: 1px solid #ccc;
      float: left;
    }
    .month {
      border-radius: 24px 0 0 24px;
    }
    .threeMonth {
    }
    .year {
      border-radius: 0 24px 24px 0;
      border: none;
    }
    .active {
      background: #303766;
      color: #fff;
    }
  }
}
.fixed_456 {
  top: 420px;
  background: #edf4fa;
  .van-dropdown-menu {
    background: #edf4fa;
  }
}
.my_header {
  position: fixed;
  top: 89px;
  padding: 0 66px 48px;
  background: #fff;
  z-index: 1000;
  .my_header_box {
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
    width: 518px;
    height: 208px;
    border-radius: 20px;
    padding: 36px 50px 40px;
    span {
      font-weight: bold;
      color: #fff;
    }
    .my_header_sum {
      font-size: 20px;
      display: block;
      text-align: center;
    }
    .my_header_price {
      font-size: 35px;
      display: block;
      text-align: center;
    }
    .my_header_nav {
      border-top: 2px solid #fff;
      text-align: center;
      margin-top: 20px;
      > div {
        display: inline-block;
        padding: 34px 20px 0;
        span {
          display: block;
          margin-bottom: 5px;
        }
      }
    }
  }
}
.new_content {
  padding: 0 66px;
  margin-top: 90px;
  .new_content_title {
    font-size: 42px;
    font-weight: bold;
    color: #30355e;
    padding: 70px 0;
    display: block;
  }
  .new_content_info {
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0px 0px 10px 3px #ccc;
    border-radius: 8px;
    margin-bottom: 40px;
    height: 215px;
    .time {
      float: left;
      width: 100px;
      height: 100%;
      position: relative;
      span {
        color: #d6dce5;
        font-size: 18px;
        display: block;
        width: 30px;
        height: 35px;
        padding: 15px;
        padding-top: 10px;
        background: #32385b;
        border-radius: 50%;
        font-size: 18px;
        font-weight: bold;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        word-wrap: break-word;
        line-height: 22px;
      }
    }
    .info {
      float: left;
      width: 516px;
      height: 100%;
      border-radius: 20px 0 0 20px;
      // border-left:2px solid #ccc;
      box-shadow: 0px 0px 10px 1px #ccc;
      .info_name {
        margin: 0 50px 0 40px;
        height: 88px;
        line-height: 88px;
        border-bottom: 1px solid #f2f4fb;
        span {
          color: #3a4269;
          font-weight: bold;
        }
        span:first-child {
          font-size: 24px;
        }
        span:last-child {
          float: right;
        }
      }
      .info_mess {
        margin-top: 30px;
        margin-left: 60px;
        > div {
          display: inline-block;
          margin-right: 50px;
          text-align: center;
          span {
            display: block;
            line-height: 40px;
          }
          span:first-child {
            color: #a4a4b9;
            font-size: 18px;
          }
          span:last-child {
            font-weight: bold;
            font-size: 22px;
            color: #30355e;
          }
        }
        div:nth-child(3) {
          //    span:last-child{
          //         color:#3ba287;
          //     }
          .status1 {
            color: #3ba287;
          }
          .status2 {
            color: #ce8144;
          }
          .status3 {
            color: #ce8144;
          }
          .status4 {
            color: #da5764;
          }
        }
      }
      .info_btn {
        height: 46px;
        padding: 40px 0px 24px 40px;
        span {
          height: 44px;
          color: #fff;
          font-weight: bold;
          font-size: 20px;
          border-radius: 22px;
          display: inline-block;
          line-height: 44px;
          text-align: center;
        }
        .btn_del {
          background: #f3a4ba;
          width: 93px;
          margin-left: 10px;
        }
        .btn_edit {
          background: #2e3564;
          width: 93px;
          margin-left: 40px;
        }
        .btn_sub {
          background: #2e3564;
          width: 162px;
          margin-left: 40px;
        }
        .btn_width {
          width: 162px;
          margin-right: 10px;
        }
      }
    }
  }
  .new_content_info_height {
    height: 300px;
  }
}
</style>
