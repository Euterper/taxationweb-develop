<template>
  <div>
    <Header headerName="我的结算单"></Header>
    <div class="new_content">
      <div>
        <div class="time">
          <span>{{dataList.insuranceTmp.beginDate}}</span>
        </div>
        <div class="contenttxt">
          <div>{{ dataList.insuranceTmp.insuranceName }}</div>
          <div>{{ dataList.insuranceTmp.billId }}</div>
        </div>
      </div>
      <div class="contentflexbox">
        <div class="contentflex">
          <div>
            <span>税前佣金</span>
            <span>{{ dataList.insuranceTmp.commission }}</span>
          </div>
          <div>
            <span>个人所得税</span>
            <span>{{ dataList.insuranceTmp.thisIncomeTax }}</span>
          </div>
          <div>
            <span>增值税</span>
            <span>{{ dataList.insuranceTmp.thisZtax }}</span>
          </div>
          <div>
            <span>城建及附加</span>
            <span>{{ dataList.insuranceTmp.thisCityTax }}</span>
          </div>
          <div>
            <span>实得金额</span>
            <span>{{ dataList.insuranceTmp.toPay }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="listtitle">收付调节单</div>
    <div class="listtablebox">
      <table class="listtable" border="0" rules="none">
        <thead>
          <tr>
            <td>付款方</td>
            <td></td>
            <td>收款方</td>
            <td>分配金额</td>
            <td>应缴金额</td>
            <td>实际应付</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item,index) in dataList.insuranceBrokerageResult"
            :key="index"
            @click="toAccountListPrivate()"
          >
            <td>
              <div class="td1">{{item.employeeName}}</div>
            </td>
            <td>
              <div>
                <img style="width:30px;" src="../assets/images/toright.png" />
              </div>
            </td>
            <td>
              <div class="td2">{{item.payee}}</div>
            </td>
            <td>
              <div class="td3">{{item.memberMoney}}</div>
            </td>
            <td>
              <div class="td4">{{item.tax}}</div>
            </td>
            <td>
              <div class="td5">{{item.toPay}}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import api from "@/service/fetch";
import "../../mock/api/accountList";
import { apiGetBill, apiGetMyBill, apiTeamBill } from "@/api/example";

export default {
  name: "AccountList",
  components: {
    Header
  },
  data() {
    return {
      billId: "",
      systemBillId: "",
      dataList: {
        insuranceTmp: {
          billId: "",
          commission: "",
          employeeName: "",
          insuranceName: "",
          thisCityTax: "",
          thisIncomeTax: "",
          thisZtax: "",
          toPay: ""
        },
        insuranceBrokerageResult: [
          {
            employeeName: "",
            memberMoney: "",
            tax: "",
            thisCityTax: "",
            thisIncomeTax: "",
            thisZtax: "",
            toPay: ""
          }
        ]
      }
    };
  },
  created() {
    if (this.$route.query) {
      this.billId = this.$route.query.billId;
      this.systemBillId = this.$route.query.systemBillId;
    }
  },
  mounted() {
    document.title = "保险行业税务计算系统";
    this.getapiwhoTeamBill();
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
          this.dataList = resp.data[0];
        } else {
          this.$toast(resp.message);
        }
        console.log(
          resp,
          "3.2.8.获取结算单详细信息（销售员/团长）===================="
        );
        toast.clear();
      });
    },
    toAccountListPrivate() {
      // this.$router.push({
      //   name: "AccountListPrivate",
      //   params: {
      //     billId: this.billId,
      //     systemBillId: this.systemBillId
      //   }
      // });
    }
  },
  watch: {}
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
  .time {
    margin: 115px 0 0 155px;
    color: #fff;
    float: left;
    width: 70px;
    height: 70px;
    padding: 15px;
    background: #32365b;
    border-radius: 50%;
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    transform: translate(-50%, -50%);
    word-wrap: break-word;
    line-height: 36px;
  }
  .contenttxt {
    float: left;
    font-size: 30px;
    font-weight: bold;
    color: #30355e;
    padding: 65px 0 0 0;
    line-height: 54px;
    div:last-child {
      font-size: 24px;
      padding-left: 30px;
    }
  }
}
.contentflexbox {
  padding: 0 70px;
  clear: both;
}
.contentflex {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f0f4f7;
  margin-top: 70px;
  padding: 40px 0 0;
  div {
    span {
      display: block;
      padding-bottom: 20px;
      text-align: center;
      font-size: 24px;
      line-height: 24px;
      color: #767390;
    }
    span:last-child {
      font-size: 18px;
      line-height: 36px;
      font-weight: 700;
      color: #80809a;
      padding-bottom: 35px;
    }
  }
  div:first-child {
    span:last-child {
      color: #2f3565;
    }
  }
  div:last-child {
    span:last-child {
      color: #cd2e06;
    }
  }
}
.listtitle {
  font-size: 34px;
  text-align: center;
  border-bottom: 1px solid #d5d9e2;
  margin: 540px 70px 0;
  padding: 0 0 35px;
  line-height: 34px;
  font-weight: 700;
}
.listtablebox {
  padding: 0 70px;
}
.listtable {
  width: 100%;
  td {
    text-align: center;
  }
  thead {
    font-size: 20px;
    line-height: 88px;
  }
  tbody {
    td {
      font-size: 24px;
      line-height: 88px;
      font-weight: 600;
      border: none;
      div {
        margin: 9px auto;
      }
    }
    td .td1 {
      width: 88px;
      height: 88px;
      color: #242657;
      border-radius: 50%;
      background-color: #fefefe;
    }
    td .td2 {
      width: 88px;
      height: 88px;
      color: #fff;
      border-radius: 50%;
      background: -webkit-linear-gradient(45deg, #4f68df, #dc96b8);
      background: -o-linear-gradient(45deg, #4f68df, #dc96b8);
      background: -moz-linear-gradient(45deg, #4f68df, #dc96b8);
      background: linear-gradient(45deg, #4f68df, #dc96b8);
    }
    td .td3 {
      color: #2f3565;
      font-size: 15px;
      background-color: #fefefe;
      border-radius: 45% 0 0 45%;
    }
    td .td4 {
      color: #80809a;
      font-size: 15px;
      background-color: #fefefe;
    }
    td .td5 {
      color: #cd2e06;
      font-size: 15px;
      background-color: #fefefe;
      border-radius: 0 45% 45% 0;
    }
  }
}
</style>
