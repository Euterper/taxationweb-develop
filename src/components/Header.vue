<template>
    <div class="header">
        <img class="img1" src="../assets/images/back.png" @click="toback"/>
        <span>{{headerName}}</span>
        <div class="stayright" v-if="$slots.right">
             <slot name="right"></slot>
        </div>
    </div> 
</template>
<script>
  export default {
    name: 'Header',
    components: {},
    props:{
        //头部名称
        headerName:{
            type: String,
            required: true
        }
    },
    data () {
      return {
      }
    },
    created () {
    },
    mounted () {
        
    },
    methods: {
        toback(){
			this.$router.go(-1);
		}
    },
    watch: {
        
    }
  }
</script>
<style scoped lang="scss">
    .header{
        height:90px;
        line-height:90px;
        background:#fff;
        box-shadow: 0px 3px 3px 1px rgba(0,0,0,0.1); //1.水平阴影  2.垂直阴影 3.模糊距离，改虚实 4.阴影尺寸
        text-align:center;
        position: fixed;
        top:0px;
        width:100%;
        z-index:999;
        .img1{
            width:32px;
            height:32px;
            display:inline-block;
            float:left;
            position: absolute;
            left:36px;
            top:50%;
            transform: translateY(-50%);
        }
        span{
            font-size:32px;
            color:#30355e;
            font-weight:bold;
        }
        .stayright{
             width:32px;
            height:32px;
            display:inline-block;
            position: absolute;
            right:36px;
            top: 36%;
            // float: right;
        }
    }
</style>
