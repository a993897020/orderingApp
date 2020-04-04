<template>
  <div class="login">
      <mu-container class="login-wrapper">
        <mu-form ref="form" :model="form"  label-width="100" class="form" :inline=true> 
            <mu-form-item prop="user"  class="item" label="用户名" :rules="userRule">
                <mu-text-field type="user" v-model="form.user" prop="user"   ></mu-text-field>
            </mu-form-item>
            <mu-form-item prop="password" label="密码" class="item" :rules="passwordRule">
                <mu-text-field type="password" v-model="form.password" prop="password"></mu-text-field>
            </mu-form-item>
            <mu-form-item>
                <mu-button full-width color="info" @click="submit" class="item">登陆</mu-button>
                <mu-button full-width color="info" @click="register" class="item">注册</mu-button>
            </mu-form-item>
        </mu-form>
   
      </mu-container>
  </div>
</template>

<script>
/**
 * 登录页面
 */
export default {
  data () {
    return {
      userRule:[
          //!!转换boolean
          {validate:(val)=>!!val,message:'用户名不可为空'},
          {validate:(val)=>val.length>=6&&val.length<=12,message:'用户名为6-12长度的字符'},
      ],
      passwordRule:[
          {validate:(val)=>!!val,message:'密码不可为空'},
          {validate:(val)=>val.length>=6,message:'密码长度必须大于6位'},
      ],
      form:{
          user:'',
          password:''
      }
    }
   },
   /**
    * 当进入此页面
    */
   beforeRouteEnter(to,from,next){
       next(vm=>vm.$store.dispatch("setUser",null))
   },
   methods:{
       /**
        * 提交表单登录
        */
       submit(){
           this.$refs.form.validate().then((result)=>{
               if(result==true){
                   this.http.get('http://json.apiopen.top/gUser')
                    .then(res=>{
                        let {username,password}=res.data.result
                        let isRight=parseInt(username)==this.form.user&&parseInt(password)==this.form.password
                        if(isRight){
                            localStorage.setItem('username',username)
                            localStorage.setItem('password',password)
                            this.$toast.success('登陆成功！')
                             this.$router.push({name:'HomeLink'})
                            this.$store.dispatch("setUser",username)
                        }else{
                            this.$toast.error('用户名或者密码错误!')
                            this.$store.dispatch('setUser',null)
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
              /**
               * firebase登录接口（需要翻墙）
               **/      
            //     this.http.get('https://mapp-7684e.firebaseio.com/user.json')
            //     .then(res=>{
            //         console.log(res.data)
            //         const userList=[]
            //         for(let i in res.data){
            //             const itemUser=res.data[i]
            //             userList.push(itemUser)
            //         }
            //        let result=userList.filter((itemUser)=>{
            //            return itemUser.user===this.form.user&&itemUser.password===this.form.password
            //        })
            //        if(result.length>0&&result!=null){
            //         //    console.log(result)
            //         this.$router.push({name:'HomeLink'})
            //         this.$toast.success('登陆成功！')
            //         this.$store.dispatch("setUser",result[0].user)
            //        }else{
            //            this.$toast.error('用户名或者密码错误!')
            //            this.$store.dispatch('setUser',null)
            //        }
            //         // userList.forEach(item=>{
            //         //     if(item.password===this.password&&item.user===this.user){
            //         //         this.$toast.success('登陆成功！')
            //         //         this.$router.push({name:'HomeLink'})
            //         //     }else{
            //         //         this.$toast.error('用户名或者密码错误！')
            //         //     }
            //         //     console.log(result)
            //         // })
            //     })
            //     .catch(error=>{
            //         console.log(error)
            //     })
               }
           })
       },
       /**
        * 跳转到注册页面
        */
       register(){
           this.$router.push({name:'RegisterLink'})
       }
       
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login{
    width: 100%;
    height: 100%;
    background-image:url("./img/bg.jpg");
    position:fixed;
    left: 0;
    top: 0;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .login-wrapper{
        position: fixed;
        left: 50%;
        top: 50%;
        width: 350px;
        height: 350px;
        margin-left: -175px;
        margin-top: -175px;
        .form{
        color: #fff;
        border:1px solid rgba(0,0,0,.1);
        background:rgba(255,255,255, .1);
        padding:30px;
            .item{
                color: rgba(0,0,0,.8);
            }
        }
    }
}

</style>
