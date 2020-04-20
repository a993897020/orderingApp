<template>
  <div class="information">
    <div class="wrapper">
      <div class="header-wrapper">
        <mu-appbar color="orange" class="header">
          <div class="text">个人信息</div>
        </mu-appbar>
      </div>
      <div class="scroll-wrapper" ref="mineScroll">
        <div class="content">
          <div class="scroll">
            <i class="material-icons" v-show="this.dropDown">
              arrow_downward
            </i>
            <div v-show="this.dropDown">释放立即刷新</div>
            <mu-circular-progress class="loading" :size="26" v-show="this.isLoading"></mu-circular-progress>
            <div v-show="this.isLoading" v-if="ing">正在刷新...</div>
            <div v-show="this.isLoading" v-else>刷新成功</div>
          </div>
          <mu-card class="card">
            <mu-card-header :title='name' :sub-title="moon">
              <div class="isLogin">
                <mu-button @click="handleLogin" color="red">{{Login?'退出登陆':'登陆'}}</mu-button>
              </div>
              <mu-avatar slot="avatar">
                <img src="./img/tx.jpg" alt="" v-if="isLogin">
                <img src="./img/tx2.png" alt="" v-if="!isLogin">
              </mu-avatar>
            </mu-card-header>
            <mu-card-media title="夕阳西下" sub-title="傍晚" v-if="isLogin">
              <img src="./img/sun.jpg" alt="">
            </mu-card-media>
            <mu-card-title title="我的感受" sub-title="渴望" v-if="isLogin"></mu-card-title>
            <mu-card-text v-if="isLogin">
              散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
              调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
              似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
              找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
            </mu-card-text>
            <mu-card-actions>
              <mu-button round color='blue' @click="tip()">
                <mu-icon value="thumb_up" left></mu-icon>
                <span>赞</span>
              </mu-button>
              <mu-button round color='red' @click="tip('bad')">
                <mu-icon value="thumb_down" left></mu-icon>
                <span>踩</span>
              </mu-button>
            </mu-card-actions>
          </mu-card>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
/**
 * 个人信息页面
 */
import BScroll from 'better-scroll'
import Footer from '../footer/Footer'
export default {
  components: { 'app-footer': Footer },
  inject: ['reload'],
  data() {
    return {
      isLoading: false,
      ing: true,
      dropDown: false,
      Login: '',
    }
  },
  updated() {
    this.scroll = new BScroll(this.$refs.mineScroll, {
      click: true,
      probetype: 3
    })
  },
  created() {
    if (localStorage.getItem('username')) {
      let username = localStorage.getItem('username')
      this.$store.dispatch('setUser', username)
    }
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.mineScroll, {
        click: true,
        probetype: 3
      })
      this.scroll.on('scroll', (pos) => {   //向上滑动刷新
        console.log(pos.y)
        if (pos.y >= 50) {
          this.dropDown = true
        } else {
          this.dropDown = false
        }
      })
      this.scroll.on('touchEnd', (pos) => {   //松开滑动
        if (pos.y >= 50) {
          this.dropDown = false
          this.isLoading = true
          setTimeout(() => {
            this.ing = false
          }, 2000);
          setTimeout(() => {
            this.isLoading = false
            this.ing = true
            this.reload()
          }, 2500)
        }
      })
    })
  },
  methods: {
    tip(key='good'){
      key==='good'?this.$toast.message('开心(*^▽^*)'):this.$toast.message('伤心o(╥﹏╥)o')
    },
    /**
     * 退出登录
     */
    handleLogin() {
      if (this.Login) {
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        this.$router.push({ name: 'LoginLink' })
      } else {
        this.$router.push({ name: 'LoginLink' })
      }
    }
  },
  computed: {
    /**
     * 获取登录信息
     */
    name() {
      if (this.Login == true) {
        return this.$store.getters.name
      } else {
        return "未登录"
      }
    },

    moon() {
      if (this.Login == true) {
        return "我的心情"
      } else {
        return
      }
    },
    isLogin() {
      this.Login = this.$store.getters.login
      return this.$store.getters.login
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.information {
  width: 100%;
  .wrapper {
    width: 100%;
    .header-wrapper {
      .header {
        text-align: center;
        width: 100%;
        height: 80px;
        .text {
          font-weight: bold;
          font-size: 20px;
        }
      }
    }
    .scroll-wrapper {
      width: 100%;
      height: 78%;
      overflow: hidden;
      position: fixed;
      left: 0;
      top: 80px;
      .content {
        .scroll {
          text-align: center;
        }
        .card {
          width: 100%;
          margin: 0 auto;
          .isLogin {
            float: right;
          }
        }
      }
      .ripple {
        position: relative;
        width: 100%;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 16px;
        background-color: #fff;
        border-radius: 4px;
        &.item1 {
          color: #2196f3;
          border: 1px solid #2196f3;
        }
        &.item2 {
          background-color: #2196f3;
          color: #fff;
        }
        &.item3 {
          background-color: #4caf50;
          color: #fff;
        }
      }
    }
  }
}
</style>
