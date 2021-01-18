import { request } from '@/utils/request'

// 登录管理
export const userLogin = (params) => {
  return request({
    url: '/private/v1/login',
    method: 'post',
    data: params
  })
}
