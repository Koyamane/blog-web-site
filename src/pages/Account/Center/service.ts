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
 * @description 分页查询某用户的博文列表
 * @returns Promise
 */
export const SomebodyBlogPage = (userId: API.CurrentUser['userId'], params?: API.PageParams) => {
  return request(`/blog/api/page/${userId}`, { method: 'post', data: params })
}

/**
 * @description 删除博客
 * @returns Promise
 */
export const DeleteBlogApi = (id: API.BlogInfo['id']) => {
  return request('/blog/api/delete', { method: 'delete', data: { id } })
}
