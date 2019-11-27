// 引入axios文件
import axios from '@/utils/myaxios.js'

// 创建方法并向外暴露
export const getCategoryData = () => {
  return axios({
    url: `/category`
  })
}
