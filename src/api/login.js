import { request } from '../utils/request'

// 登录管理
export const userLogin = (params) => {
  return request({
    url: '/login',
    method: 'post',
    params
  })
}
