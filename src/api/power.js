import { request } from '@/utils/request'

// 权限管理 权限列表
export const getRightsList = (params) => {
  return request({
    url: `/rights/${params.type}`,
    method: 'get'
  })
}

// 权限管理 角色列表
export const getRolesList = (params) => {
  return request({
    url: '/roles',
    method: 'get',
    params
  })
}
