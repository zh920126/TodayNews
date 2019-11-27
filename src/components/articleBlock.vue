<template>
  <div class="artblock" v-if="post.type===1&&post.cover.length<=2" @click="handlerclick">
    <div class="left">
      <div class="title">{{post.title}}</div>
      <p>
        <a href="http://www.baidu.com">{{post.user.nickname}}</a>
        <a href="http://www.sina.com">{{post.comment_length}}跟帖</a>
      </p>
    </div>
    <div class="right">
      <img :src="post.cover[0].url" alt="">
    </div>
  </div>
   <div class="artblock_video" v-else-if="post.type===2" @click="handlerclick">
    <div class="left">
      <div class="title">{{post.title}}</div>
    </div>
    <div class="right">
      <img :src="post.cover[0].url" alt="">
    <van-icon name="play-circle-o" class="video_icon" @click="video_click"/>
    </div>
    <p>
        <a href="http://www.baidu.com">{{post.user.nickname}}</a>
        <a href="http://www.sina.com">{{post.comment_length}}跟帖</a>
      </p>
  </div>
   <div class="artblock_video" v-else-if="post.type===1&&post.cover.length>=3" @click="handlerclick">
    <div class="left">
      <div class="title">{{post.title}}</div>
    </div>
    <div class="imgs">
      <img :src="value.url" alt  v-for='(value,index) in post.cover' :key='index'/>
    </div>
    <p>
        <a href="http://www.baidu.com">{{post.user.nickname}}</a>
        <a href="http://www.sina.com">{{post.comment_length}}跟帖</a>
      </p>
  </div>
</template>

<script>
export default {
  props: ['post'],
  methods: {
    video_click () {
      this.$router.push('http://www.baidu.com')
    },
    // 点击页面数据的时候进行跳转
    handlerclick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less' scoped>
  .artblock{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #eee;
    .right{
      width: 120/360*100vw;
      >img{
        width: 100%;
        height: 75/360*100vw;
        display: block;
        object-fit: cover;
      }
    }
    .left{
      display: flex;
      flex:1;
      flex-direction: column;
      justify-content: space-around;
      font-size: 16px;
    }
  }
   p{
        a{
          color: #666;
          font-size: 12px;
        }
        :last-child{
            padding-left: 10px;
          }
      }
  .artblock_video{
    position: relative;
    padding:10px;
    img{
      width: 100%;
    }
  .video_icon{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    font-size: 40px;
    color: #fff;
  }
  }
  .imgs{
    display: flex;
    width: 100%;
    margin: 10px 0;
    justify-content: space-around;
    >img{
      width: 30%;
      display: block;
    }
    :nth-child(2){
        margin: 0 3%;
      }
  }
</style>
