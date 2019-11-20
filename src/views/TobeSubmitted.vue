<template>
    <div>
        <Header headerName="新通知"></Header>
        <div class="new_content">
            <span class="new_content_title">{{pageStatus==1?'你有1个新的结算单已结算':'请及时处理'}}</span>
            <div class="new_content_info" v-for="(item,index) in newAboutList" :key="index">
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
                            <span>{{item.status}}</span>
                        </div>
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
            height:215px;
            background-color:#fff;
            box-shadow: 0px 0px 10px 3px #ccc;
            border-radius:8px;
            margin-bottom:40px;
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
                    height:30px;
                    padding:15px;
                    background:#32385b;
                    border-radius:50%;
                    font-size:18px;
                    font-weight:bold;
                    position: absolute;
                    top:50%;
                    left:50%;
                    transform: translate(-50%,-50%);
                    word-wrap:break-word;
                    line-height:20px;
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
                       span:last-child{
                            color:#3ba287;
                        } 
                    }
                }
            }
        }
    }
</style>
