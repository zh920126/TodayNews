<template>
  <div class="login">
    <div class="header"></div>
    <div class="img">
      <img src="../../images/u338.png" alt="">
    </div>
    <div class="logo">
      <img src="../../images/u339.png" alt="">
    </div>
    <myinput placeholder='请输入用户名' :value="userobj.username" @input='handlerinput1' type='text' :rules='/^1\d{10}$/' err_message='手机号错误，请输入11位数的手机号'></myinput>
    <myinput placeholder="请输入密码" v-model='userobj.password' type='password'></myinput>
    <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
    <mybutton text="登录" @click="login" type='waring'></mybutton>
    <div class="footer"></div>
  </div>
</template>

<script>
// 引入mybutton文件
import mybutton from '@/components/mybutton.vue'

import myinput from '@/components/myinput.vue'

import { login } from '../apis/users.js'
export default {
  data () {
    return {
      userobj: {
        username: '123456',
        password: '123456'
      }
    }
  },
  components: {
    mybutton, myinput
  },
  methods: {
    // 监听子组件的按钮的点击事件
    login () {
      login(this.userobj)
        .then(res => {
          console.log(res)
          if (res.data.message === '登录成功') {
            // 在登录成功的时候将token存到本地存储
            localStorage.setItem('heima_39_Authorization', res.data.data.token)
            // 在登录成功的时候，还需要将ID上传到本地存储
            localStorage.setItem('heima_39_id', res.data.data.user.id)
            this.$router.push({ path: `/personal/${res.data.data.user.id}` })
          } else {
            this.$toast.fail(res.data.message)
          }
        })
        .catch(err => {
          this.$toast.fail('服务器异常，请重试')
          console.log(err)
        })
    },
    // 接收子组件中传递的数据，获取用户输入
    handlerinput1 (data) {
      this.userobj.username = data
      // console.log(this.userobj.username)
    }
  }
}
</script>

<style lang="less" scoped>
*{
  margin: 0;
  padding: 0;
}
.login{
  position: relative;
  height: 700px;
  background-color: #f2f2f2;
}
.header{
  height: 30px;
  background-color: #757575;
}
.img img{
  width: 8%;
  margin: 20px;
}
.logo img {
  display: block;
  margin: 0 auto;
  width: 35%;
}
.footer{
  position: absolute;
  bottom: 0;
  height: 100px;
  width: 100%;
  background-color: #000;
}
</style>
