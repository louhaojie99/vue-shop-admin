import { request } from '@/utils/request'

// 获取左侧菜单列表
export const getCategories = (params) => {
  return request({
    url: '/private/v1/categories',
    method: 'get',
    params
  })
}

// 获取父级分类的分页列表
export const getParentCateList = (params) => {
  return request({
    url: '/private/v1/categories',
    method: 'get',
    params
  })
}
