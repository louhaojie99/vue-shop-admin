import { request } from '@/utils/request'

// 权限管理 获取权限列表
export const getRightsList = (params) => {
  return request({
    url: `/private/v1/rights/${params.type}`,
    method: 'get'
  })
}

// 权限管理 获取角色列表
export const getRolesList = (params) => {
  return request({
    url: '/private/v1/roles',
    method: 'get',
    params
  })
}

// 权限管理 角色列表 删除角色指定权限
export const delRolePower = (params) => {
  return request({
    url: `/private/v1/roles/${params.roleId}/rights/${params.rightId}`,
    method: 'delete'
  })
}

// 权限管理 角色列表 所有权限列表
export const getAllrights = (params) => {
  return request({
    url: `/private/v1/rights/${params.type}`,
    method: 'get'
  })
}

// 权限管理 角色列表 角色授权
export const roleAuthorization = (params) => {
  const { rids } = params
  return request({
    url: `/private/v1/roles/${params.roleId}/rights`,
    method: 'post',
    data: { rids },
    Qs: true // 开启不序列化操作
  })
}

