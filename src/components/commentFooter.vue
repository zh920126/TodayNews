<template>
  <div class="commentFooter">
    <div class="footer" v-show="isFocus">
      <div class="footer_left" @click="isFocus=!isFocus">写评论</div>
      <van-icon name="comment-o" class="contact" @click="$router.push({path: `/comments/${post.id}`})"/>
      <span class="amount">{{post&&post.comment_length}}</span>
      <van-icon name="star-o" class="star" @click="handlerStar" :class="{red:isShow}"/>
      <van-icon name="cluster-o" class="fenxiang" />
    </div>
     <div class="inputcomment" v-show='!isFocus'>
        <textarea  ref='commtext' rows="5" :placeholder="placeholder"></textarea>
        <div>
            <span @click="sendComment">发送</span>
            <span @click='cancleComments'>取消</span>
        </div>
    </div>
  </div>
</template>

<script>
// 引入收藏文章的api
import { userPost } from '@/apis/users.js'

// 引入发布评论的apis
import { replayComments } from '../apis//users.js'
export default {
  data () {
    return {
      isFocus: true,
      isShow: false,
      data: {},
      placeholder: ''
    }
  },
  // 数据父传子，获取数据来进行收藏
  props: ['post', 'replayobj'],
  // 设置watch对replayobj进行监控，replayobj一有数据就代表有人在父组件上点了‘回复’
  watch: {
    // 当监控到有数据传入时，表示有人点了回复，这时需要弹出文本域
    replayobj () {
      if (this.replayobj) {
        // 弹出文本域
        this.isFocus = false
        // 同时在文本域中显示需要回复的对象的名字并@
        console.log(this.replayobj)
        this.placeholder = '@' + this.replayobj.user.nickname
        // 并且需要自动获取焦点,在vue中不能只用使用ref的方式来获取，需要添加定时器
        // 或者是直接在文本域当中写入autofocus即可
        setTimeout(() => {
          this.$refs.commtext.focus()
        }, 0)
      }
    }
  },
  methods: {
    // 点击取消按钮时 因为点击回复弹出文本框存在bug ，点击取消会后再次点击回复时，文本域不会自动弹出，所以需要设置函数
    cancleComments () {
      // 点击取消时，让文本域隐藏
      this.isFocus = true
      // 同时让文本域中的内容清空
      this.$refs.commtext.value = ''
      // 想父元素发射事件，告诉父元素这边取消了，需要重置replayobj的数据
      this.$emit('resetreplayobj')
    },
    async handlerStar () {
      console.log(this.post)
      let res = await userPost(this.post.id)
      // console.log(res)
      if (res.data.message === '收藏成功') {
        // 当收藏成功时候，让星星变为红色
        this.isShow = true
        console.log(this.isShow)
        // 提示用户收藏成功
        this.$toast.success(res.data.message)
      } else {
        this.$toast.success(res.data.message)
        this.isShow = false
      }
    },
    // 点击按钮时发布评论
    async sendComment () {
      // 采用ref方法获取文本域中的内容
      console.log(this.$refs.commtext.value)
      // 页面ID 进入页面时就在url栏
      // let id = this.$route.params.id
      // 需要传入对应格式的数据
      let data = {
        content: this.$refs.commtext.value
      }
      // 如果传过来的数据里面有数据，就代表是回复给其他的用户的跟帖
      if (this.replayobj) {
        data.parent_id = this.replayobj.id
      }
      // 调用方法进行发布评论
      let res = await replayComments(this.post.id, data)
      console.log(res)
      if (res.data.message === '评论发布成功') {
        // 当评论发布成功时，需要告诉父组件去刷新页面，将最新的评论放到页面的最上方
        this.$emit('refreshComm')
        // 让文娱里面的内容清空
        this.$refs.commtext.value = ''
        // 让文本域收缩起来
        this.isFocus = !this.isFocus
        // 同时让评论数量增加
        ++this.post.comment_length
      }
    }
  }
}
</script>

<style lang='less' scoped>
.red{
  color: red!important;
}
.footer {
  position: relative;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
  display: flex;
  line-height: 40px;
  padding: 10px;
  .amount{
    position: absolute;
    left: 235/360*100vw;
    top: 7/360*100vw;
    width: 25px;
    height: 15px;
    line-height: 15px;
    text-align: center;
    font-size: 12px;
    background-color: red;
    color: #fff;
    border-radius: 5px;
  }
  .footer_left {
    flex: 4;
    height: 30px;
    border-radius: 15px;
    background-color: #d7d7d7;
    margin-right: 30px;
    line-height: 30px;
    text-indent: 20px;
    font-size: 13px;
  }
  .contact,
  .star,
  .fenxiang {
    flex: 1;
    line-height: 30px;
    font-size: 25px;
    color: #666;
  }
.inputcomment{
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
}
</style>
