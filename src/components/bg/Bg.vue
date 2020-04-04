<template>
  <div class="bg" >
  <div class="btn" v-loading="true" data-mu-loading-overlay-color="none" ></div>
  <div class="text">为您加载中...</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
            loading1: false,
    }
  },
  methods:{
   
  },
  created(){
     setTimeout(() => {
        let lUsername=parseInt(localStorage.getItem('username'))
        let lPassword=parseInt(localStorage.getItem('password'))
        this.http.get('http://json.apiopen.top/gUser')
          .then(res=>{
            let { username,password }=res.data.result
            if(res.data.code==200){
              let isRight=lUsername==parseInt(username)&&lPassword==parseInt(password)
              console.log(isRight)
              if(isRight){
               this.$router.push({name:'HomeLink'})
              this.$store.dispatch("setUser",username)
              }else{
                 this.$router.push({name:'LoginLink'})
              }
            }
          })
      }, 3000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bg{
background-image: url('./img/bg.jpg');
background-repeat: no-repeat;
background-size: 100% 100%;
width: 100%;
height: 100%;
position:fixed;
left: 0;
top:0;
  .btn{
    position:fixed;
    left: 50%;
    bottom:10%;
    width: 100px;
    height: 50px;
    margin-left: -50px;
  }
  .text{
    position: fixed;
    left: 50%;
    bottom:5%;
    width: 150px;
    margin-left: -75px;
    text-align: center;
    font-size: 20px;
  }
}

</style>
