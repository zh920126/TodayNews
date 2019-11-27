<template>
  <div class="comments">
    <myheader title="精彩跟帖">
      <span slot="left" @click="$router.go(-1)">&lt;</span>
    </myheader>
    <div class="commentsList">
      <div class="item" v-for="value in commentsList" :key="value.id">
        <div class="head">
          <img :src="value.user.head_img" alt />
          <div>
            <p>{{value.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span @click="replayComment(value)">回复</span>
        </div>
        <!-- 使用v-if判断是否需要创建评论块结构，标准就是parent是否是一个非空对象 -->
        <!-- 如果是非空对象，就创建评论块，并且传入parent数据 -->
        <div class="text">{{value.content}}</div>
        <!-- 接收子组件发送来的信息，对页面进行刷新 -->
        <commentItem v-if="value.parent" :data='value.parent' @replayComment='replayComment'></commentItem>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <myFooter :post='article' @refreshComm='init()' :replayobj='obj' @resetreplayobj='obj=null'></myFooter>
  </div>
</template>

<script>
// 引入组件
import myheader from '@/components/myheader.vue'
// 引入组件
import myFooter from '@/components/commentFooter.vue'
import commentItem from '@/components/commentItem.vue'
// 引入API
import { userComments, getUserDetailById } from '@/apis/users.js'

export default {
  components: {
    // commentItem,
    myheader, myFooter, commentItem
  },
  data () {
    return {
      // 定义变量存储数据
      commentsList: [],
      article: {},
      obj: ''
    }
  },
  methods: {
    // 获取commentItem子组件传过来的数据
    getComments (data) {

    },
    // 当获取到子组件发送来的信息，有新的评论发表的时候
    // 封装init函数
    async init () {
      let res = await userComments(this.$route.params.id)
      // console.log(res)
      this.commentsList = res.data.data
      // console.log(this.commentsList)
      this.commentsList.forEach(value => {
        value.user.head_img = value.user.head_img ? localStorage.getItem('heima_39_imgaddress') + value.user.head_img : localStorage.getItem('heima_39_baseurl') + '/uploads/image/123.jpeg'
      })
      console.log(this.commentsList)
      // 同时让页面调到最上方
      window.scrollTo(0, 0)
    },
    // 点击回复时
    replayComment (value) {
      this.obj = value
      console.log(this.obj)
    }
  },
  // 使用钩子函数获取数据
  async mounted () {
    // 调用init方法进行评论数据的获取，并且渲染页面
    this.init()
    // 用id来获取文章页面，查看评论数量，传递给子组件
    let res = await getUserDetailById(this.$route.params.id)
    console.log(res)
    // 将获取到的数据存入变量，发送给子组件
    this.article = res.data.data
  }
}
</script>

<style lang='less' scoped>
.commentsList {
    border-top: 5px solid #ddd;
    padding: 0 15px 50px;
    box-sizing: border-box;
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
/deep/.inputcomment{
  position: fixed;
  left: 0;
  bottom: 0;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    background-color: #fff;
    align-items: flex-end;
    textarea{
        flex: 3;
        height: 50px;
        font-size: 14px;
        background-color: #eee;
        border:none;
        border-radius: 10px;
        padding: 10px;
    }
    div{
        padding: 20px;
    }
    span {
        display: block;
        flex: 1;
        height: 24px;
        line-height: 24px;
        padding: 0 10px;
        background-color: #f00;
        color:#fff;
        text-align: center;
        border-radius: 6px;
        font-size: 13px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
}
</style>
