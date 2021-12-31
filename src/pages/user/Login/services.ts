import { request } from 'umi'
import { LoginParams } from './data'

/**
 * @description 登录
 * @returns 返回当前用户信息以及token
 */
export const LoginApi = (params: LoginParams) => {
  return request('/user/api/login', { method: 'post', data: params })
}
