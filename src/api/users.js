
import { request } from '@/utils/request'

// 获取用户列表数据
export const getUserList = (params) => {
  return request({
    url: '/users',
    method: 'get',
    params
  })
}

// 修改用户状态
export const putUserState = (params) => {
  return request({
    url: `/users/${params.uid}/state/${params.type}`,
    method: 'put'
  })
}

// 添加用户
export const addUser = (params) => {
  return request({
    url: '/users',
    method: 'post',
    data: params
  })
}

// 根据ID查询用户信息
export const getUserInfo = (params) => {
  return request({
    url: `/users/${params.id}`,
    method: 'get'
  })
}

// 编辑用户提交
export const editUserInfo = (params) => {
  const { email, mobile } = params
  return request({
    url: `/users/${params.id}`,
    method: 'put',
    data: { email, mobile }
  })
}

// 删除用户
export const delUserInfo = (params) => {
  return request({
    url: `/users/${params.id}`,
    method: 'delete'
  })
}
