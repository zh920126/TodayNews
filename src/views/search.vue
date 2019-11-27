<template>
  <div class="searchpage">
    <div class="header">
      <van-icon name="arrow-left" class="left" @click="$router.go(-1)"/>
      <div class="search">
        <input type="text" placeholder="请输入搜索内容" autofocus v-model="keyword">
        <van-icon name="search" class="fangda"/>
      </div>
      <span @click="handlersearch">搜索</span>
    </div>
    <div class="history">
      <span>历史记录 <van-icon name="circle" ref="del" @click="delhistoryList"/></span>
      <p v-for="(value,index) in historyList" :key="index" @click="handlersearch(keyword=value)">{{value}}</p>
    </div>
    <div class="hotsearch">
      <span>热门搜索</span>
      <p v-for="(value,index) in hotArticle" :key="index" @click="$router.push({path: `/editDetail/${value.id}`})">{{value.title}}</p>
    </div>
    <div class="searcharticle">
      <span>搜索数据</span>
      <p v-for="(value,index) in searchArticle" :key="index" @click="$router.push({path: `/editDetail/${value.id}`})">{{value.title}}</p>
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
// 引入搜索推荐文章的apis// 引入搜索文章的apis
import { postSearch, searchArticle } from '@/apis/users.js'

export default {
  data () {
    return {
      // 设置变量获取搜索推荐的数据
      hotArticle: [],
      // 定义变量用来获取搜索框中用户输入的内容
      keyword: '',
      // 定义一个空数组用来接收搜索到的数据
      searchArticle: [],
      // 设置变量将搜索的历史记录存储起来
      historyList: []
    }
  },
  watch: {
    // 对输入的关键字进行侦听
    async keyword () {
      let res = await searchArticle(this.keyword)
      console.log(res)
    }
  },
  methods: {
    // 点击删除按钮时，将所有的历史记录全部删除掉
    delhistoryList () {
      localStorage.removeItem('heima_39_historiesList')
      this.historyList = []
    },
    async handlersearch () {
      if (this.keyword) {
        let res = await searchArticle(this.keyword)
        // console.log(res)
        this.searchArticle = res.data.data
        // 每次获取搜索历史之前都要从本地存储中获取先前的历史记录,如果没有历史记录获取到的就应该是一个空数组
        this.historyList = JSON.parse(localStorage.getItem('heima_39_historiesList') || '[]')
        // 当数组中的内容超过10项时，应该删除最后一项，让数组始终保持最多10项
        if (this.historyList.length === 5) {
          this.historyList.pop()
        }
        // 进行数组去重,当有相同数据的时候，将对应的数组里面的原数据删除，添加新的数据
        if (this.historyList.indexOf(this.keyword) !== -1) {
          this.historyList.splice(this.historyList.indexOf(this.keyword), 1)
        }
        // 将输入的搜索记录存储起来
        this.historyList.unshift(this.keyword)
        console.log(this.historyList)
        // 将搜索的历史记录存储到本地存储里面去，否则每次退出后再次进入这个数据就会刷新
        localStorage.setItem('heima_39_historiesList', JSON.stringify(this.historyList))
      } else {
        this.$toast.fail('请输入要搜索的内容')
      }
      // 同时调用热门搜索
      let res2 = await postSearch(this.keyword)
      console.log(res2)
      this.hotArticle = res2.data.data
      // 将搜索框中的内容清空
      this.keyword = ''
    }
  },
  async mounted () {
    // 获取数据对热门搜索进行渲染
    let res = await postSearch()
    // console.log(res)
    this.hotArticle = res.data.data
    // 当以进入页面，就需要对搜索的历史记录进行获取，然后渲染到页面上行
    this.historyList = JSON.parse(localStorage.getItem('heima_39_historiesList') || '[]')
  }
}
</script>

<style lang='less' scoped>
.searchpage{
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;
}
.header{
  height: 40/360*100vw;
  padding: 10/360*100vw 20/360*100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left{
    padding-right: 20/360*100vw;
  }
  .search{
    position: relative;
    flex: 1;
    height: 38/360*100vw;
    input{
      width: 100%;
      height: 100%;
      background-color: #f2f2f2;
      border: 1px solid #ccc;
      border-radius: 19/360*100vw;
      text-indent: 3em;
    }
    .fangda{
      position: absolute;
      top: 10/360*100vw;
      left: 20/360*100vw;
      font-size: 25/360*100vw;
    }
  }
  span{
    padding-left: 20/360*100vw;
  }
}
.history,.hotsearch,.searcharticle{
  margin: 20/360*100vw;
  span{
    font-size: 18/360*100vw;
    font-weight: 600;
  }
  p{
    //需要将获取到的数据只显示一行，多余的用...代替
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.hotsearch,.searcharticle{
  padding-top: 20px;
  border-top: 1px solid #d7d7d7;
}
.history span{
  display: flex;
  justify-content: space-between;
}
</style>
