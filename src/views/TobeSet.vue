<template>
    <div  class="personal">
        <div class="head flex-row">
            <div class="heaer-log " >
                <div class="logword">您好</div>
                <div class="logword">团队长{{ownName}}</div>
            </div>
            <div class="mar-h" @click="toPersonInfo()">
                <img class="image1" src="@/assets/images/man.png" alt="" >
            </div>
        </div>
        <div class="flex-row-around mar-t pad">
            <div class="person flex-center-column" @click="toNewAbout(1)">
                <i>!</i>
                <img style="width:25%" src="@/assets/images/p3.png" alt="" >
                <div class="spa1">新通知</div>
                </div>
            <div class="person flex-center-column" @click="toNewAbout(2)" v-if="loginStatus==1">
                <i>1</i>
                <img style="width:35%" src="@/assets/images/p4.png" alt="" >
                <div class="spa1">待提交</div>
            </div> 
            <div class="person flex-center-column" @click="toNewAbout(4)" v-if="loginStatus==2">
                <img style="width:27%" src="@/assets/images/p1.png" alt="" >
                 <div class="spa1">我的结算单</div>
            </div>
        </div>
        <div class="flex-row-around mar-t2 pad" v-if="loginStatus==1">
            <div class="person flex-center-column" @click="toNewAbout(3)">
                <img style="width:35%" src="@/assets/images/p2.png" alt="" >
                 <div class="spa1">团队结算单</div>
            </div>
            <div class="person flex-center-column" @click="toNewAbout(4)">
                <img style="width:27%" src="@/assets/images/p1.png" alt="" >
                 <div class="spa1">我的结算单</div>
            </div>
        </div>
       
       <div class="footer flex-row-between" v-if="loginStatus==1">
           <div class="btn" @click="toSettlement()">
               团队配置
           </div>
           <div>
               <img @click="toBill()" style="width:55%" src="@/assets/images/add.png" alt="" >
           </div>
       </div>
        
    </div>
</template>
<script>
import {apiGetnews} from "@/api/example"
import Cookies from "js-cookie"

  export default {
    name: 'TobeSet',
    components: {},
    data () {
      return {
        //   ownName:this.$store.state.ownName,
          ownName:Cookies.get('ownName'),
        //   employeeId:this.$store.state.employeeId, 
		// this.systemBillId = this.$route.params.id;
          employeeId:Cookies.get('employeeId')||this.$route.params.employeeId,
          loginStatus:null
      }
    },
    created () {
        this.loginStatus=this.$store.state.loginStatus
        console.log(encodeURIComponent(window.location.origin+"/#/"+'/Login'));
    },
    mounted () {
        // console.log(this.$store.state.employeeId,'this.$store.state.employeeId,999999999')
         console.log(Cookies.get('employeeId'),'Cookies.get(employeeId),,999999999')
    },
     beforeRouteLeave(to, from, next) {
		      if(to.path==="/Bill"){
                        to.meta.keepAlive = false; // C 跳转到 A 时让 A 不缓存，即刷新
                        next();
                }else{
                    to.meta.keepAlive = false;
                    next();
                } 
		 },
    methods: {
        getboy(){
              let paramer ={
                //   employeeId:this.$store.state.employeeId,
                 employeeId: Cookies.get('employeeId')
              };
              apiGetnews(paramer).then(resp =>{
                     if(resp.code==1){
                      let data = resp.data[0].data
                     }else{
                         console.log('调用3.2.4.获取私属员工信息接口返回code为0失败')
                     }
              })
        },
        toNewAbout(type){
            console.log("type:",type)
            this.$store.state.pageStatus =type;
            Cookies.set("pageStatus", type);
            console.log(this.$store,'this.$store');
            this.$store.state.isRouterAlived =false;
            // this.$router.go(0);
            console.log(this.$store.state.isRouterAlived,'this.$store.state.isRouterAlived开始');
            this.$nextTick(function(){
                this.$store.state.isRouterAlived=true
            })
            console.log(this.$store.state.isRouterAlived,'this.$store.state.isRouterAlived结束');

            this.$router.push({
                name:'SettlementSheet',
                // params:{
                //     pageStatus:type
                // }
                query:{
                    pageStatus:type,
                    employeeId:this.employeeId
                }
            })
            // this.$nextTick(function(){
            //      this.$store.state.isRouterAlived=true
            // })
        },
        // 跳转到团队配置
        toSettlement(){
            this.$router.push({
                name:'Settlement'
            })
        },
        //跳转到个人信息
        toPersonInfo(){
            this.$router.push({
                name:'PersonInfo'
            })
        },
        //跳转到新建分配金额
        toBill(){
            // this.$store.state.isRouterAlived = true;
            // console.log(this.$store.state.isRouterAlived,'this.$store.state.isRouterAlived按下新增的时候=================');
            this.$router.push({
                name:'Bill'
            })
        }
    },
    watch: {
        
    }
  }
