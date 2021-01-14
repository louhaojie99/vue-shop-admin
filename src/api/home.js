import { request } from '../utils/request'

// 登录管理
export const getMenuList = (params) => {
  return request({
    url: '/menus',
    method: 'get',
    params
  })
}
