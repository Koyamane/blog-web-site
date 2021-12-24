/*
 * @Author: dingyun
 * @Date: 2021-12-21 19:51:35
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2021-12-21 20:28:54
 * @Description:
 */
import { request } from 'umi'

export const BlogPageApi = (params?: API.PageParams) => {
  return request('/blog/api/page', { method: 'post', data: params })
}
