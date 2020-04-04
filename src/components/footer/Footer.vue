<template>
  <div class="footer">
  <div class="footer-wrapper" >
      <mu-bottom-nav class="footer-menu" :value.sync="shift" >
        <mu-bottom-nav-item  value="home" title="首页" icon="home" to="/home" class="item" ></mu-bottom-nav-item>
        <mu-bottom-nav-item value="order"  title="订单" icon="assignment" to="/order" class="item"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="me" title="我" icon="person" to="/information" class="item"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      shift:"home",
      
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .footer-wrapper{
      position:fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      .item{
          color: rgba(117, 117, 117, 1)
      }
      .item.active{
      color: rgba(225, 152, 0, 1);
      }
    }
</style>
