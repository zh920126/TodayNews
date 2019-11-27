<template>
  <div class="editDitail">
    <div class="myheader">
      <div class="top"></div>
      <div class="Detailheader">
        <div class="left">
          <van-icon name="arrow-left" class="iconLeft" @click="$router.go(-1)" />
          <img src="@/../public/u339.png" alt />
        </div>
        <div class="right">
          <div class="btn" @click="handlerguanzhu" :class="{red:isActive}">{{focusText}}</div>
        </div>
      </div>
    </div>
    <div class="contain">
      <div class="title">
        {{article.title ||''}}
      </div>
      <div class="aa">
        <span>{{article.user &&article.user.nickname}}</span>
        <span>2019-11-23</span>
      </div>
      <div class="artcontent" v-html="article.content" v-if="article.type===1"></div>
      <div class="video" v-if="article.type===2">
        <video src="https://baijiahao.baidu.com/s?id=1650745401666641950&wfr=content" controls autoplay :poster="article.cover[0].url"></video>
      </div>
      <div class="zan">
        <div class="dianzan" @click="handlerLike" :class="{red:article.has_like}">
          <van-icon name="good-job-o" class="point"/>
          <span>{{article.like_length}}</span>
        </div>
        <div class="wechat">
          <van-icon name="chat" class="chat"/>
          <span>微信</span>
        </div>
      </div>
    </div>
    <div class="commentList">
      <h2>精彩跟帖</h2>
      <div class="item" v-for="(value,index) in commentsList" :key="index">
        <div class="head">
          <img :src="value.user.head_img" alt />
          <div>
            <p>{{value.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">{{value.content}}</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <myfooter class="footer" :post='article'></myfooter>
  </div>
</template>

<script>
// 引入获取数据的api方法
import { getUserDetailById, userFocus, userUnFocus, userLike, userComments } from '@/apis/users.js'
// 引入底部组件
import myfooter from '@/components/commentFooter.vue'

export default {
  data () {
    return {
      // 定义变量接收获取到的数据
      article: {},
      // 定义时间
      ctime: new Date(),
      // 设置变量边盖关注按钮的颜色
      isActive: '',
      focusText: '关注',
      // 定义变量来接收评论数据
      commentsList: []
    }
  },
  components: {
    myfooter
  },
  methods: {
    async handlerguanzhu () {
      let res
      // 关注成功时
      if (!this.isActive) {
        res = await userFocus(this.article.id)
        this.isActive = true
        this.focusText = '已关注'
        // 同时提示用户关注成功,
        this.$toast.success(res.data.message)
        // res.data.data.has_follow = true
        console.log(res)
      } else {
        // 取消关注
        res = await userUnFocus(this.article.id)
        console.log(res)
        this.isActive = false
        this.focusText = '关注'
        this.$toast.success(res.data.message)
      }
      // console.log(this.isActive)
    },
    // 点赞
    async handlerLike () {
      let res = await userLike(this.article.id)
      // console.log(res)
      if (res.data.message === '点赞成功') {
        // 提示用户点赞成功
        this.$toast.success('点赞成功')
        // 同时让点赞数据量增加
        ++this.article.like_length
        // 同时点赞按钮变色 用于提示用户已点赞
        this.article.has_like = true
        res.data.data.has_like = true
        console.log(res)
      } else {
        // 提示用户已取消点赞
        this.$toast.success('已取消点赞')
        // 同时让点赞数量减少
        --this.article.like_length
        // 同时点赞按钮变色 用于提示用户已取消点赞
        this.article.has_like = false
      }
    }
  },
  async mounted () {
    // 页面打开时就需要获取数据
    let { id } = this.$route.params
    // console.log(id)
    let res = await getUserDetailById(id)
    // console.log(res)
    // 将获取到的数据赋值给定义好的变量，用来对页面进行渲染
    this.article = res.data.data
    console.log(this.article)

    // 获取用户评论列表
    let res2 = await userComments(id)
    console.log(res2)
    this.commentsList = res2.data.data
    console.log(this.commentsList)
    this.commentsList.forEach(value => {
      value.user.head_img = value.user.head_img ? localStorage.getItem('heima_39_imgaddress') + value.user.head_img : localStorage.getItem('heima_39_imgaddress') + '/uploads/image/123.jpeg'
    })
  }
}
</script>

<style lang='less' scoped>
.red{
        border: 1px solid red;
        background-color: red;
        color: #fff;
        border: none;
}
.editDitail{
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;
  padding-bottom: 70px;
}
.myheader {
  background-color: #f2f2f2;
  .top {
    height: 30px;
    background-color: #757575;
  }
  .Detailheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding:10px;
    .left {
      display: flex;
      align-items: center;
      .iconLeft {
        padding-right: 10px;
      }
      img {
        width: 50/360 * 100vw;
      }
    }
    .right {
      .btn {
        width: 60px;
        height: 25px;
        line-height: 25px;
        border: 1px solid #ccc;
        text-align: center;
        font-size: 12px;
        border-radius: 12.5px;
      }
    }
  }
}
.contain{
  padding: 10px;
  .title{
    font-size: 18px;
    font-weight: 600;
  }
  .aa{
    font-size: 12px;
    color: #999;
    margin-top: 6px;
    span:nth-child(1){
      margin-right: 15px;
    }
  }
  .artcontent{
    margin-top: 20px;
    color: #333;
    text-indent: 2em;
    /deep/img{
      display: block;
      width: 100%;
    }
  }
  .zan{
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
    div{
      width: 70px;
      height: 26px;
      border: 1px solid #797979;
      line-height: 26px;
      text-align: center;
      border-radius: 13px;
            font-size: 13px;
    }
    .dianzan{
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .point{
        font-size: 18px;
      color: pink;
      }
    }
    .wechat{
            display: flex;
      align-items: center;
      justify-content: space-evenly;
      .chat{
        font-size: 18px;
        color: green;
      }
    }
  }
}
.commentList {
    border-top: 5px solid #ddd;
    padding: 0 15px 50px;
    box-sizing: border-box;
    > h2 {
      line-height: 50px;
      text-align: center;
    }
    .item {
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        > img {
          width: 50/360 * 100vw;
          height: 50/360 * 100vw;
          display: block;
          border-radius: 50%;
        }
        > div {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          > span {
            font-size: 12px;
            color: #999;
            line-height: 25px;
          }
        }
        > span {
          color: #999;
          font-size: 13px;
        }
      }
      .text {
        font-size: 14px;
        color: #333;
        padding: 20px 0 10px 0;
      }
    }
    .more {
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 15px;
      margin: 20px auto;
      font-size: 13px;
    }
}
.video{
  width: 100%;
  video{
    width: 100%;
  }
}
</style>
