<template>
  <div class="personal">
    <Header headerName="团队配置">
      <img src="@/assets/images/write.png" slot="right" @click="toAddTeamMember"/>
    </Header>
    <div class="head">
      <div class="head_box flex-row-start">
        <div class="flex-center1-column spa3 marr">
          <div style="font-size: 25px;">{{manList.teamId}}</div>
          <div>{{manList.teamName}}</div>
          <!-- <div style="font-size: 25px;">团队长</div>
          <div>李四</div>-->
        </div>
        <div class="flex-center1-column spa3 marr1">
          <!-- <div style="font-size: 25px;">{{manList.teamId}}</div>
          <div>{{manList.leaderName}}</div>-->
          <div style="font-size: 25px;">团队长</div>
          <div>{{manList.leaderName}}</div>
        </div>
      </div>
      <div class="spa1 posfix">团队成员</div>
    </div>
    <div class="content">
      <van-loading size="42px" v-show="isLoading" vertical>加载中...</van-loading>
      <div class="centercall" v-for="(item,index) in settlementList" :key="index">
        <div class="boss flex-row-around" @click="item.isDisplay=!item.isDisplay">
          <div class="iconme" v-if="item.isDisplay== false">
            <van-icon name="arrow-down" size="25px" />
          </div>
          <div class="iconme" v-if="item.isDisplay==true">
            <van-icon name="arrow" size="25px" />
          </div>
          <div class="avator">
            <img class="ava" src="@/assets/images/time.jpg" alt />
          </div>
          <div class="spa1">
            {{item.employeeName}}
            <!-- {{item.name}} -->
          </div>
          <div class="spa1">
            {{item.employeeId}}
            <!-- {{item.number}} -->
          </div>
        </div>
        <transition-group appear tag="ul" class="hello">
          <div
            v-show="item.isDisplay"
            v-for="(Citem) in item.subEmployee"
            :key="Citem.employeeName"
            class="son flex-row-around"
          >
            <div class="avator1">
              <img class="ava" src="@/assets/images/time.jpg" alt />
            </div>
            <div class="spa1">
              {{Citem.employeeName}}
              <!-- {{Citem.name}} -->
            </div>
            <div class="spa1">
              {{Citem.employeeId}}
              <!-- {{Citem.num}} -->
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <div>
      <!-- <div class="top"  v-show="added">111111111111111</div> -->
      <div class="addfix">
        <!-- <van-popup show="{{ added }}" bind:close="onClose"> -->
        <div class="box flex-row-around1" style="margin-left: 1px;" v-show="added">
          <div
            class="box1 spa3 flex-center1-column"
            style="font-size: 20px;"
            @click="toAddTeamMember()"
          >
            <span>添加</span>
            <span>团队成员</span>
          </div>
          <div class="box2 spa1 flex-center1-column" style="font-size: 20px;" @click="toAddme()">
            <span>新增</span>
            <span>私属成员</span>
          </div>
          <img class="img2" style="width:13%" src="@/assets/images/arrow.png" alt />
        </div>
        <!-- </van-popup> -->

        <img style="width:13%" src="@/assets/images/add.png" @click="add" alt />
      </div>
    </div>
  </div>
</template>
<script>
    import {GetTeamInfo} from "@/api/example"
    import Header from "@/components/Header.vue";
    import api from "@/service/fetch";
    import "../../mock/api/Settlement";
  export default {
    name: 'Settlement',
    components: {
        Header
    },
    data () {
      return {
          list:[{name:'张三',number:'A0001'},{name:'李四',number:'A0002'},{name:'王五',number:'A0003'}],
          isDisplay: false,
          added:false,
          settlementList:[],
          manList:[],
          isLoading: true
      }
    },
    created () {
        // api.MockData('/mock/Settlement').then(res=>{
        //     this.settlementList =res.rows
        //     console.log('团队配置:',res)
        // })
    },
    mounted () {
        this.GOGetTeamInfo()
    },
    methods: {
      GOGetTeamInfo(){
        this.isLoading = true
        GetTeamInfo().then(resp =>{
            this.settlementList =resp.data[0].teamDetails;
            this.manList =resp.data[0].teamInfo;
            console.log(resp,'resp')
            this.isLoading = false
        })
      },
      add(){
           this.added = !this.added
      },
     onClose() {
         this.setData({ added: false });
     },
    toAddTeamMember(){
         this.$router.push({
             name:"AddTeamMember"
         })
     },
     toAddme(){
         this.$router.push({
             name:"Addme"
         })
     }
    },
    watch: {
        
    }
  }
</script>
<style scoped lang="scss">
.top {
  height: 100%;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  opacity: 0.5;
  filter: alpha(opacity=50);
}

