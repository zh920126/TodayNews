<template>
    <div class="sour">
        <!-- 需要判断是否还需要递归，v-if='data.parent'就是递归结束的标识 -->
        <!-- :data='data.parent'是组件所需要的数据 -->
     <p>
        <span>{{data && data.user.nickname}} &nbsp;&nbsp;2小时前</span>
        <span @click="sendComments(data)">回复</span>
      </p>
      <div>{{data && data.content}}</div>
      <!-- 递归组件一定要有判定不再继续下去的变量  不然就会报错 超过递归的最大值32次 -->
      <mycomment v-if="data && data.parent" :data='data.parent'  @replayComment='sendComments(data.parent)'></mycomment>
    </div>
</template>

<script>
export default {
  // name属性就是当前的组件注册，用于组件递归
  name: 'mycomment',
  // 定义变量，用于接收父元素传过来的数据 父传子
  props: ['data'],
  components: {
    // comm
  },
  methods: {
    // 点击事件触发，将数据发给父组件
    sendComments (data) {
      this.$emit('replayComment', data)
    }
  }
}
</script>

<style lang='less' scoped>
.sour {
  border: 1px solid #ddd;
  padding: 5px;
  color: #999;
  line-height: 25px;
  > p {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
  > div {
    font-size: 13px;
  }
}
</style>
