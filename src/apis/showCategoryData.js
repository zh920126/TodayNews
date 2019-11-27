// 引入axios
import axios from '@/utils/myaxios'

// 创建获取数据的方法并向外暴露
export const showCategoryData = (params) => {
  return axios({
    url: '/post',
    params
  })
}
