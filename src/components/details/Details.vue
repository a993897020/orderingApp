<template>
  <transition name="page">
    <div class="details" v-if="isDetails">
      <div class="wrapper">
        <div class="img-wrapper">
          <img :src="food.picture" alt="">
          <mu-icon size="32" value="arrow_back_ios" class="iconBack" @click="backFn"></mu-icon>
          <mu-icon size="32" value="share" class="iconShare"></mu-icon>
          <mu-icon size="32" value="star" class="iconStar" ref="star" @click="starFn"></mu-icon>
        </div>
        <div class="content-wrapper">
          <div class="name">{{food.name}}</div>
          <div class="totalBuy">{{food.month_saled_content}}</div>
          <div class="priceUnit">￥{{food.min_price}}/{{food.unit}}</div>
          <div class="countControl">
            <app-count-control :food="food"></app-count-control>
          </div>
        </div>
        <div class="line"></div>
        <div class="scroll-box" ref="detailsScroll">
          <div class="rating-wrapper">
            <div class="rating" v-if="food.rating">
              <span>{{food.rating.title}}</span><span class="good">({{food.rating.like_ratio_desc}}{{food.rating.like_ratio}})</span>
              <span class="sndTitle">{{food.rating.snd_title}}<span>></span></span>
            </div>
            <ul v-if="food.rating">
              <!--不能越过两级,要使用 v-if="food.rating" 才不报错  -->
              <li v-for="(rating,index) in food.rating.comment_list" :key="index">
                <div class="headerImg">
                  <img :src="rating.user_icon" alt="" v-if="rating.user_icon">
                  <img src="./img/anonymity.png" alt="" v-if="!rating.user_icon">
                </div>
                <div class="name">
                  {{rating.user_name}}
                  <div class="timer">
                    {{rating.comment_time}}
                  </div>
                </div>
                <div class="text">
                  {{rating.comment_content}}
                </div>

              </li>
            </ul>
          </div>
        </div>

      </div>
      <div class="shopping-wrapper">
        <app-shopping :food="food"></app-shopping>
      </div>

    </div>
  </transition>
</template>

<script>
/**
 * 商品详情页面
 */
import CountControl from '../countControl/CountControl'
import Shopping from '../shopping/Shopping'
import BScroll from 'better-scroll'
export default {
  components: {
    'app-count-control': CountControl,
    'app-shopping': Shopping
  },
  props: {
    food: {
      type: Object,
      default: {}
    }
  },
  created() {
    this.$nextTick(() => {
      if (this.$refs.detailScroll) {
        this.scroll = new BScroll(this.$refs.detailsScroll, {
          click: true,
          scrollY: true,
          probeType: 3,
        })
        this.scroll.on('scroll', pos => {
          console.log(pos)
        })
      }
    })
  },
  data() {
    return {
      isDetails: false,
      foodItem: {},
      scroll: {}
    }
  },
  methods: {
    /**
     * 显示商品详情
     */
    showView() {
      if (this.isDetails == false) {
        this.isDetails = true
      }
    },
    /**
     * 收藏
     */
    starFn() {
      if (!this.$refs.star.style.color) {
        this.$refs.star.style.color = "#f57f17"
        this.$toast.success("收藏成功！")
      } else {
        this.$confirm("确定要取消收藏?", " 提示", {
          type: 'warning'
        }).then(({ result }) => {
          if (result) {
            this.$refs.star.style.color = null;
            this.$toast.message("取消收藏！")
          } else {

          }
        })

      }
    },
    /**
     * 返回商品列表
     */
    backFn() {
      if (this.isDetails == true) {
        this.isDetails = false;
      }
    },

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.details {
  width: 100%;
  height: 100%;
  background: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  overflow-x: hidden;
  overflow-y: scroll;
  .wrapper {
    .img-wrapper {
      width: 100%;
      position: relative;
      left: 0;
      top: 0;
      img {
        width: 100%;
        height: 100%;
      }
      .iconBack {
        position: absolute;
        left: 10px;
        top: 10px;
      }
      .iconShare {
        position: absolute;
        right: 50px;
        top: 10px;
      }
      .iconStar {
        position: absolute;
        right: 10px;
        top: 10px;
      }
    }
    .content-wrapper {
      padding: 10px;
      .name {
        font-weight: bold;
        font-size: 15px;
      }
      .totalBuy {
        width: 50%;
        display: inline-block;
        color: #999;
      }
      .priceUnit {
        color: red;
        width: 50%;
        display: inline-block;
      }
      .countControl {
        float: right;
        margin-top: -5px;
      }
    }
    .line {
      width: 100%;
      height: 5px;
      background: rgba($color: #000000, $alpha: 0.1);
    }
    .scroll-box {
      width: 100%;
      height: 100%;
      .rating-wrapper {
        width: 100%;
        padding: 10px;
        height: 100%;
        position: relative;
        .good {
          color: red;
        }
        .sndTitle {
          color: #666;
          float: right;
          span {
            margin-left: 10px;
          }
        }
        ul {
          width: 100%;
          height: 100%;
          display: inline-block;
          li {
            width: 100%;
            height: 100%;
            padding: 10px;
            padding-left: 0;
            float: left;
            .headerImg {
              width: 50px;
              height: 100%;
              float: left;
              margin-right: 10px;
              margin-bottom: 30px;
              img {
                border-radius: 50%;
                width: 100%;
                height: 100%;
              }
            }
            .name {
              .timer {
                float: right;
              }
            }
            .text {
              margin-top: 5px;
              width: 300px;
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}
.page-enter-active,
.page-leave-active {
  transition: 1s;
}
.page-enter,
.page-leave-active {
  transform: translateX(800px);
}
</style>