import { request } from '@/utils/request'

// 获取左侧菜单列表
export const getMenuList = (params) => {
  return request({
    url: '/menus',
    method: 'get',
    params
  })
}

