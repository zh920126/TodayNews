// 引入axios
import axios from 'axios'

// 设置基准路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'
localStorage.setItem('heima_39_imgaddress', 'http://127.0.0.1:3000')

// config:就是传说中的请求报文
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config)
  // 登录成功之后，每次调用axios都会添加token进去headers里面，就不用手动添加了
  let token = localStorage.getItem('heima_39_Authorization')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 4.添加响应拦截器
// response:响应报文
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log(response)
  let msg = response.data.message
  if (msg === '用户信息验证失败') {
    // 说明token没有，则应该重新登陆
    window.location = '#/login'
  }
  return response
//   return response.data ? response.data : response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 暴露
export default axios
