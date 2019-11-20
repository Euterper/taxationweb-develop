<template>
    <div>
        <Header headerName="业务统计"></Header>
        <!-- 我是结算单 -->
        <div class="my_header">
            <div class="my_header_box">
                <span class="my_header_sum">年度累计收入</span>
                <span class="my_header_price">292130</span>
                <div class="my_header_nav">
                    <div>
                        <span>累计个税</span>
                        <span>2143</span>
                    </div>
                    <div>
                        <span>累计增值税</span>
                        <span>872</span>
                    </div>
                    <div>
                        <span>累计城建税</span>
                        <span>421</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="number_list">
            <div class="number_name">
              <span>税前佣金</span>
              <span>实际所得</span>
              <span>个税</span>
              <span>增值税</span>
              <span>城建及附加</span>
            </div>
            <div class="number_price" v-for="(item,index) in taxList" :key="index">
                <span>2019.{{item.time}}</span>
                <span>{{item.price1}}</span>
                <span>{{item.price2}}</span>
                <span>{{item.price3}}</span>
                <span>{{item.price4}}</span>
                <span>{{item.price5}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from "@/components/Header.vue";
    import api from "@/service/fetch";
    import "../../mock/api/taxList";
  export default {
    name: 'HelloWorld',
    components: {
        Header
    },
    data () {
        return {
            taxList:[],
            yearData:2019,
            yearOption:[
                { text: '2019', value: 2019 },
                { text: '2018', value: 2018 },
                { text: '2017', value: 2017 },
                { text: '2016', value: 2016 },
                { text: '2015', value: 2015 },
                { text: '2014', value: 2014 }
            ]
        }
    },
    created () {
        api.MockData('/mock/taxList').then(res=>{
            this.taxList =res.rows
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
    .my_header{
        position:fixed;
        top:89px;
        padding:0 66px 48px;
        background:#fff;
        z-index:1000;
        .my_header_box{
            background: -webkit-linear-gradient(left, #4d67f7,#e59ab6); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, #4d67f7,#e59ab6); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, #4d67f7,#e59ab6); /* Firefox 3.6 - 15 */
            background: linear-gradient(to right, #4d67f7,#e59ab6); /* 标准的语法 */
            width:518px;
            height:208px;
            border-radius:20px;
            padding:36px 50px 40px;
            span{
                font-weight:bold;
                color:#fff;
            }
            .my_header_sum{
                font-size:20px;
                display:block;
                text-align:center;
            }
            .my_header_price{
                font-size:35px;
                display:block;
                text-align:center;
            }
            .my_header_nav{
                border-top:2px solid #fff;
                text-align:center;
                margin-top:20px;
                >div{
                    display:inline-block;
                    padding:34px 20px 0;
                    span{
                        display:block;
                        margin-bottom:5px;
                    }
                }
            }
        }
    }
    .number_list{
        margin-top:460px;
        .number_name{
            // float:right;
            margin-left:180px;
            span{
                text-align:center;
                display:inline-block;
                color:#c8cdde;
                font-size:12px;
                font-weight:bold;
                width:100px;
            }
            span:nth-child(5){
                width:120px;
            }
            span:nth-child(3){
                width:70px;
            }
        }
        .number_price{
            height:68px;
            background:#fff;
            border-radius:44px;
            margin:22px 20px;
            padding:10px 0;
            span{
                height:68px;
                line-height:68px;
                display:inline-block;
                text-align:center;
                font-weight:bold;
                color:#2a3460;
                font-size:26px;
            }
            span:nth-child(1){
                width:150px;
                border-right:1px solid #ccc;
                color:#d32a06;
                
            }
            span:nth-child(2){
                width:100px;
            }
            span:nth-child(3){
                width:100px;
            }
            span:nth-child(4){
                width:90px;
            }
            span:nth-child(5){
                width:80px;
            }
            span:nth-child(6){
                width:150px;
            }
        }
    }
</style>