.box {
  width: 79%;
  height: 250px;
  position: relative;
  background: #fff; /* 自右向左 */
  -webkit-box-shadow: 0 0 0 1px #fff;
  box-shadow: 0 0 0 1px #fff;
  border-radius: 28px;
  margin-left: -220px;
  margin-bottom: 38px;
  z-index: 1001;
}
.img2 {
  position: absolute;
  left: 260px;
  bottom: -38px;
}
.box1 {
  width: 41%;
  height: 128px;
  background: #232a47; /* 自右向左 */
  -webkit-box-shadow: 0 0 0 1px #fff;
  box-shadow: 0 0 0 1px #fff;
  border-radius: 28px;
}
.box2 {
  width: 41%;
  height: 128px;
  background: #edf4fa; /* 自右向左 */
  -webkit-box-shadow: 0 0 0 1px #fff;
  box-shadow: 0 0 0 1px #fff;
  border-radius: 28px;
}
/////////////////////////////////////
.addfix {
  position: fixed;
  // margin:100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: 0px;
  // z-index: 20px;
  width: 100%;
  padding: 40px 0;
  background: #edf4fa;
}
.hello {
  width: 90%;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(80px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.6s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
  //  transition: max-height .5s ease-in;
}
.iconme {
  margin-top: 10px;
}
.avator {
  // margin-left: -70px;
}
.ava {
  width: 80px;
  border-radius: 50%;
}
// i{
//     position: absolute;
//     -webkit-transform: translateX(50%);
//     transform: translateX(50%);
//     top: -5px;
//     right: 17px;
//     height: 50px;
//     border-radius: 50px;
//     min-width: 44px;
//     background: #ed3f14;
//     border: 1px solid transparent;
//     color: #fff;
//     line-height: 48px;
//     text-align: center;
//     padding: 0 5px;
//     font-size: 36px;
//     white-space: nowrap;
//     -webkit-transform-origin: -10% center;
//     transform-origin: -10% center;
//     z-index: 10;
//     -webkit-box-shadow: 0 0 0 1px #fff;
//     box-shadow: 0 0 0 1px #fff;
// }
.marr {
  margin-left: 120px;
}
.marr1 {
  margin-left: 64px;
}
.spa1 {
  font-family: SourceHanSansCN-Medium;
  font-size: 36px;
  font-weight: bold;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #282f59;
  padding-bottom: 8px;
  // padding-top: 34px;
}
.spa2 {
  font-family: SourceHanSansCN-Medium;
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #282f59;
  padding-bottom: 8px;
  // padding-top: 34px;
}
.spa3 {
  font-family: SourceHanSansCN-Medium;
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  letter-spacing: 0px;
  color: white;
  padding-bottom: 8px;
  // padding-top: 34px;
}
.pad-leftt {
  padding-left: 20px;
}
.pad {
  padding-left: 15px;
  padding-right: 15px;
}
.circle {
  width: 150px;
  height: 150px;
  background: #31365f;
  -moz-border-radius: 75px;
  -webkit-border-radius: 75px;
  border-radius: 75px;
}
.flex-center-column {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.flex-row-start {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-direction: row;
  align-items: center;
}
.flex-row-between {
  display: flex;
  align-content: center;
  justify-content: space-between;
}
.flex-row-around1 {
  display: flex;
  align-content: center;
  justify-content: space-around;
  align-items: center;
  // margin-left: 140px;
}
.flex-row-around {
  display: flex;
  align-content: center;
  justify-content: space-around;
  align-items: center;
  margin-left: 140px;
}
.flex-row-center {
  display: flex;
  flex-direction: row;
}
.flex-row {
  display: flex;
  flex-direction: row;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.flex-center1-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mar-t {
  margin-top: 143px;
}
.mar-t2 {
  margin-top: 34px;
}
.image1 {
  width: 70%;
}
.mar-h {
  padding-left: 196px;
}

.personal {
  width: 100%;
  height: 100%;
  overflow: scroll;
  background: #edf4fa;
  position: relative;
  .head {
    width: 100%;
    height: 344px;
    background: #ffffff;
    box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.1); //1.水平阴影  2.垂直阴影 3.模糊距离，改虚实 4.阴影尺寸
    margin-top: 88px;
    position: fixed;
    top: 0;
    z-index: 1000;
    .head_box {
      width: 80%;
      height: 203px;
      background: linear-gradient(to left, #f2a3b9, #3d5ef4); /* 自右向左 */
      -webkit-box-shadow: 0 0 0 1px #fff;
      box-shadow: 0 0 0 1px #fff;
      border-radius: 30px;
      position: absolute;
      top: 40px;
      /* right: 7px; */
      left: 80px;
    }
    .posfix {
      position: absolute;
      left: 300px;
      bottom: 10px;
    }
  }
  .centercall {
    margin-top: 20px;
    //   padding-left: 90px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .boss {
    margin-top: 20px;
    width: 75%;
    height: 120px;
    background: #fff; /* 自右向左 */
    -webkit-box-shadow: 0 0 0 1px #fff;
    box-shadow: 0 0 0 1px #fff;
    border-radius: 114px;
    margin-right: 100px;
  }
  .son {
    margin-top: 20px;
    width: 65%;
    height: 120px;
    background: #fff; /* 自右向左 */
    -webkit-box-shadow: 0 0 0 1px #fff;
    box-shadow: 0 0 0 1px #fff;
    border-radius: 114px;
    margin-right: 100px;
  }
}
.content {
  margin: 486px 0 200px;
}
</style>
