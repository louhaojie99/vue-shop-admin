import { request } from '../utils/request'

// 权限管理
export const getRightsList = (params) => {
  return request({
    url: `/rights/${params.type}`,
    method: 'get'
  })
}
