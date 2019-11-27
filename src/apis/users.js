// 引入axios
import axios from '@/utils/myaxios.js'

// 添加方法实现登录
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}

// 实现注册
export const register = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}

// 根据id获取数据
export const getUserInfoById = (id) => {
  return axios({
    // 从本地存储中将token获取到，并上传到headers里面
    // headers: {
    //   Authorization: localStorage.getItem('heima_39_Authorization')
    // },
    url: `/user/${id}`
  })
}

// 根据id上传数据
export const updateUserInfoById = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}

// 获取文章数据
export const getUserDetailById = (id) => {
  return axios({
    url: `/post/${id}`
  })
}

// 关注用户
export const userFocus = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}

// 取消用户关注
export const userUnFocus = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}
// 获取用户关注列表
export const userFollowList = () => {
  return axios({
    url: '/user_follows'
  })
}

// 点赞文章
export const userLike = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}

// 收藏文章
export const userPost = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}

// 获取收藏文章的数据
export const userStar = () => {
  return axios({
    url: '/user_star'
  })
}

// 获取用户评论列表数据
export const userComments = (id) => {
  return axios({
    url: `/post_comment/${id}`
  })
}

// 发表评论
export const replayComments = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}

// 搜索推荐
export const postSearch = (keyword) => {
  return axios({
    url: '/post_search_recommend',
    params: { keyword }
  })
}

// 搜索文章、
export const searchArticle = (keyword) => {
  return axios({
    url: '/post_search',
    params: { keyword }
  })
}
