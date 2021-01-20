import { request } from '@/utils/request'

// 获取用户列表数据
export const getUserList = (params) => {
  return request({
    url: '/private/v1/users',
    method: 'get',
    params
  })
}

// 修改用户状态
export const putUserState = (params) => {
  return request({
    url: `/private/v1/users/${params.uid}/state/${params.type}`,
    method: 'put'
  })
}

// 添加用户
export const addUser = (params) => {
  return request({
    url: '/private/v1/users',
    method: 'post',
    data: params
  })
}

// 根据ID查询用户信息
export const getUserInfo = (params) => {
  return request({
    url: `/private/v1/users/${params.id}`,
    method: 'get'
  })
}

// 修改用户信息
export const editUserInfo = (params) => {
  const { email, mobile } = params
  return request({
    url: `/private/v1/users/${params.id}`,
    method: 'put',
    data: { email, mobile }
  })
}

// 删除用户
export const delUserInfo = (params) => {
  return request({
    url: `/private/v1/users/${params.id}`,
    method: 'delete'
  })
}

// 获取角色列表
export const getRoleList = (params) => {
  return request({
    url: `/private/v1/roles`,
    method: 'get',
    params
  })
}

// 分配用户角色   未联调
export const allotUserRole = (params) => {
  const { mobile, email } = params
  return request({
    url: `/users/${params.id}/role`,
    method: 'put',
    data: { mobile, email }
  })
}
