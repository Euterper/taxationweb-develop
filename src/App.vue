<template>
  <div id="app">
    <!-- <keep-alive include="Bill">
       <router-view />
    </keep-alive> -->
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import { watch } from 'fs'
export default {
  name: "App",
  data(){
    return{
      isRouterAlived:this.$store.state.isRouterAlived
    }
  },
  created(){
     this.isRouterAlived=this.$store.state.isRouterAlived;
  },
  mounted(){
     this.isRouterAlived=this.$store.state.isRouterAlived;
  },
 computed: {
      fullName: function () {
        this.isRouterAlived=this.$store.state.isRouterAlived;
        return this.isRouterAlived
    }
  }
};

</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 0px;
  height: 100%;
  width: 100%
}
</style>
