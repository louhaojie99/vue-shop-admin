import { request } from '@/utils/request'

// 获取左侧菜单列表
export const getMenuList = (params) => {
  return request({
    url: '/private/v1/menus',
    method: 'get',
    params
  })
}

