<template>
  <div>
    <Header headerName="新建结算单"></Header>
    <div class="title">
      <van-tabs class="bill-tabs" v-model="active" color="#313450" line-height="3px">
        <van-tab title="01-信息录入" name="1">
          <div class="func-flex bill-title">
            <label class="font-1C203E">保单基本信息录入</label>
          </div>
          <div>
            <div class="list func-bgfff">
              <div class="func-flex func-bb1">
                <div class="name func-br1">
                  <label class="func-iblock">保险公司</label>
                  <input
                    class="func-iblock"
                    placeholder="选择保险公司"
                    v-model="value"
                    @click="setVantPopupFontSize();showPicker = true;"
                    readonly
                  />
                  <van-popup v-model="showPicker" position="bottom" :class="{'font-size' : '20px'}">
                    <van-picker
                      show-toolbar
                      :columns="companyList"
                      @cancel="showPicker = false"
                      @confirm="onConfirm"
                      round
                    />
                  </van-popup>
                </div>
              </div>
              <div class="func-flex func-bb1">
                <div class="name">
                  <label class="func-iblock">保单号</label>
                  <!-- <h1 class="func-iblock">{{formLine.team}}</h1> -->
                  <input class="func-iblock" placeholder="请输入" v-model="formadd.billId" />
                </div>
              </div>
              <div class="func-flex func-bb1">
                <div class="name func-br1">
                  <label class="func-iblock">出单日期</label>
                  <h1 class="func-iblock" @click="timePicker = true">{{value1}}</h1>
                  <!-- <input placeholder="选择出单日期"/> -->
                  <van-popup v-model="timePicker" position="bottom" @click="setVantPopupFontSize">
                    <van-datetime-picker v-model="currentDate" type="date" @cancel="timePicker = false" @confirm="onConfirm1" />

                    <!-- <van-datetime-picker v-model="currentDate" type="date" @confirm="onConfirm3"  @change="endTimeChange" /> -->
                  </van-popup>
                </div>
                <div class="name func-br1">
                  <label class="func-iblock">被保险人</label>
                  <!-- <input class="func-iblock" placeholder="被保险人" v-model="formLine.name"/> -->
                  <input class="func-iblock" placeholder="请输入" v-model="formadd.assuredMan" />
                </div>
              </div>
              <div class="func-flex func-bb1">
                <div class="name func-br1">
                  <label class="func-iblock">备注</label>
                  <!-- <input class="func-iblock" placeholder="请备注" v-model="formLine.remark"/> -->
                  <input class="func-iblock" placeholder="请备注" />
                </div>
              </div>
              <!-- <div class="func-flex func-bb1">
									<div class="name">
										<label class="func-iblock">受雇从业日期</label>
										<h1 class="func-iblock"  @click="timePicker2 = true">{{value2}}</h1>
										<van-popup v-model="timePicker2" position="bottom">
										<van-datetime-picker v-model="currentDate2" type="date" @confirm="onConfirm2"  />
										</van-popup>
									</div>
              </div>-->
              <div class="func-flex func-bb1">
                <div class="name">
                  <label class="func-iblock">佣金总额</label>
                  <!-- <h1 class="func-iblock">{{formLine.amount}}</h1> -->
                  <input class="func-iblock" placeholder="请输入" v-model="formadd.commission" />
                </div>
              </div>
            </div>
          </div>
          <div class="func-flex bill-title">
            <label>本单业务员</label>
          </div>
          <div class="bill-list" v-if="addPickerState==false">
            <div class="func-bgfff bill-choose" @click="overlay()">选择人员</div>
          </div>
          <div class="columList bill-list" v-if="addPickerState==true">
            <div
              class="chooseList-item func-mt20"
              v-for="(items, index) in selectmanList"
              :key="items.index"
            >
              <div class="chooseList func-bgfff">
                <div class="nav-head">
                  <img src="../assets/images/man.png" />
                </div>
                <div class="choose-name">{{items.employeeName}}</div>
                <!-- <div class="choose-name">{{items.name}}</div> -->
                <div class="choose-size">{{items.size}}</div>
              </div>
              <van-icon
                class="choose-delete"
                name="clear"
                size="30"
                @click="deleteman(index)"
                color="#D02602"
              />
            </div>
          </div>
          <!-- 本单业务员选择 弹窗 -->
          <van-popup v-model="addPicker" :overlay="true" :style="{ width: '80%',background:'none'}">
            <div class="addList">
              <div class="addList-title">添加本单业务员</div>
              <div class="addList-nav">
                <!-- <div class="addList-item func-mt20 func-bgfff" v-for="(item, index) in list" :key="item.index"> -->
                <van-checkbox-group v-model="result" :max="1">
                  <div
                    class="addList-item func-mt20 func-bgfff"
                    v-for="(item, index) in manList"
                    :key="item.index"
                  >
                    <div class="styleList">
                      <div class="nav-head">
                        <img src="../assets/images/man.png" />
                      </div>
                      <div class="nav-name">{{item.employeeName}}</div>
                    </div>
                    <van-checkbox shape="square" :key="index" :name="item" checked-color="#1C203E"></van-checkbox>
                  </div>
                </van-checkbox-group>
              </div>
              <div class="addList-confirm">
                <van-icon name="checked" size="40" color="rgb(107, 119, 208)" @click="StateAdd" />
              </div>
            </div>
          </van-popup>
          <!-- ===================================== -->
          <div class="func-flex bill-title">
            <label>本单结算人员</label>
          </div>
          <div class="bill-list1" v-if="addPickerState1==false">
            <div class="func-bgfff bill-choose" @click="overlay1()">选择人员</div>
          </div>
          <div class="columList bill-list1" v-if="addPickerState1==true">
            <div
              class="chooseList-item func-mt20"
              v-for="(items, index) in selectmanList1"
              :key="items.index"
            >
              <div class="chooseList func-bgfff">
                <div class="nav-head">
                  <img src="../assets/images/man.png" />
                </div>
                <div class="choose-name">{{items.employeeName}}</div>
                <!-- <div class="choose-name">{{items.name}}</div> -->
                <div class="choose-size">{{items.size}}</div>
              </div>
              <van-icon
                class="choose-delete"
                name="clear"
                size="30"
                @click="deleteman1(index)"
                color="#D02602"
              />
            </div>
          </div>
          <!-- 本单结算人员选择 弹窗 -->
          <van-popup
            v-model="addPicker1"
            :overlay="true"
            :style="{ width: '80%',background:'none'}"
          >
            <div class="addList">
              <div class="addList-title">添加本单结算人员</div>
              <div class="addList-nav">
                <!-- <div class="addList-item func-mt20 func-bgfff" v-for="(item, index) in list" :key="item.index"> -->
                <van-checkbox-group v-model="result1">
                  <div
                    class="addList-item func-mt20 func-bgfff"
                    v-for="(item, index) in manList1"
                    :key="item.index"
                  >
                    <div class="styleList">
                      <div class="nav-head">
                        <img src="../assets/images/man.png" />
                      </div>
                      <div class="nav-name">{{item.employeeName}}</div>
                    </div>
                    <van-checkbox shape="square" :key="index" :name="item" checked-color="#1C203E"></van-checkbox>
                  </div>
                </van-checkbox-group>
              </div>
              <div class="addList-confirm">
                <van-icon name="checked" size="40" color="rgb(107, 119, 208)" @click="StateAdd1" />
              </div>
            </div>
          </van-popup>
        </van-tab>
        <van-tab title="02-调整确认" name="2">
          <!-- <div slot="title">
					  <van-icon size="20" name="more-o" style="vertical-align: top;"/>
          </div>-->
          <div class="func-mt20">
            <div class="number_list">
              <div class="number_name">
                <span class="spa1">分配金额</span>
                <span class="spa1">本单个税</span>
                <span class="spa1">增值税</span>
                <span class="spa1">城建及附加</span>
                <span class="spa1">实际金额</span>
              </div>
              <!-- <div v-for="(item,index) in taxListOnly" :key="index"> -->
              <div v-for="(item,index) in tiaozhengList" :key="index">
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
                  <!-- <span><i></i>{{item.name}}</span>  
						            <span>{{item.price1}}</span>
						            <span>{{item.price2}}</span>
						            <span>{{item.price3}}</span>
						            <span>{{item.price4}}</span>
                  <span>{{item.price5}}</span>-->
                </div>
              </div>
              <van-button class="btn-revision func-mt20" size="large" @click="allocation">调整</van-button>
            </div>
            <!-- <div class="revisionList">
							<div class="revision-title">
								<ul class="func-flex">
									<li class="func-iblock" v-for="(item, index) in revisionList" :key="item.index">{{item.name}}</li>
								</ul>
							</div>
							<div class="revision-nav">
								<ul>
									<li @click="Revischange(index)" :class="revisstatus==index?'revisionLi func-flex func-bgfff func-mt20 liActive':'revisionLi func-flex func-bgfff func-mt20'" v-for="(item, index) in revisionListTwo" :key="item.index">
										<label>{{item.name}}</label>
										<label class="func-bold">{{item.vl1}}</label>
										<label>{{item.vl2}}</label>
										<label>{{item.vl3}}</label>
										<label>{{item.vl4}}</label>
										<label class="func-D02602 func-bold">{{item.vl5}}</label>
									</li>
									<li class="sumLi func-flex func-bgfff func-mt20" style="background: none;">
										<label>合计：</label>
										<label>10000</label>
										<label>10000</label>
										<label>10000</label>
										<label>10000</label>
										<label>10000</label>
									</li>
								</ul>
								<van-button class="btn-revision func-mt20" size="large" @click="allocation">调整</van-button>
							</div>
            </div>-->
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="bill-tabbar">
      <div class="tabbar-left" :style="bgState2" @click="save()">保存结算单</div>
      <div
        class="tabbar-right"
        :style="bgState"
        v-if="this.active!='2'"
        @click="next()"
      >{{bgnameState}}</div>
      <div
        class="tabbar-right"
        :style="bgState"
        v-if="this.active=='2'"
        @click="next1()"
      >{{bgnameState}}</div>
    </div>
  </div>
