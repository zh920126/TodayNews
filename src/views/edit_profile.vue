<template>
  <div class="personal">
    <div class="head"></div>
    <div class="top">
      <span class="fuhao" @click="$router.back()">&lt;</span>
      <span class="title">编辑资料</span>
    </div>
    <div class="image">
      <img :src="usermessage.head_img" alt />
      <van-uploader :after-read="afterRead" :before-read="beforeRead" class="upload1" />
    </div>
    <mycell
    title="昵称"
     :desc="usermessage.nickname"
     @click="nickShow=true
     ,nickname=usermessage.nickname"
     ></mycell>
    <van-dialog
    v-model="nickShow"
     title="修改昵称"
     show-cancel-button
     :closeOnClickOverlay="true"
     @confirm="updatenickname"
     >
      <van-cell-group>
        <van-field
         v-model="nickname"
         label="用户名"
         clearable placeholder="请输入用户名"
          required
          />
      </van-cell-group>
    </van-dialog>
    <mycell title="密码" :desc="usermessage.password?'******':'无密码'" @click="passShow=true"></mycell>
    <van-dialog
    v-model="passShow"
     title="修改密码"
     show-cancel-button
     :closeOnClickOverlay="true"
     :before-close="beforeClose"
     @confirm="updatepassword"
     >
      <van-cell-group>
        <van-field
         v-model="password"
         label="旧密码"
         clearable placeholder="请输入旧密码"
          required
          />
      </van-cell-group>
      <van-cell-group>
        <van-field
         v-model="newpassword"
         label="新密码"
         clearable placeholder="请输入新密码"
          required
          />
      </van-cell-group>
    </van-dialog>
    <mycell title="性别" :desc="usermessage.gender?'男':'女'" @click="genderShow='true'"></mycell>
     <van-dialog
    v-model="genderShow"
     title="修改性别"
     show-cancel-button
     :closeOnClickOverlay="true"
     @confirm="updategender"
     >
     <van-picker :columns="['女','男']" @change="onChange" :default-index="usermessage.gender" />
     </van-dialog>
    <div class="footer"></div>
     <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" @click="$router.push({ path: '/index'})">首页</van-tabbar-item>
      <van-tabbar-item icon="search" @click="$router.push({path: '/search'})">搜索</van-tabbar-item>
      <van-tabbar-item icon="friends-o" @click="$router.push({path: '/myfocus'})">我的关注</van-tabbar-item>
      <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// 引入mycell单文件组件
import mycell from '@/components/mycell.vue'

// 引入apis中的方法 根据id获取用户数据
import { getUserInfoById, updateUserInfoById } from '@/apis/users.js'

// 引入apis中的方法---上传文件
import { uploadfile } from '@/apis/uploadfile.js'

export default {
  data () {
    return {
      id: '',
      usermessage: {},
      nickShow: false,
      nickname: '',
      passShow: false,
      password: '',
      newpassword: '',
      genderShow: false,
      genderindex: ''
    }
  },
  methods: {
    beforeRead (file) {
      // console.log(file)
      // 上传文件之前先验证图片的格式是否正确，如果不是image则提示用户
      if (file.type.indexOf('image/') !== 0) {
        this.$toast.fail('请选择正确的图片格式')
        // 格式不正确提示之后返回
        return false
      } else {
        // 格式正确的话，就继续下一步的操作
        return true
      }
    },
    // 读取文件之后的操作
    async afterRead (file) {
      // console.log(file)
      // 用formdata传输文件数据
      let form = new FormData()
      form.append('file', file.file)
      let res = await uploadfile(form)
      // console.log(res)
      if (res.data.message === '文件上传成功') {
        // 当文件上传成功时，提示用户，上传成功
        this.$toast.success('图片上传成功')
        // 同时将图片路径传给当前显示的头像
        this.usermessage.head_img =
          localStorage.getItem('heima_39_imgaddress') + res.data.data.url
        // 同时将图片路径存到服务器上去
        let res1 = await updateUserInfoById(this.id, {
          head_img: res.data.data.url
        })
        // console.log(res1)
        if (res1.data.message === '修改成功') {
          // 如果修改图片成功，就将上传的图片存到服务器中的head_img中
          // res1.data.data.head_img = localStorage.getItem('heima_39_imgaddress') + res.data.data.url
          this.$toast.success('图片上传成功')
        } else {
          this.$toast.fail('图片上传失败')
        }
      }
    },
    async updatenickname () {
      // console.log(12)
      // 调用apis方法进行昵称的修改
      let res = await updateUserInfoById(this.id, { nickname: this.nickname })
      // console.log(res)
      if (res.data.message === '修改成功') {
        // 修改成功之后，提示用户
        this.$toast.success('昵称修改成功')
        // 同时显示用户修改后的昵称
        this.usermessage.nickname = this.nickname
      }
    },
    // 修改密码
    beforeClose (action, done) {
      // action 当前的操作类型  有confirm，done
      // console.log(action)
      // done：关闭时执行的操作，done()关闭，done(false)不关闭
      // console.log(done)
      if (action === confirm && this.password !== this.usermessage.password) {
        // 点击确认的时候，进行原密码的验证，不符合就提示用户，同时不关闭弹框
        this.$toast.fail('旧密码输入错误，请重新输入')
        done(false)
      } else {
        // 验证旧密码成功后就关闭弹框
        done()
      }
    },
    // 更新密码
    async updatepassword () {
      // console.log(123)
      // 根据Id更新密码
      // 获取到用户新输入的密码
      let res = await updateUserInfoById(this.id, { password: this.newpassword })
      // console.log(res)
      if (res.data.message === '修改成功') {
        // 修改密码成功之后，提示用户，并且将数据中的密码更新为新密码
        this.$toast.success('密码修改成功')
        this.usermessage.password = this.newpassword
      } else {
        this.$toast.fail('修改密码失败')
      }
      // console.log(this.usermessage.password)
    },
    // 修改性别
    onChange (pick, value, index) {
      // console.log(pick)
      // console.log(value)
      // console.log(index)
      this.genderindex = index
      console.log(this.genderindex)
    },
    async updategender () {
      let res = await updateUserInfoById(this.id, { gender: this.genderindex })
      console.log(res)
      if (res.data.message === '修改成功') {
        this.usermessage.gender = this.genderindex
        console.log(this.usermessage)
        // 修改成功后提示用户
        this.$toast.success('修改性别成功')
      } else {
        this.$toast.fail('修改性别失败')
      }
    }
  },
  // 注册单文件组件
  components: {
    mycell
  },
  async mounted () {
    // 进入editprofile页面之后，根据ID获取到用户的数据
    // console.log(this.$route)
    this.id = this.$route.params.id
    // console.log(this.id)
    let res = await getUserInfoById(this.id)
    // console.log(res)
    if (res.data.message === '获取成功') {
      this.usermessage = res.data.data
      // console.log(this.usermessage)
      this.usermessage.head_img = this.usermessage.head_img
        ? localStorage.getItem('heima_39_imgaddress') +
          this.usermessage.head_img
        : './hots_3.jpg'
    }
  }
}
</script>

<style lang='less' scoped>
.head {
  height: 30px;
  width: 100%;
  background-color: #757575;
}
.top {
  position: relative;
  margin: 10px 0;
}
.fuhao {
  margin: 10px;
  padding: 10px;
}
.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 600;
}
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    // viewport width >> vw
    // viewport height >> vh
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
.image {
  position: relative;
  height: 100px;
}
.image img {
  width: 70px;
  height: 70px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
.upload1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}
</style>
