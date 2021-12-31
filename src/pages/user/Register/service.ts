import { request } from 'umi'
import { RegisterParams } from './data'

/**
 * @description 注册
 * @returns 返回当前用户信息以及token
 */
export const RegisterApi = (params: RegisterParams) => {
  return request('/user/api/register', { method: 'post', data: params })
}
