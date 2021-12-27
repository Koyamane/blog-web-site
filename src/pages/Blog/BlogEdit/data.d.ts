/*
 * @Author: dingyun
 * @Date: 2021-12-25 16:34:33
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2021-12-27 13:58:24
 * @Description:
 */

export interface BlogInfoType {
  id: number | string
  createdName: string
  createdId: string
  createdAvatar: string
  createdDate: string
  editor: 'RICH_TEXT' | 'MARKDOWN'
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

export interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export interface MarkdownEditorProps {
  mdValue: string
  locale: string
  mdChange: (value: string) => void
  htmlChange: (value: string) => void
}
