<template>
  <div class="mybutton">
    <div class="btn" @click="handlerclick" :class="{danger:type==='gender',paimary:type==='paimary',waring:type==='waring',info:type==='info'}">{{text}}</div>
  </div>
</template>

<script>
export default {
  // 数据父传子
  props: ['text', 'type'],
  methods: {
    handlerclick (event) {
      // 数据子传父
      // console.log(event)
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less' scoped>
  .btn{
    width: 90%;
    height: 50px;
    line-height: 50px;
    background-color: #cc3300;
    font-size: 18px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    margin: 0 auto;
    margin-top: 50px;
  }
  .denger{
    background-color: red;
  }
  .paimary{
    background-color: green;
  }
  .waring{
    background-color: orange;
  }
  .info{
    background-color: #999;
  }
</style>
