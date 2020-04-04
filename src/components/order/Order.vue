<template>
  <div class="order">
    <div class="wrapper" >
      <div class="header-wrapper">
        <mu-appbar  class="header" color="orange">
          <div class="title">订单</div>
          <div class="total">一共{{totalCount}}样美味</div>
          <mu-button  flat  slot="right" class="btn" @click="adminFn" v-show="!admin">管理</mu-button>
          <mu-button  flat  slot="right" class="btn" @click="adminFn" v-show="admin">完成</mu-button>
        </mu-appbar>
      </div>
      <ul class="food-wrapper" v-if="this.foodData.length>0">
        <div class="selectAll"  v-show="admin&&foodData.length>0">
        <mu-checkbox label="全选" :input-value="isCheckboxAll" @change="handleCheckAll" :checked-icon="this.selectArr.length<this.foodData.length?'indeterminate_check_box':undefined"></mu-checkbox>
      </div>
        <li class="food-item" v-for="(item,index) in foodData" :key="index" v-show="item.count>0">
          <div class="select"  v-show="admin">
            <mu-checkbox :value="item.id" v-model="selectArr" @change="seleteItem" class="selectItem"></mu-checkbox>
          </div>
          <div class="img-wrapper">
            <img :src="item.picture" alt="">
          </div>
          <div class="information-wrapper">
            <div class="name">{{item.name}}</div>
            <div class="count">x{{item.count}}</div>
            <div class="price">
              <span>￥{{item.min_price}}/</span><span>{{item.unit}}</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="null-text" v-if="this.foodData.length===0" >
        <h1 >空空如也</h1>
      </div>
    </div>
     <div class="handle-wrapper">
        <div class="total-wrapper" v-if="totalPrice!==0">
        <div class="total-price">合计:<span>￥{{totalPrice}}</span></div>
        <div class="btn">
          <mu-button round large color="red" @click="buyFn(totalPrice)">提交订单</mu-button>
        </div>
        </div>
        <div class="delete-wrapper">
        <mu-button round large color="red" @click="deleteFn()" v-show="admin">删除商品</mu-button>
    </div>
     </div>
      <app-footer></app-footer>
  </div>
</template>

<script>
import Vue from 'vue'
import Footer from '../footer/Footer'
export default {
  components:{'app-footer':Footer},
  data () {
    return {
      foodData:[],
      selectArr:[],   //checkbox选中的内容
      isCheckboxAll:false,
      admin:false
      }
    },
    methods:{
        buyFn(total){
          console.log(total)
          this.$confirm("您需要支付￥"+total+"元","信息",{
            type:"info"
          }).then(({result})=>{
            if(result){
              this.$toast.message("购买成功！")
              this.foodData.forEach(p=>{
                Vue.set(p,"count",0)
                this.$store.dispatch('controlFoodList',[])
                this.foodData=[]
              })
            }else{
              this.$toast.message('购买失败！')
            }
          })
        },
      
        deleteFn(){
          this.selectArr.forEach(p=>{
            this.foodData.forEach((o,i)=>{
              if(o.id===p){
                o.count=0
                this.foodData.splice(i,1)
              }
            })
          })
          this.isCheckboxAll=false
          this.selectArr=[]
          this.$store.commit('seleteDelete',this.foodData)
        },
        /**
         * 选中单个
         */
        seleteItem(e){
         this.selectArr.length>0?this.isCheckboxAll=true:this.isCheckboxAll=false
        },
        /**
         * 全选
         */
        handleCheckAll(){
            this.isCheckboxAll=!this.isCheckboxAll
          if(this.isCheckboxAll){
            this.foodData.forEach(p=>{
              this.selectArr.push(p.id)
            })
          }else{
            this.selectArr=[]
          }
        },
        adminFn(){
          this.admin=!this.admin
        }
    },
  
    computed:{
      totalCount(){
        if(this.foodData){
          return this.foodData.length
        }else{
          return 0
        }
      },
     totalPrice(){
           let price=0
       if(this.foodData){
         this.foodData.forEach(item => {
         if(item.count>0){
           price+=item.count*item.min_price
         }
       });
       }
       return price
     }
    },
    beforeRouteEnter(to,from,next){
       next(vm=>vm.foodData=vm.$store.getters.food)
   },
    beforeRouteLeave(to, form, next) {
      this.isCheckboxAll=false
      this.admin=false
      this.selectArr=[]
      next()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .order{
    width: 100%;
    height: 100vh;
    .wrapper{
      width: 100%;
      height: 100%;
      .header-wrapper{
        width: 100%;
        .header{
          width: 100%;
          height:100px;
          .title{
            margin-top: 20px;
            display:block;
            font-weight: bold;
            line-height:0;
          }
          .total{
            display:inline-block;
            font-size: 14px;
            margin-top: 15px;
          }
          .btn{
            font-size: 18px;
            display:inline-block;
            margin-bottom: 45px;
          }
        }
      }
        .food-wrapper{
        padding: 10px;
        margin-top: 10px;
        width: 100%;
        height: 95%;
        overflow-x:hidden;
        overflow-y: scroll;
        .food-item{
        width:100%;
          height: 90px;
          float: left;
          display:flex;
          .select{
              justify-items:center;
              line-height: 90px;
            .selectItem{
            }
          }
          .img-wrapper{
            width: 20%;
            height: 100%;
            float: left;
            img{
              width: 100%;
              height: 100%;
            }
          }
        .information-wrapper{
          height: 90px;
          float: left;
          width: 80%;
            .name{
            margin-bottom: 10px;
            display:inline-block;
            margin-top: 10px;
          }
          .price{
            display:block;
            color:red;
          }
          .count{
            float:right;
            line-height: 100px;
            margin: 0 20px;
          }
         }
        }
      }
    }
    .handle-wrapper{
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 50px;
    left: 0;
    height: 50px;
     .total-wrapper{
      position:fixed;
      bottom:60px;
      right: 0;
      .total-price{
        display:inline-block;
        font-size: 16px;
        line-height: 50px;
        margin-right: 10px;
        span{
          color:red;
          font-size: 20px;
          vertical-align:top;
        }
      }
      .btn{
        display:inline-block;
      }
    }
    .delete-wrapper{
      position:fixed;
      bottom:60px;
      left: 10px;;
    }
  }
   
    .null-text{
      justify-content: center;
      display: flex;
      height:80vh;
      align-items: center; 
     
    }
  }
  
</style>
