<template>
  <div class="register">
    <div class="header"></div>
    <div class="img">
      <img src="../../images/u338.png" alt="">
    </div>
    <div class="logo">
      <img src="../../images/u339.png" alt="">
    </div>
    <myinput placeholder='请输入用户名' v-model="userobj.username" type='text' :rules='/^1\d{10}$/' err_message='手机号错误，请输入11位数的手机号'></myinput>
    <myinput placeholder='请输入昵称' v-model="userobj.nickname" type='text' :rules='/^\w+$/' err_message='昵称输入错误'></myinput>
    <myinput placeholder="请输入密码" v-model='userobj.password' type='password' :rules='/^\w{3,16}$/' err_message='密码为3-16数字或字母'></myinput>
        <p class="tips">
        有账号？
        <a href="#/login" class>去登录</a>
      </p>
    <mybutton text="注册" @click="register" type='danger'></mybutton>
    <div class="footer"></div>
  </div>
</template>

<script>
// 引入mybutton文件
import mybutton from '@/components/mybutton.vue'

import myinput from '@/components/myinput.vue'

import { register } from '@/apis/users.js'
export default {
  data () {
    return {
      userobj: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  components: {
    mybutton, myinput
  },
  methods: {
    // 监听子组件的按钮的点击事件
    async register () {
      // console.log(this.userobj)
      let res = await register(this.userobj)
      // console.log(res)
      if (res.data.message === '注册成功') {
        // 提示用户已经注册成功
        this.$toast.fail('注册成功，请进行登录')
        // 注册成功之后进行页面跳转
        this.$router.push({ name: 'Login' })
      }
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
.register{
  position: relative;
  height: 100vh;
  width: 100vm;
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
  height: 70px;
  width: 100%;
  background-color: #000;
}
.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}

</style>
