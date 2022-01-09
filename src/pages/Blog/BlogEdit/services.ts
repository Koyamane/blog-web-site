/*
 * @Author: dingyun
 * @Date: 2021-12-25 16:29:46
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2021-12-25 16:47:38
 * @Description:
 */
import { request } from 'umi'
import { AddBlogType } from './data'

export const BlogAddApi = (params: AddBlogType) => {
  return request('/blog/api/add', { method: 'post', data: params })
}

export const BlogUpdateApi = (params: AddBlogType) => {
  return request('/blog/api/update', { method: 'put', data: params })
}

export const BlogInfoApi = (id: number | string) => {
  return request('/blog/api/info', { method: 'get', params: { id } })
}
