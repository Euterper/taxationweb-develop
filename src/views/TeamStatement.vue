<template>
    <div>
        <Header headerName="团队结算单"></Header>
        <div class="Team_filter">
            
        </div>
        <div class="new_content">
            <span class="new_content_title">{{pageStatus==1?'你有1个新的结算单已结算':'请及时处理'}}</span>
            <div :class="pageStatus==1?'new_content_info':'new_content_info new_content_info_height'" v-for="(item,index) in newAboutList" :key="index">
                <div class="time">
                    <span>
                    {{item.time}}
                    </span>
                </div>
                <div class="info">
                    <div class="info_name">
                        <span>{{item.insuranceName}}</span><span>{{item.insuranceNum}}</span>
                    </div>
                    <div class="info_mess">
                        <div>
                            <span>税前佣金</span>
                            <span>{{item.price}}</span>
                        </div>
                        <div>
                            <span>结算人数</span>
                            <span>{{item.peopleNum}}</span>
                        </div>
                        <div>
                            <span>结算状态</span>
                            <span :class="item.status==1?'status1':item.status==2?'status2':item.status==3?'status3':'status4'">{{item.statusName}}</span>
                        </div>
                    </div>
                    <div class="info_btn" v-if="pageStatus==2">
                        <span :class="item.status!=3?'btn_del btn_width':'btn_del'">删除</span>
                        <span class="btn_edit" v-if="item.status==3">调整</span>
                        <span class="btn_sub">提交结算单</span>
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
    import { getSettlementStatus } from "@/service/app_main_service"
  export default {
    name: 'HelloWorld',
    components: {
        Header
    },
    data () {
      return {
          pageStatus:1,//1新通知，2待提交
          newAboutList:[]
      }
    },
    created () {
        api.MockData('/mock/newAbout').then(res=>{
            this.newAboutList =res.rows
            this.newAboutList.forEach(item=>{
                item.statusName= getSettlementStatus(2,item.status)
            })
            
            console.log(res,'res')
        })
    },
    mounted () {
        document.title="保险行业税务计算系统"
    },
    methods: {
        
    },
    watch: {
        
    }
  }
</script>
<style scoped lang="scss">
    .new_content{
        margin-top:90px;
        padding:0 66px;
        .new_content_title{
            font-size:42px;
            font-weight:bold;
            color:#30355e;
            padding:70px 0;
            display: block;

        }
        .new_content_info{
            overflow: hidden;
            background-color:#fff;
            box-shadow: 0px 0px 10px 3px #ccc;
            border-radius:8px;
            margin-bottom:40px;
            height:215px;
            .time{
                float:left;
                width:100px;
                height:100%;
                position: relative;
                span{
                    color:#d6dce5;
                    font-size:18px;
                    display:block;
                    width:30px;
                    height:35px;
                    padding:15px;
                    padding-top:10px;
                    background:#32385b;
                    border-radius:50%;
                    font-size:18px;
                    font-weight:bold;
                    position: absolute;
                    top:50%;
                    left:50%;
                    transform: translate(-50%,-50%);
                    word-wrap:break-word;
                    line-height:22px;
                }
            }
            .info{
                float:left;
                width:516px;
                height:100%;
                border-radius:20px 0 0 20px;
                // border-left:2px solid #ccc;
                box-shadow: 0px 0px 10px 1px #ccc;
                .info_name{
                    margin:0 50px 0 40px;
                    height:88px;
                    line-height:88px;
                    border-bottom:1px solid #f2f4fb;
                    span{
                       color:#3a4269;
                       font-weight:bold; 
                    }
                    span:first-child{
                        font-size:24px;
                    }
                    span:last-child{
                        float:right;
                    }
                }
                .info_mess{
                    margin-top:30px;
                    margin-left:60px;
                    >div{
                        display:inline-block;
                        margin-right:50px;
                        text-align:center;
                        span{
                            display:block;
                            line-height:40px;
                        }
                        span:first-child{
                            color:#a4a4b9;
                            font-size:18px;
                        }
                        span:last-child{
                            font-weight:bold;
                            font-size:22px;
                            color:#30355e;
                        }
                    }
                    div:nth-child(3){
                    //    span:last-child{
                    //         color:#3ba287;
                    //     } 
                        .status1{
                            color:#3ba287;
                        }
                        .status2{
                            color:#ce8144;
                        }
                        .status3{
                            color:#ce8144;
                        }
                        .status4{
                            color:#da5764;
                        }
                    }
                }
                .info_btn{
                    height:46px;
                    padding:40px 0px 24px 40px;
                    span{
                        height:44px;
                        color:#fff;
                        font-weight:bold;
                        font-size:20px;
                        border-radius:22px;
                        display:inline-block;
                        line-height:44px;
                        text-align:center;
                    }
                    .btn_del{
                        background:#f3a4ba;
                        width:93px;
                        margin-left:10px;
                    }
                    .btn_edit{
                        background:#2e3564;
                        width:93px;
                        margin-left:40px;
                    }
                    .btn_sub{
                        background:#2e3564;
                        width:162px;
                        margin-left:40px;
                    }
                    .btn_width{
                        width:162px;
                        margin-right:10px;
                    }
                }
            }
        }
        .new_content_info_height{
            height:300px;
        }
    }
</style>
