<template>
  <div class="register">
    <mu-container class="register-wrapper">
      <mu-form ref="form" :model="form" label-width="100" class="form" :inline=true>
        <mu-form-item prop="user" label="用户名" class="item" :rules="userRule">
          <mu-text-field v-model="form.user" prop="user"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="password" label="密码" class="item" :rules="passwordRule">
          <mu-text-field type="password" v-model="form.password" prop="password"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="password" label="确定密码" class="item" :rules="confirmRule">
          <mu-text-field type="password" v-model="form.confirmPW" prop="password"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button full-width color="info" @click="submit" class="item">注册</mu-button>
          <mu-button full-width color="info" @click="login" class="item">登陆</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>
  </div>
</template>

<script>
/**
 * 注册页面
 */
export default {
  data() {
    return {
      userRule: [
        //!!转换boolean
        { validate: (val) => !!val, message: '邮箱不可为空' },
        { validate: (val) => val.length >= 6, message: '用户名长度必须大于6位' },
      ],
      passwordRule: [
        { validate: (val) => !!val, message: '密码不可为空' },
        { validate: (val) => val.length >= 6, message: '密码长度必须大于6位' },
      ],
      confirmRule: [
        { validate: (val) => !!val, message: '密码不可为空' },
        { validate: (val) => val.length >= 6, message: '密码长度必须大于6位' },
      ],
      form: {
        user: '',
        password: '',
        confirmPW: ''
      }
    }
  },
  methods: {
    /**
     * 提交表单进行注册
     */
    submit() {
      this.$refs.form.validate().then((result) => {
        if (result == true) {
          const formData = {
            "username": this.form.user,
            "password": this.form.password,
            //    confirmRW:this.form.confirmRW
          }
          const fd = new FormData()
          fd.append('path', 'gUser')
          fd.append('json', JSON.stringify(formData))
          fd.append('remarks', "注册")
          if (this.form.password === this.form.confirmPW) {
            /**
             * firebase注册（需要翻墙）
             */
            // this.http.post('https://mapp-7684e.firebaseio.com/user.json',formData)
            //   .then(res=>{
            this.http.post('http://json.apiopen.top/updateJson', fd)
              .then(res => {
                if (res.data.code === 200) {
                  this.$router.push({ name: 'LoginLink' })
                  this.$toast.success('注册成功')
                }
              })
              .catch(error => {
                console.log(error)
              })
          }

        }
      })
    },
    /**
     * 跳转到登录页面
     */
    login() {
      this.$router.push({ name: 'LoginLink' })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.register {
  width: 100%;
  height: 100%;
  background-image: url("./img/bg.jpg");
  position: fixed;
  left: 0;
  top: 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .register-wrapper {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 350px;
    height: 350px;
    margin-left: -175px;
    margin-top: -175px;
    .form {
      color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.1);
      background: rgba(255, 255, 255, 0.1);
      padding: 30px;
    }
    .item {
      color: #000;
    }
  }
}
</style>
