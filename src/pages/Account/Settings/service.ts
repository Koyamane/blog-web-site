/*
 * @Author: dingyun
 * @Date: 2022-01-01 12:19:06
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2022-01-01 15:20:56
 * @Description:
 */
import { request } from 'umi'

/**
 * @description 修改密码
 * @returns Promise
 */
export const UpdatePasswordApi = (password: string) => {
  return request('/user/api/current/update/passowrd', { method: 'put', data: { password } })
}

/**
 * @description 修改当前用户头像
 * @returns Promise
 */
export const UpdateAvatarApi = (file: FormData) => {
  return request('/user/api/avatar/update', { method: 'put', data: file })
}
