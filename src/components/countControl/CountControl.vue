<template>
  <div class="countControl">
    <transition name="move">
      <mu-icon value="remove" size="26" class="remove" @click="removeFn" v-show="this.food.count"></mu-icon>
    </transition>
    <span class="count" v-show="this.food.count">{{this.food.count}}</span>
    <mu-icon value="add" size="26" class="add" @click="addFn"></mu-icon>
  </div>
</template>

<script>
/**
 * 商品数量控制组件
 */
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isHide: true
    }
  },
  methods: {
    /**
     * 添加数量
     */
    addFn() {
      if (!this.food.count) {
        Vue.set(this.food, "count", 1)
      } else {
        this.food.count++
      }
    },
    /**
     * 减少数量
     */
    removeFn() {
      this.food.count--
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.countControl {
  display: inline-block;
  .add {
    background: orange;
    border-radius: 50%;
  }
  .count {
    font-size: 18px;
    vertical-align: top;
    display: inline-block;
    padding: 0 5px;
  }
  .remove {
    background: #e57373;
    border-radius: 50%;
  }
  .move-enter-active,
  .move-leave-active {
    transition: 1s;
  }
  .move-enter,
  .move-leave-active {
    transform: translateX(30px) rotateZ(180deg);
    animation: linear;
  }
}
</style>