</script>
<style scoped lang="scss">
i{
    position: absolute;
    -webkit-transform: translateX(50%);
    transform: translateX(50%);
    top: -5px;
    right: 17px;
    height: 50px;
    border-radius: 50px;
    min-width: 44px;
    background: #ed3f14;
    border: 1px solid transparent;
    color: #fff;
    line-height: 48px;
    text-align: center;
    padding: 0 5px;
    font-size: 36px;
    white-space: nowrap;
    -webkit-transform-origin: -10% center;
    transform-origin: -10% center;
    z-index: 10;
    -webkit-box-shadow: 0 0 0 1px #fff;
    box-shadow: 0 0 0 1px #fff;
}
.spa1{
     font-family: SourceHanSansCN-Medium;
    font-size: 34px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #282f59;
    padding-bottom: 8px;
    padding-top: 34px;
}
.pad{
    padding-left: 15px;
    padding-right: 15px;
}
.flex-center-column{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.flex-row-start{
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-direction: row;
}
.flex-row-between{
    display: flex;
    align-content: center;
    justify-content: space-between;
}
.flex-row-around{
    display: flex;
    align-content: center;
    justify-content: space-around;
}
.flex-row{
  display: flex;
  flex-direction: row;
}
.flex-column{
  display: flex;
  flex-direction: column;
}
.flex-center1-column{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mar-t{
          margin-top: 143px;
      }
.mar-t2{
    margin-top: 34px;
}
.image1{
                width: 70%;
            }
.mar-h{
    padding-left: 196px
}
.personal{
  width: 100%;
  height: 100%;
  overflow: scroll;
  background:#edf4fa;
    .head{
            width: 98%;
            height: 5%;
            margin-top: 9%;
            .heaer-log{
            width: 40%;
            margin-left: 2px;
            margin-top: -14px;
            padding-left: 62px;
            
                .logword{
                    font-family: SourceHanSansCN-Medium;
                    font-size: 45px;
                    font-weight: bold;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #000000;
                    padding-bottom: 8px;
                }
                .logview {
                    font-family: SourceHanSansCN-Regular;
                    font-size: 15px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #858689;
                    }
                }
        }
    .person{
        width: 290px;
        height: 290px;
        background:#ffffff;
        box-shadow: 0px 2px 20px 0px rgba(10, 5, 8, 0.10);
        // box-shadow:2px 2px 3px  rgba(0, 0, 0, 0.1) ;
        padding: 10px 0 ;
        border-radius: 32px;
        position: relative;  
        
    }
    .person:hover{
            box-shadow:2px 2px 3px  rgba(0, 0, 0, 0.1) ;
            transition: all 0.1s cubic-bezier(.55, 0, .1, 1);  
    }
    .footer{
         position: absolute;
        left: 0;
        bottom: 80px;
        // z-index: 20px;
        width: 100%;
        .btn{
            margin-left: 46px;
            width: 245px;
            height: 97px;
            background:#ffffff;
            box-shadow: 0px 2px 20px 0px rgba(10, 5, 8, 0.10);
            padding: 5px 0 ;
            border-radius: 98px;
            font-family: SourceHanSansCN-Medium;
            font-size: 45px;
            font-weight: bold;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #000000;
            line-height: 97px;  
            vertical-align:middle;
            text-align: center;
        }
        
        
    }
}
</style>
