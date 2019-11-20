<template>
  <div class="sheet_only">
    <Header headerName="团队结算单"></Header>
    <!-- 我是结算单 -->
    <div class="my_header">
      <div class="my_header_detail">
        <div class="my_header_detail_time">0325</div>
        <div class="my_header_detail_order">
          <span>{{taxInfo.insuranceName}}</span>
          <span>{{taxInfo.billId}}</span>
        </div>
      </div>
      <div class="my_header_nav">
        <div>
          <span>税前佣金</span>
          <span>{{taxInfo.memberMoney}}</span>
        </div>
        <div>
          <span>结算人数</span>
          <span>{{taxInfo.peopleNum}}</span>
        </div>
        <div>
          <span>结算状态</span>
          <span>{{taxInfo.status === 0 ? '新建' : taxInfo.status === 1 ? '待支付' : taxInfo.status === 2 ? '已支付' : '未知状态'}}</span>
        </div>
      </div>
    </div>
    <div class="number_list">
      <div class="number_name">
        <span>分配金额</span>
        <span>本单个税</span>
        <span>增值税</span>
        <span>城建及附加</span>
        <span>实际金额</span>
      </div>
      <div v-for="(item,index) in taxListOnly" :key="index">
        <div class="number_price">
          <span>
            <i></i>
            {{item.employeeName}}
          </span>
          <span>{{item.memberMoney}}</span>
          <span>{{item.thisIncomeTax}}</span>
          <span>{{item.thisZtax}}</span>
          <span>{{item.thisCityTax}}</span>
          <span>{{item.toPay}}</span>
        </div>
        <div class="number_price_child" v-for="(citem,cindex) in item.child" :key="cindex">
          <span>{{citem.employeeName}}</span>
          <span>{{citem.memberMoney}}</span>
          <span>{{citem.thisIncomeTax}}</span>
          <span>{{citem.thisZtax}}</span>
          <span>{{citem.thisCityTax}}</span>
          <span>{{citem.toPay}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import api from "@/service/fetch";
import {
  apiTeamBill
} from "@/api/example";
import "../../mock/api/getSettlementSheetOnly";
export default {
  name: "HelloWorld",
  components: {
    Header
  },
  data() {
    return {
      billId: "",
      systemBillId: "",
      taxInfo: {
        "insuranceName": '',
        "billId": '',
        "memberMoney": '0',
        "peopleNum": 0,
        "status": 0
      },
      taxListOnly: [],
      yearData: 2019
      // yearOption:[
      //     { text: '2019', value: 2019 },
      //     { text: '2018', value: 2018 },
      //     { text: '2017', value: 2017 },
      //     { text: '2016', value: 2016 },
      //     { text: '2015', value: 2015 },
      //     { text: '2014', value: 2014 }
      // ]
    };
  },
  created() {
    if (this.$route.query) {
      this.billId = this.$route.query.billId;
      this.systemBillId = this.$route.query.systemBillId;
    }

    this.getapiwhoTeamBill();
    // api.MockData("/mock/getSettlementSheetOnly").then(res => {
    //   this.taxListOnly = res.rows;
    //   console.log(res, "res");
    // });
  },
  mounted() {
    document.title = "保险行业税务计算系统";
  },
  methods: {
    getapiwhoTeamBill() {
      const toast = this.$toast.loading({
        duration: 0,
        message: "加载中...",
        mask: true,
        forbidClick: true
      });

      let parmer = {
        systemBillId: this.systemBillId,
        billId: this.billId
      };
      console.log(parmer, "parmer=================");
      apiTeamBill(parmer).then(resp => {
        if (resp.code === 1) {
          this.taxListOnly = resp.data[0].insuranceBrokerageResult;
          this.taxInfo = resp.data[0].insuranceTmp;
        } else {
          this.$toast(resp.message);
        }
        console.log(
          resp,
          "3.2.8.获取结算单详细信息（销售员/团长）===================="
        );
        toast.clear();
      });
    }
  },
  watch: {}
};
</script>
<style scoped lang="scss">
.sheet_only {
  .my_header {
    position: fixed;
    top: 89px;
    background: #fff;
    z-index: 1000;
    height: 358px;
    width: 100%;
    span {
      font-weight: bold;
    }
    .my_header_detail {
      height: 204px;
      position: relative;
      .my_header_detail_time {
        display: inline-block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 46px;
        height: 66px;
        background: #252d57;
        color: #fff;
        font-weight: bold;
        border-radius: 50%;
        word-wrap: break-word;
        font-size: 32px;
        line-height: 30px;
        padding: 10px 20px;
        text-align: center;
        left: 116px;
      }
      .my_header_detail_order {
        display: inline-block;
        margin-left: 242px;
        margin-top: 60px;
        span {
          font-weight: bold;
          font-size: 32px;
          display: block;
        }
        span:nth-child(2) {
          padding-left: 28px;
        }
      }
    }
    .my_header_nav {
      border-top: 2px solid #eef3f4;
      text-align: center;
      margin: 0px 72px;
      padding: 30px 0 50px;
      height: 64px;
      > div {
        display: inline-block;
        padding: 0px 20px;
        span {
          display: block;
          margin-bottom: 10px;
        }
        span:nth-child(1) {
          font-size: 18px;
          color: #79799a;
        }
        span:nth-child(2) {
          font-size: 36px;
          font-weight: bold;
          color: #252d57;
        }
      }
      > div:nth-child(3) {
        span:nth-child(2) {
          color: #4ba18f;
        }
      }
    }
  }
  .number_list {
    margin-top: 480px;
    .number_name {
      // float:right;
      margin-left: 160px;
      span {
        text-align: center;
        display: inline-block;
        color: #c8cdde;
        font-size: 12px;
        font-weight: bold;
        width: 100px;
      }
      span:nth-child(3) {
        width: 80px;
      }
      span:nth-child(4) {
        width: 120px;
      }
      span:nth-child(5) {
        width: 100px;
      }
    }
    .number_price,
    .number_price_child {
      height: 68px;
      background: #fff;
      border-radius: 44px;
      margin: 22px 20px; //22
      padding: 10px 0;
      span {
        height: 68px;
        line-height: 68px;
        display: inline-block;
        text-align: center;
        font-weight: bold;
        color: #747991;
        font-size: 26px;
        float: left;
      }
      span:nth-child(1) {
        width: 130px;
        border-right: 1px solid #ccc;
        color: #282f5c;
        text-align: right;
        padding-right: 10px;
        i {
          width: 24px;
          height: 24px;
          background: #282f5c;
          border-radius: 50%;
          display: inline-block;
          margin-right: 10px;
        }
      }
      span:nth-child(2) {
        width: 110px;
        color: #282f5c;
      }
      span:nth-child(3) {
        width: 110px;
      }
      span:nth-child(4) {
        width: 80px;
      }
      span:nth-child(5) {
        width: 130px;
      }
      span:nth-child(6) {
        width: 120px;
        color: #b01800;
      }
    }
    .number_price_child {
      background: #dae0e9;
      margin: 22px 20px 22px 50px; //22
      span:nth-child(1) {
        width: 100px;
      }
    }
  }
}
</style>
