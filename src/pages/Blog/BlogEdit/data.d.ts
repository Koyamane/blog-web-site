/*
 * @Author: dingyun
 * @Date: 2021-12-25 16:34:33
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2021-12-25 16:46:38
 * @Description:
 */

export interface BlogInfoType {
  id: number | string
  createdName: string
  createdId: string
  createdAvatar: string
  createdDate: string
  title: string
  content: string
  mdData: string
  previewImg: string
  tags: string[]
  reads: number
  likes: number
  collections: number
}

export type AddBlogType = Partial<BlogInfoType> & { title: BlogInfoType['title'] }