</template>

<script>
import { Dialog, Toast, Uploader } from "vant";
import Header from "@/components/Header.vue";
import api from "@/service/fetch";
import "../../mock/api/getSettlementSheetOnly";
import {
  apiAddBao,
  apiAddMan,
  apiAddSuperMan,
  apiUpdateMan,
  UpdateInsuranceBillStatus,
  sureBill
} from "@/api/example";
import moment from "moment";
import Cookies from "js-cookie";

export default {
  name: "Bill",
  components: {
    Header
  },
  data() {
    return {
      includedComponents: "Bill",
      savetype: false,
      workerList2: [],
      selectmanList: [],
      selectmanList1: [],
      result: [],
      result1: [],
      date1: "",
      liActive: false,
      taxListOnly: [],
      tiaozhengList: [],
      bgState: "background:#A4A4A4",
      bgState1: "background:#A4A4A4",
      bgState2: "background:#A4A4A4",

      bgnameState: "下一步·选择分配人员",
      addPickerState: false,
      addPickerState1: false,
      addPicker: false,
      addPicker1: false,
      // result:['0','1','2','3'],
      listOne: [
        {
          size: 5270,
          index: 0,
          checked: false,
          name: "张三"
        },
        {
          size: 5270,
          index: 1,
          checked: false,
          name: "李四"
        }
      ],
      list: [
        {
          index: 0,
          checked: false,
          name: "张三"
        },
        {
          index: 1,
          checked: false,
          name: "李四"
        },
        {
          index: 2,
          checked: false,
          name: "王五"
        },
        {
          index: 3,
          checked: false,
          name: "赵六"
        }
      ],
      currentDate: new Date(),
      currentDate2: new Date(),

      active: "1",
      value: "请选择保险公司",
      value1: "请选择出单日期",
      value2: "请选择受雇日期",

      formLine: {
        name: "张三(队长)",
        team: "T0001",
        remark: "无备注",
        date: "2019年2月10日",
        amount: "1200",
        type: "居民身份证",
        six: "男",
        idcard: "42377213128389",
        bank: "中国工商银行广州分行",
        bankaccount: "521371238129391",
        phone: "13789290012"
      },
      showPicker: false,
      timePicker: false,
      timePicker2: false,
      columns: ["中国人民财产保险", "中国人民财产保险1", "中国人民财产保险2"],
      revisstatus: null,
      formLineTwo: {
        name: "张三(队长)",
        team: "T0001",
        date: "2019年2月10日",
        type: "居民身份证",
        six: "男",
        idcard: "42377213128389",
        remark: "无备注",
        phone: "13789290012"
      },
      manList: [],
      manList1: [],
      companyList: [],
      companyidList: [],
      state1: false,
      state2: true,
      systemBillId: "",
      formadd: {
        billId: "",
        insuranceId: "",
        beginDate: "",
        commission: "",
        assuredMan: "",
        employeeId: "",
        employees: []
      }
    };
  },
  created() {
    api.MockData("/mock/getSettlementSheetOnly").then(res => {
      this.taxListOnly = res.rows;
      console.log(res, "res");
    });
  },
  mounted() {
    this.getapiAddBao();
    this.getapiAddMan();
    // this.getapiAddSuperMan(Cookies.get("employeeId"));
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false; // C 跳转到 A 时让 A 不缓存，即刷新
    next();
    //   if(to.path==="/Bill"){
    //             to.meta.keepAlive = true; // C 跳转到 A 时让 A 不缓存，即刷新
    //             next();
    // 	}else{
    // 		to.meta.keepAlive = true;
    // 		next();
    // 	}
  },
  methods: {
    save() {
      // 3.2.24.（新建结算单）保存结算单（保存结算单）
      if (
        this.state2 == false ||
        this.state1 == false ||
        this.bgState2 === "background:#A4A4A4"
      ) {
        return;
      }

      let parmers = {
        employees: []
      };
      parmers.systemBillId = this.systemBillId;
      parmers.assuredMan = this.formadd.assuredMan;
      parmers.beginDate = this.formadd.beginDate;
      parmers.billId = this.formadd.billId;
      parmers.commission = this.formadd.commission;
      parmers.employeeId = this.formadd.employeeId;
      parmers.insuranceId = this.formadd.insuranceId;
      // parmers.employees =;  待定
      let workerList = this.$store.state.workerList;
      // parmers.employees =this.workerList2;
      if (workerList.length != 0) {
        console.log("1===========");
        parmers.employees = workerList;
      } else {
        console.log("2===========");
        parmers.employees = this.workerList2;
      }
      console.log(workerList, "workerList=============");
      console.log(parmers, "parmers=============");
      if (this.savetype == true) {
        sureBill(parmers).then(resp => {
          Toast(resp.message);
          // this.$router.go(0);
          // this.$router.push({
          //       name: 'TobeSet',
          // })
          console.log(resp, "resp 保存结算单======");
        });
      }
    },
    /**
     * @param arr 查找数组
     * @param property 查找属性
     * @param value 查找值
     * @des:查找到值后返回其值
     */
    findArrayReturnValue(arr, property, value, findKey) {
      let len, findValue;
      if (!Array.isArray(arr)) {
        return;
      }
      len = arr.length;
      for (var i = 0; i < len; i++) {
        if (
          arr[i].hasOwnProperty(property) &&
          arr[i][property] == value &&
          arr[i].hasOwnProperty(findKey)
        ) {
          findValue = arr[i][findKey];
          break;
        }
      }
      return findValue;
    },
    deleteman(index) {
      this.selectmanList.splice(index, 1);
      this.formadd.employeeId = "";
      console.log(
        this.formadd.employeeId,
        "this.formadd.employeeId============删除后的"
      );
      if (this.selectmanList.length == 0) {
        this.addPickerState = false;
        this.bgState = "background:#A4A4A4";
        this.bgState2 = "background:#A4A4A4";
        this.bgnameState = "下一步·选择分配人员";
        this.state1 = false;
        this.manList1 = [];
      }
    },
    deleteman1(index) {
      if (typeof index != "undefined") {
        this.selectmanList1.splice(index, 1);
        this.formadd.employees.splice(index, 1);
        console.log(
          this.formadd.employees,
          "this.formadd.employees============删除后的"
        );
      }

      if (this.selectmanList1.length == 0) {
        this.addPickerState == false;
        this.addPickerState1 = false;
        // this.bgState = "background:#A4A4A4";
        this.bgState2 = "background:#A4A4A4";
        this.bgnameState = "下一步·选择分配人员";
        this.state2 = true;
      }
    },
    endTimeChange(e) {
      let endTimeArr = e.getValues(); //["2019", "03", "22", "17", "28"]

      console.log(endTimeArr, "endTimeArrendTimeArr====");
      this.date1 = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]}  `;
      console.log(this.date1, "this.date");
    },
    getapiAddBao() {
      apiAddBao().then(resp => {
        console.log(
          resp,
          " 3.2.10.（新建结算单）获取所有保险公司===================="
        );
        let arr = resp.data;
        this.companyList = arr.map(function(item, index, input) {
          return item.insuranceName;
        });
        this.companyidList = arr;
        console.log(this.companyidList, "所有保险公司=============");

        console.log(this.companyList, "所有保险公司");
      });
    },
    //    本单业务员
    getapiAddMan() {
      apiAddMan().then(resp => {
        console.log(
          resp,
          " // //3.2.11.（新建结算单）获取所有正式员工信息（本单业务员选择）===================="
        );
        this.manList = resp.data;
        console.log(this.manList, "所有正式员工信息-本单业务员选择");
      });
    },
    //    结算人员
    getapiAddSuperMan(employeeId) {
      apiAddSuperMan({
        employeeId: employeeId
      }).then(resp => {
        console.log(
          resp,
          " // //3.2.11.（新建结算单）获取所有员工信息（结算人员选择）===================="
        );
        this.manList1 = resp.data;
        console.log(this.manList1, "所有员工信息-结算人员选择");
      });
    },
    //   3.2.13.（新建结算单）移动端保存/更新结算单（调整确认/保存结算单）
    addapiUpdateMan(param) {
      apiUpdateMan(param).then(resp => {
        console.log(
          resp,
          " 移动端保存/更新结算单（调整确认/保存结算单）===================="
        );
        if (resp.code == 1) {
          this.tiaozhengList = resp.data[0].InsuranceBrokerages;
          this.$store.state.tiaozhengList = this.tiaozhengList;
          this.systemBillId = resp.data[0].insuranceBill.systemBillId;
          let List2 = resp.data[0].InsuranceBrokerages;
          let arrList = List2.map(function(item, index, input) {
            let son = {};
            son.isMaster = item.isMaster;
            son.employeeId = item.employeeId;
            son.memberMoney = item.memberMoney;
            return son;
          });
          this.workerList2 = arrList;
          console.log(this.workerList2, "this.workerList2==========");
          console.log(
            this.$store.state.tiaozhengList,
            "this.$store.state.tiaozhengList========================"
          );
          console.log(
            this.tiaozhengList,
            "this.tiaozhengList========================"
          );
        } else {
          this.$toast(resp.message);
          console.log(resp.message);
        }
      });
    },

    Revischange(index) {
      console.log("index:", index);
      this.revisstatus = index;
    },
    StateAdd() {
      if (this.result.length == 0) {
        return;
      } else {
        this.addPickerState = true;
        this.addPicker = false;
        this.state1 = true;
        if (this.state2 == true && this.state1 == true) {
          // this.bgState = "background:#1C203E";
          this.bgnameState = "下一步·调整确认";
        }

        this.selectmanList = this.result;
        this.formadd.employeeId = this.result[0].employeeId;
        console.log(
          this.formadd.employeeId,
          "本单业务员==================本单业务员"
        );
        console.log(
          this.result,
          "本单业务员this.result===================这个是复选框选到的东西"
        );

        // 再次请求结算人员
        this.getapiAddSuperMan(this.formadd.employeeId)
      }
    },
    StateAdd1() {
      if (this.result1.length == 0) {
        return;
      } else {
        this.addPickerState1 = true;
        this.addPicker1 = false;
        this.state2 = true;
        if (this.state2 == true && this.state1 == true) {
          this.bgState = "background:#1C203E";
          this.bgnameState = "下一步·调整确认";
        }
        this.selectmanList1 = this.result1;
        console.log(
          this.selectmanList1,
          "this.selectmanList1===============结算单列表"
        );

        // this.addlist(this.result1);
        var arrey = this.result1.map((item, index, input) => {
          return item.employeeId;
        });
        console.log(arrey, "=====arrey==============");
        this.formadd.employees = arrey;
        console.log(
          this.formadd.employees,
          "this.formadd.employees新增内容的结算人员的id列表============================"
        );
        console.log(
          this.result1,
          "结算人员this.result1===================这个是复选框选到的东西"
        );
      }
    },
    addlist(arrlist) {
      this.formadd.employees = arrlist;
      this.formadd.employees.map((item, index, input) => {
        input[index] = item.employeeId;
      });
      // this.formadd.employees = arrey;
      // console.log(arrey,'=====arrey==============');
      console.log(
        this.formadd.employees,
        "=====this.formadd.employees=============="
      );
    },
    next() {
      // if(this.addPickerState == true){
      if (this.state2 == true && this.state1 == true) {
        this.active = "2";
        this.savetype = true;
        this.bgnameState = "提交结算单";
        this.bgState2 = "background:#D02602";
        // 3.2.13.（新建结算单）移动端保存/更新结算单（调整确认/保存结算单）
        this.addapiUpdateMan(this.formadd);
        console.log(this.formadd, "我填写的数据===================");
      } else {
        if (
          this.value != "请选择保险公司" &&
          this.value1 != "请选择出单日期" &&
          !!this.formadd.billId &&
          !!this.formadd.assuredMan &&
          !!this.formadd.commission &&
          this.selectmanList.length != 0
        ) {
        }

        if (this.value == "请选择保险公司") {
          Toast("请选择保险公司");
        } else if (!this.formadd.billId) {
          Toast("请选入保单号");
        } else if (this.value1 == "请选择出单日期") {
          Toast("请选择出单日期");
        } else if (!this.formadd.assuredMan) {
          Toast("请选入被保人");
        } else if (!this.formadd.commission) {
          Toast("请选入佣金金额");
        } else if (!this.selectmanList.length) {
          Toast("请选择本单业务员");
        }
        console.log("没有填写完全=========");
      }
    },
    next1() {
      console.log("进入第二个按钮===============");
      let parmers = {};
      parmers.systemBillId = this.systemBillId;
      parmers.status = "1";
      parmers.billId = this.formadd.billId;
      UpdateInsuranceBillStatus(parmers).then(resp => {
        if (resp.code == 0) {
          this.$toast(resp.message);
        } else {
          this.$dialog
            .alert({
              message: "提交成功！"
            })
            .then(() => {
              this.$dialog.close();
              this.$router.push({
                path: `/TobeSet/${this.$store.state.employeeId}`
              });
            });
        }

        console.log(
          resp,
          "3.2.15.（新建结算单/待提交结算单）提交结算单=================="
        );
      });
    },
    onConfirm(value) {
      this.value = value;
      console.log(this.value, "this.value 保险公司====================");
      //   this.companyidList
      let id = this.findArrayReturnValue(
        this.companyidList,
        "insuranceName",
        value,
        "insuranceId"
      );
      this.formadd.insuranceId = id;
      console.log(id, "99999999999999999这就是保险公司的id");
      this.showPicker = false;
    },
    onConfirm1(value) {
      console.log(moment(value).format("YYYY-MM-DD"), "aaaaaaaaa");
      console.log(value, "============value");
      // let endTimeArr = value;//["2019", "03", "22", "17", "28"]
      // this.date1 = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]}  `
      //   this.value1 = value;
      this.value1 = moment(value).format("YYYY-MM-DD");
      this.formadd.beginDate = this.value1;
      // this.value1 = this.date1;
      this.timePicker = false;
      console.log(this.value1, "this.value1=============");
    },
    onConfirm2(value) {
      console.log(moment(value).format("YYYY-MM-DD"), "受雇从业日期");
      console.log(value, "============value");
      // let endTimeArr = value;//["2019", "03", "22", "17", "28"]
      // this.date1 = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]}  `
      //   this.value1 = value;
      this.value2 = moment(value).format("YYYY-MM-DD");
      // this.formadd.beginDate = this.value1;
      // this.value1 = this.date1;
      this.timePicker2 = false;
      console.log(this.value2, "this.value1=============");
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      }
      return value;
    },
    overlay() {
      this.addPicker = true;
      console.log(
        this.result,
        "本单this.result一开始复选框的值===================================="
      );
    },
    overlay1() {
      this.addPicker1 = true;
      console.log(
        this.result1,
        "结算this.result一开始复选框的值===================================="
      );
    },
    allocation() {
      // this.$router.push('/Allocation');
      this.$store.state.isRouterAlived = true;
      this.$router.push({
        path: `/Allocation/${this.systemBillId}`
      });
    },
    checkForm() {
      if (
        this.value != "请选择保险公司" &&
        this.value1 != "请选择出单日期" &&
        !!this.formadd.billId &&
        !!this.formadd.assuredMan &&
        !!this.formadd.commission &&
        this.selectmanList.length != 0
      ) {
        this.bgState = "background:#1C203E";
        this.StateAdd();
      } else {
        this.bgState = "background:#A4A4A4";
        this.bgnameState = "下一步·选择分配人员";
        this.state1 = false;
      }
    },
    toActive() {
      this.active = "1";
    },
    setVantPopupFontSize() {
      let cancel = document.getElementsByClassName("van-picker__cancel");
      let confirm = document.getElementsByClassName("van-picker__confirm");
      let column = document.getElementsByClassName("van-picker-column");

      var i;
      for (i = 0; i < cancel.length; i++) {
        console.log(JSON.stringify(cancel[i].style.fontSize));
        console.log(JSON.stringify(cancel[i].style.font));
        cancel[i].style.fontSize = '15px';
      }
      i = 0;
      for (i = 0; i < confirm.length; i++) {
        console.log(JSON.stringify(confirm[i].style.fontSize));
        console.log(JSON.stringify(confirm[i].style.font));
        confirm[i].style.fontSize = '15px';
      }
      i = 0;
      for (i = 0; i < column.length; i++) {
        console.log(JSON.stringify(column[i].style.fontSize));
        console.log(JSON.stringify(column[i].style.font));
        column[i].style.fontSize = '15px';
      }
    }
  },
  watch: {
    active(newName, oldName) {
      if (newName === "1") {
        this.bgState2 = "background:#A4A4A4";
        this.deleteman1();
      } else {
        if (this.state2 == false || this.state1 == false) {
          console.log(this.active, "active");
          this.toActive();
          Toast("请填写完成信息.");
          console.log(this.active, "active");
        }
      }
    },
    value: "checkForm",
    value1: "checkForm",
    "formadd.billId": "checkForm",
    "formadd.assuredMan": "checkForm",
    "formadd.commission": "checkForm",
    "selectmanList.length": "checkForm"
  }
};
</script>
<!--  scoped lang="scss" -->
<style scoped lang="scss">
/*基础样式*/
.spa1 {
  font-size: 24px !important;
}
.func-D02602 {
  color: #d02602 !important;
}
.func-bold {
  font-weight: bold;
}
.font-1C203E {
  color: #1c203e !important;
}
.func-mt20 {
  margin-top: 20px;
}
.func-iblock {
  display: inline-block;
  vertical-align: top;
}
.func-bgfff {
  background: #ffffff;
}
.func-flex {
  display: flex;
}
.func-bb1 {
  border-bottom: 1px solid #ebebeb;
}
.func-br1 {
  border-right: 1px solid #ebebeb;
}
.width100 {
  width: 90%;
  margin-left: 5%;
}
.liActive {
  background: #ffffff !important;
}
/*基础样式*/
.title {
  margin-top: 200px;
  .van-tabs--line .van-tabs__wrap {
    height: 84px;
  }
  .van-tab span {
    line-height: 84px;
    font-size: 30px;
  }
  .bill-title label {
    line-height: 90px;
    font-size: 30px;
    font-weight: bold;
    width: 100%;
    display: inline-block;
    text-align: center;
  }
  .list {
    .name,
    .photo {
      flex: 1;
      padding: 30px;
    }
    .name {
      label {
        font-size: 26px;
        color: #9e9e9e;
        width: 100%;
        line-height: 40px;
      }
      input {
        width: 100%;
        font-size: 32px;
        font-weight: bold;
        line-height: 60px;
      }
      h1 {
        width: 100%;
        font-size: 32px;
        font-weight: bold;
        color: #1c203e;
        line-height: 60px;
      }
    }
  }
  .bill-list {
    margin-bottom: 60px;
    .bill-choose,
    .addList-title {
      line-height: 90px;
      font-size: 30px;
      width: 100%;
      text-align: center;
    }
  }
  .bill-list1 {
    margin-bottom: 120px;
    .bill-choose,
    .addList-title {
      line-height: 90px;
      font-size: 30px;
      width: 100%;
      text-align: center;
    }
  }
  .addList {
    width: 100%;
    .addList-title {
      color: #fafafa;
      text-align: center;
      font-weight: bold;
    }
    .addList-nav {
      width: 90%;
      text-align: center;
      margin-left: 5%;
      .addList-item {
        width: 100%;
        border-radius: 70px;
        display: flex;
        .styleList {
          width: 380px;
          .nav-head {
            flex: 1;
            img {
              width: 50px;
              height: 50px;
              line-height: 100px;
            }
          }
          .nav-name {
            flex: 4;
            width: 200px;
            color: #1c203e;
            line-height: 100px;
            font-weight: bold;
            font-size: 24px;
            text-align: left;
          }
        }
      }
    }
    .addList-confirm {
      text-align: center;
      margin-top: 40px;
    }
  }
  .columList {
    width: 90%;
    margin-left: 5%;
    .chooseList-item {
      display: flex;
      .chooseList {
        width: 500px;
        border-radius: 70px;
        padding-left: 30px;
        .nav-head {
          flex: 1;
          img {
            width: 50px;
            height: 50px;
            line-height: 100px;
          }
        }
        .choose-name,
        .choose-size {
          flex: 4;
          line-height: 100px;
          font-weight: bold;
          font-size: 24px;
          text-align: left;
        }
        .choose-name {
          width: 100px;
          color: #1c203e;
          padding-left: 30px;
        }
        .choose-size {
          width: 100px;
          color: #e52300;
          text-decoration: underline;
        }
      }
    }
    .choose-delete {
      margin-left: 20px;
      line-height: 100px;
    }
  }
  .styleList,
  .chooseList {
    font-size: 0px;
    margin-left: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .number_list {
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
    .btn-revision {
      width: 90%;
      margin-left: 5%;
      border-radius: 35px;
      line-height: 80px;
      height: 80px;
      background: #1c203e;
      color: #fafafa;
    }
  }
}
.bill-tabbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  .tabbar-left,
  .tabbar-right {
    flex: 1;
    color: #fafafa;
    line-height: 100px;
    text-align: center;
  }
  // .tabbar-left{background: #D02602;}
  // .tabbar-left{background: #A4A4A4;}

  // .tabbar-right{background: #A4A4A4;}
}
</style>
