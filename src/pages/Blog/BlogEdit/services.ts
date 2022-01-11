/*
 * @Author: dingyun
 * @Date: 2021-12-25 16:29:46
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2021-12-25 16:47:38
 * @Description:
 */
import { request } from 'umi'

export const BlogAddApi = (params: FormData) => {
  return request('/blog/api/add', { method: 'post', data: params })
}

export const BlogUpdateApi = (params: FormData) => {
  return request('/blog/api/update', { method: 'put', data: params })
}

export const BlogInfoApi = (id: number | string) => {
  return request('/blog/api/info', { method: 'get', params: { id } })
}
