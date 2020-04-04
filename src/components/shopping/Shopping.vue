<template>
  <div class="shopping">
      <div class="shopping-wrapper">
          <div class="totalPrice">
              <p>费用为￥{{total}}</p>
          </div>
          <div class="btn-wrapper">
              <mu-button round class="add" color="secondary" @click="addFn">
                  <mu-icon value="add_shopping_cart" left></mu-icon>
                  添加订单
                  </mu-button>
              <mu-button round class="buy" color="error" @click="buyFn">
                  <mu-icon value="shopping_cart" left ></mu-icon>
                  购买
                  </mu-button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        food:{
            type:Object,
            default:{}
        }
    },
  data () {
    return {
      
        }
    },
    methods:{
        buyFn(){
            if(!this.food.count){
                this.$alert("你当前没有选择购买的商品","提示",
                {okLabel:"知道了"})
                .then(()=>{
                    this.$toast.message("购买失败！")
                })
            }else{
                this.$confirm("您需要支付"+this.total+"元","信息",{
                    type:'info'
                }).then(({result})=>{
                    if(result){
                        this.food.count=0
                        // Vue.set(food,'count',0)
                        this.$toast.message("购买成功！")
                    }else{
                        this.$toast.message("购买失败！")
                    }
                })
            }
        },
        addFn(){
            // this.$router.push({path:"/order"})
            if(this.food.count){
                this.$toast.message("添加成功")
                this.$store.commit("getFood",this.food)
            }
        }
    },
    computed:{
        total(){
            if(this.food.count){
                return this.food.count*this.food.min_price
            }else{
                return 0
            }
        }
    },
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.shopping{
    width:100%;
    .shopping-wrapper{
        width:100%;
    position:fixed;
        bottom: 0;
        left: 0;    
        background-color:rgb(225, 125, 0);
        height: 50px;
            display:flex;
            align-items:center;
            justify-content:space-around;
        .totalPrice{
            font-size: 18px;
            font-weight:800;
        }
        .btn-wrapper{
            .add{
                margin-right: 10px;
            }
            .buy{
            }
        }
    }
}
</style>
