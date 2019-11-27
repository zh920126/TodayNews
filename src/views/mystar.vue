<template>
  <div class="stars">
      <myheader title='我的收藏'>
          <span slot="left" class="iconfont iconjiantou2" @click="$router.back()">&lt;</span>
      </myheader>
      <div class="list">
          <articleblock v-for="(value,index) in userStar" :key="index" :post="value" @click="$router.push({path: `/editDetail/${value.id}`})"></articleblock>
      </div>
  </div>
</template>

<script>
// 引入组件
import myheader from '@/components/myheader.vue'
import articleblock from '@/components/articleBlock.vue'
// 引入获取收藏数据的apis
import { userStar } from '../apis/users.js'
export default {
  data () {
    return {
      // 设置变量获取数据
      userStar: []
    }
  },
  // 注册组件
  components: {
    myheader, articleblock
  },
  // 钩子函数获取数据
  async mounted () {
    let res = await userStar()
    console.log(res)
    this.userStar = res.data.data
  }
}
</script>

<style>

</style>
