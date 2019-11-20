<template>
    <div>
        <Header headerName="收付调节单"></Header>
        <div class="new_content">
            <div>
                <div class="time">
                    <span>
                    03<br>25
                    </span>
                </div>
                <div class="contenttxt">
                    <div>平安财险</div>
                    <div>1049456785241552145855</div>
                </div>
            </div>
            <div  class="contentflexbox">
            <div class="contentflex">
                <div>
                    <span>税前佣金</span>
                    <span>3000</span>
                </div>
                <div>
                    <span>个人所得税</span>
                    <span>10</span>
                </div>
                <div>
                    <span>增值税</span>
                    <span>0</span>
                </div>
                <div>
                    <span>城建及附加</span>
                    <span>0</span>
                </div>
                <div>
                    <span>实得金额</span>
                    <span>3000</span>
                </div>
            </div>
            </div>
        </div>        
        <table border="0" frame=void  class="listflex">
            <tr>
                <td>
                    <span>类型</span>
                    <span>{{dataList.type}}</span>
                </td>
                <td>
                    <span>收款方</span>
                    <span>{{dataList.name}}</span>
                </td>
            </tr>
            <tr>
                <td>
                    <span>分配金额</span>
                    <span>{{dataList.price1}}</span>
                </td>
                <td>
                    <span>已缴税费</span>
                    <span>{{dataList.price2}}</span>
                </td>
            </tr>
           <tr>
                <td colspan="2">
                    <span>实付金额</span>
                    <span style="color:#D74329;">{{dataList.price3}}</span>
                </td>
            </tr>           
        </table>
        <div class="footerbtn">
            <input type="button" value="已付款" @click="payedSubmit">
            <input type="button" value="付款" @click="paySubmit">
        </div>
    </div>
</template>
<script>
    import Header from "@/components/Header.vue";
    import api from "@/service/fetch";
    import "../../mock/api/accountListPrivate";
  export default {
    name: 'AccountListPrivate',
    components: {
        Header
    },
    data () {
      return {
          dataList:[]
      }
    },
    created () {
        api.MockData('/mock/accountListPrivate').then(res=>{
            this.dataList =res
            console.log(res,'res')
        })
    },
    mounted () {
        document.title="保险行业税务计算系统"
    },
    methods: {
        payedSubmit(){
            console.log('payed');
        },
        paySubmit(){
            console.log('pay');
        }
    },
    watch: {
        
    }
  }
</script>
<style scoped lang="scss">
    .new_content{
       position:fixed;  top:89px; width: 100%;
        background:#fff;
        z-index:1000;
        box-shadow: 0px 3px 3px 1px rgba(0,0,0,0.1);        
        .time{
            margin: 115px 0 0 155px;     
                color:#fff;
               float: left;
                width:70px;
                height:70px;
                padding:15px;
                background:#32365b;
                border-radius:50%;
                font-size:36px;
                font-weight:bold;
                text-align: center;
                transform: translate(-50%,-50%);
                word-wrap:break-word;
                line-height:36px; 
        }
        .contenttxt{   
             float: left;
            font-size:30px;
            font-weight:bold;
            color:#30355e;
            padding:65px 0 0 0;
            line-height: 54px;
            div:last-child{
                font-size: 24px;
                padding-left:30px;
            }
        }
    }    
    .contentflexbox{padding: 0 70px;clear: both;}
    .contentflex{
        display: flex; justify-content: space-between; 
        border-top: 1px solid #f0f4f7;
        margin-top:70px;padding: 40px 0 0;
            div{
                span{
                    display: block; padding-bottom:20px;
                    text-align: center; font-size: 24px; line-height: 24px; color: #767390;
                }
                span:last-child{
                    font-size: 36px;line-height:36px; font-weight: 700;color: #80809a;
                    padding-bottom:35px;
                    }
            }
            div:first-child{
                span:last-child{color: #2F3565;}
            } 
            div:last-child{
                span:last-child{color: #CD2E06;}
            } 
    }
    .listflex{
        margin-top: 520px; width: 100%;
        background-color: #fefefe;border-collapse:collapse;
        td{
            padding: 25px 0 0 45px;border:1px solid #e8e8e8; height: 130px;
            span{display: block;}
            span:first-child{font-size: 22px; color: #a4a4a4; line-height: 40px;}
            span:last-child{font-size: 30px;font-weight: 700;color: #0F1137; line-height: 40px;}
        }
    }
   .footerbtn{
       height:120px;
        line-height:120px;
        background:#fff; color: #fff; font-weight: 700;  font-size: 34px;      
        position: fixed;
        bottom:0px;
        width:100%;
       input{
           width: 50%;text-align:center;float: left;
       }
       input:first-child{background-color: #D02602;}
       input:last-child{background-color: #242947;}
   }
</style>
