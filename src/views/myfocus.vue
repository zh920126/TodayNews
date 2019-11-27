<template>
  <div class="myfocus">
    <div class="top"></div>
    <myheader title="我的关注" >
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()">&lt;</span>
    </myheader>
    <div class="list">
          <div class="box" v-for="(value,index) in myFocus" :key="index">
              <img :src="value.head_img" alt="">
              <div class="center">
                  <span>{{value.nickname}}</span>
                  <span>2019-11-23</span>
              </div>
              <span @click="handlerClick(value.id,index)">取消关注</span>
          </div>
      </div>
       <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" @click="$router.push({ path: '/index'})">首页</van-tabbar-item>
      <van-tabbar-item icon="search" @click="$router.push({path: '/search'})">搜索</van-tabbar-item>
      <van-tabbar-item icon="friends-o" @click="$router.push({path: '/myfocus'})">我的关注</van-tabbar-item>
      <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// 引入头部组件
import myheader from '@/components/myheader.vue'

// 引入用户关注信息axios
import { userFollowList, userUnFocus } from '@/apis/users.js'

export default {
  data () {
    return {
      // 定义变量进行数据的接收
      myFocus: {}
    }
  },
  components: {
    myheader
  },
  // 使用钩子函数，当用户已进入此页面时就获取数据并进行渲染
  async mounted () {
    let res = await userFollowList()
    // console.log(res)
    this.myFocus = res.data.data
    // 循环遍历，为获取到的数据的图片添加正确的路径
    this.myFocus.forEach(value => {
      value.head_img = localStorage.getItem('heima_39_imgaddress') + value.head_img
    })
    console.log(this.myFocus)
  },
  methods: {
    // 点击按钮时取消关注
    async handlerClick (id, index) {
      let res = await userUnFocus(id)
      console.log(res)
      // 删除掉对应的点击取消关注的哪一项
      this.myFocus.splice(index, 1)
      this.$toast.success(res.data.message)
    }
  }
}
</script>

<style lang='less' scoped>
  .top{
    height: 30px;
    background-color: #757575;
  }
  .list{
    .box{
        display: flex;
        padding: 10px 10px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        > img{
            display: block;
            width: 50/360*100vw;
            height: 50/360*100vw;
            border-radius: 50%;
            padding: 0 10px;
        }
        > .center{
            flex: 1;
            display: flex;
            flex-direction: column;
            > span {
                font-size: 12px;
                color:#999;
                &:nth-child(1){
                  font-size: 14px;
                  color: #666;
                }
            }
        }
        > span {
            height: 30px;
            background-color: #eee;
            font-size: 13px;
            border-radius: 30px;
            line-height: 30px;
            padding: 0px 15px;
        }
    }
}
</style>
