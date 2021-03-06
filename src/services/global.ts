/*
 * @Author: dingyun
 * @Date: 2021-12-24 23:56:12
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2021-12-29 22:42:43
 * @Description:
 */
import { request } from 'umi'

/**
 * @description 拿到crsf token，不然post请求发送不了，egg的安全策略
 * @returns Promise
 */
export const GetCrsfKey = () => {
  return request('/home/api/crsf')
}

/**
 * @description 获取用户信息，没有 userId 就获取当前用户
 * @returns Promise
 */
export const GetUserInfo = (userId?: string | number) => {
  return request('/user/api/info', { method: 'post', data: { userId } })
}

/**
 * @description 更新当前用户信息
 * @returns Promise
 */
export const UpdateCurrentUser = (params: API.UpdateCurrentUser) => {
  return request('/user/api/current/update', { method: 'put', data: params })
}

/**
 * @description 退出登录
 * @returns Promise
 */
export const LogOutApi = () => {
  return request('/user/api/logOut')
}
