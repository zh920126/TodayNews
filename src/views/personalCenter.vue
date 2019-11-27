<template>
  <div class="personal">
    <div class="head"></div>
    <router-link :to="`/editprofile/${userid}`">
      <div class="profile">
        <img :src="current.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>
            {{nickname}}
          </div>
          <div class="time">{{ctime | newTime('-')}}</div>
        </div>
        <span class="iconfont iconjiantou1">></span>
      </div>
    </router-link>
    <mycell title="我的关注" desc="关注的用户" @click="$router.push({path: '/myfocus'})"></mycell>
    <mycell title="我的跟帖" desc="跟帖/回复"></mycell>
    <mycell title="我的收藏" desc="文章/视频" @click="$router.push({path: '/mystar'})"></mycell>
    <mycell title="设置"></mycell>
    <!-- 当点击退出时 -->
    <van-button type="primary" class="primary" @click="exit">退出</van-button>
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

// 引入apis中的用id来获取数据的方法
import { getUserInfoById } from '@/apis/users.js'

// 引入filter文件
import { newTime } from '@/utils/myfilter.js'

export default {
  data () {
    return {
      ctime: new Date(),
      nickname: '',
      current: {},
      userid: ''
    }
  },
  components: {
    mycell
  },
  // 添加过滤器将时间变为正常的时间
  filters: {
    newTime
  },
  methods: {
    // 点击退出时，销毁token，并且销毁存在本地的用户ID，重定向到首页面
    exit () {
      // 销毁token
      localStorage.removeItem('heima_39_Authorization')
      // 销毁存储的用户的ID
      localStorage.removeItem('heima_39_id')
      // 重定向
      this.$router.push('/')
    }
  },
  // 用钩子函数来根据id获取获取数据
  async mounted () {
    // console.log(this.$route.params.id)
    let { id } = await this.$route.params
    this.userid = this.$route.params.id
    // console.log(id)
    getUserInfoById(id)
      .then(res => {
        // console.log(res)
        this.nickname = res.data.data.nickname
        this.current = res.data.data
        if (this.current.head_img) {
          this.current.head_img =
            localStorage.getItem('heima_39_imgaddress') + this.current.head_img
        } else {
          this.current.head_img = './u339.png'
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang='less' scoped>
.primary {
  display: block;
  margin: 20px auto;
  width: 80%;
}
.head {
  height: 30px;
  width: 100%;
  background-color: #757575;
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
</style>
