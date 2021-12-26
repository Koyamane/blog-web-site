import { request } from 'umi'

export const BlogInfoApi = (id: number | string) => {
  return request('/blog/api/info', { method: 'get', params: { id } })
}
