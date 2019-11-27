// 引入axios
import axios from 'axios'

// 向外暴露下载图片的方法
export const uploadfile = (file) => {
  return axios({
    method: 'post',
    url: '/upload',
    data: file
  })
}
