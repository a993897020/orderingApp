<template>
  <div id="app">
    <!-- <Bg></Bg> -->
    <keep-alive>
      <!--  保留状态避免重新渲染 -->
      <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
    <!-- <HelloWorld/> -->

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Bg from './components/bg/Bg'

export default {
  name: 'App',
  components: {
    HelloWorld, Bg
  },
  provide() {    //声明reload方法，控制router-view的显示或隐藏
    return {
      reload: this.reload
    }
  },

  data() {
    return {
      isRouterAlive: true,
    }
  },


  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  },
}
</script>

<style lang='scss'>
</style>
