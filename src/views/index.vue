<template>
  <div class="index">
    <div class="top"></div>
    <div class="head">
      <img src="@/../public/u339.png" alt />
      <div class="search" @click="$router.push({path: '/search'})">
        <van-icon name="search" class="searchbtn" />搜索新闻
      </div>
      <van-icon name="manager-o" class="userlogin" @click="handlerclick" />
    </div>
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="value.name" v-for="(value,index) in this.category" :key="index">
        <van-list v-model="value.loading" :finished="value.finished" finished-text="没有更多了" @load="onLoad" loading-text="玩命加载中" :immediate-check='false'>
          <van-pull-refresh v-model="value.isLoading" @refresh="onRefresh">
          <artBlock v-for="(artv,arti) in value.articleList" :key="arti" :post="artv" @click="$router.push({ path: `/editDetail/${artv.id}` })"></artBlock>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 引入封装的axios方法
import { getCategoryData } from '@/apis/getCategoryData.js'

// 引入封装的axios引入数据的方法
import { showCategoryData } from '@/apis/showCategoryData.js'

// 引入装好的渲染数据的模块
import artBlock from '../components/articleBlock.vue'

export default {
  data () {
    return {
      category: [],
      articleList: [],
      active: localStorage.getItem('heima_39_id') ? 1 : 0
    }
  },
  components: {
    // 注册组件
    artBlock
  },
  // 创建钩子函数，当页面一打开就获取数据
  async mounted () {
    // 引入获取数据的函数
    let res = await getCategoryData()
    // console.log(res)
    // 当数据获取成功的时候，将里面的栏目赋值给category变量，用于渲染页面
    if (res.status === 200) {
      this.category = res.data.data
      // console.log(this.category)
      // 需要对数据进行改造，添加我们后期业务处理所需要的属性
      this.category = this.category.map(value => {
        return {
          ...value,
          articleList: [],
          pageIndex: 1,
          pageSize: 5,
          loading: false,
          finished: false,
          isLoading: false
        }
      })
      // console.log(this.category)

      // 调用init函数，在第一次获取到数据的时候就将对应的栏目的数据传到当前栏目的articleList数组中去
      this.init(this.category[this.active].id)
      // console.log(this.category)
    }
  },
  // 添加watch对active进行监控
  watch: {
    async active () {
      // 获取实时的active对应的类目的id
      // console.log(this.active);
      // console.log(this.category[this.active].id)
      let id = this.category[this.active].id
      // let res = await showCategoryData({ pageIndex: 1, pageSize: 10, category: id })
      // console.log(res)
      // 将获取到的该类目的数据存到当前栏目的数组中
      // this.category[this.active].articleList = res.data.data
      // console.log(this.category[this.active])

      // 将封装的init函数引入
      this.init(id)
    }
  },
  methods: {
    // 封装init函数用来将数据存储到当前栏目的数组中去
    async init () {
      let res = await showCategoryData({
        pageIndex: this.category[this.active].pageIndex,
        pageSize: this.category[this.active].pageSize,
        category: this.category[this.active].id
      })
      // console.log(res)
      // 将获取到的该类目的数据存到当前栏目的数组中
      this.category[this.active].articleList.push(...res.data.data)
      // 设置本次数据加载结束
      this.category[this.active].loading = false
      // 判断数据是否已经完全加载完毕
      if (res.data.data.length < this.category[this.active].pageSize) {
        this.category[this.active].finished = true
      }
    },
    // 当点击顶部头像时，进行跳转
    handlerclick () {
      let token = localStorage.getItem('heima_39_Authorization')
      if (token) {
        // 如果之前登陆过有数据就直接跳转到个人中心页面
        this.$router.push({
          path: `/personal/${localStorage.getItem('heima_39_id')}`
        })
      } else {
        // 如果没有登陆过，就跳转到登陆页面
        this.$router.push({ name: 'Login' })
      }
    },
    // 上啦加载更多数据
    onLoad () {
      // console.log(123)
      // 发起异步请求，请求下一页数据
      this.category[this.active].pageIndex++
      this.init()
    },
    // 下啦刷新
    onRefresh () {
      // 下啦的时候 ，重置第一页的数据
      this.category[this.active].pageIndex = 1
      this.category[this.active].articleList.length = 0
      this.init(() => {
        // 加载完成之后将isloading重置为false
        this.category[this.active].isLoading = false
        // 将下拉刷新的结束表示进行重置，如果没有重置，name很可能就不能再进行上啦加载数据了
        this.category[this.active].finished = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.top {
  height: 30px;
  background-color: #757575;
}
.head {
  height: 50px;
  background-color: #f00;
  display: flex;
  line-height: 50px;
  justify-content: space-between;
  align-items: center;
  > img {
    width: 54px;
    color: #fff;
    padding: 0 10px;
  }
  .search {
    display: flex;
    flex: 1;
    justify-content: center;
    background-color: #eee;
    height: 35px;
    line-height: 35px;
    border-radius: 35/2px;
    background-color: rgba(255, 255, 255, 0.3);
    text-align: center;
    color: #fff;
    .searchbtn {
      line-height: 35px;
      padding-right: 15px;
      font-size: 20px;
    }
  }
  .userlogin {
    font-size: 25px;
    color: #fff;
    padding: 0 20px 0 20px;
  }
}
</style>
