<template>
  <div class="myinput">
    <input class="inp" :type="type" :placeholder="placeholder" :value="value" @input="handlerinput" :class="{red:status==='error',green:status==='success'}" @blur="handerblur">
  </div>
</template>

<script>
// import { Toast } from 'vant'
export default {
  data () {
    return {
      status: ''
    }
  },
  // 数据父传子
  props: ['placeholder', 'value', 'type', 'rules', 'err_message'],
  methods: {
    handlerinput (event) {
      // console.log(event)
      let v = event.target.value
      // console.log(123)
      this.$emit('input', v)
      if (this.rules) {
        if (this.rules.test(v)) {
          this.status = 'success'
        } else {
          this.status = 'error'
        }
      }
    },
    handerblur (event) {
      // console.log(event)
      let v = event.target.value
      if (this.rules) {
        if (!this.rules.test(v)) {
          // console.log(123)
          this.status = 'error'
          // 同时弹出提示框
          this.$toast.fail(this.err_message)
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .inp{
    width: 90%;
    height: 40px;
    border: none;
    border-bottom: 2px #999 solid;
    line-height: 40px;
    font-size: 18px;
    outline: none;
    padding-left: 10px;
    box-sizing: border-box;
    background-color: #f2f2f2;
    display: block;
    margin: 0 auto;
    margin-top: 20px;
}
.green{
  border-bottom: 2px green solid;
}
.red{
  border-bottom: 2px red solid;
}
</style>
