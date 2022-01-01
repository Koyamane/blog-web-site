// @ts-ignore
/* eslint-disable */

declare namespace API {
  type PageParams = {
    dto?: Record<string, string>
    searchMap?: {
      [key: string]: {
        opt: 'LIKE' | 'IN' | 'NOT_IN'
        value: string
      }
    }
    betweenMap?: Record<string, string[]>
    /** 1是升序，-1是降序 */
    sort?: Record<string, 1 | -1>
    /** 过滤字段，为空不过滤，1显示，0不显示 */
    filter?: Record<string, 1 | 0>
    current?: number
    pageSize?: number
  }

  type CurrentUser = {
    username?: string
    nickname?: string
    avatar?: string
    userId?: string
    createdDate?: string
    signature?: string
    post?: string
    tags?: string[]
    notifyCount?: number
    unreadCount?: number
    email?: string
    phone?: string
    country?: { label?: string; value?: string }
    area?: string[]
    address?: string
    access?: 'admin' | 'user'
  }

  type BlogInfo = {
    id: number | string
    createdName: string
    createdId: string
    createdAvatar: string
    createdDate: string
    title: string
    content: string
    previewImg: string
    tags: string[]
    reads: number
    likes: number
    collections: number
  }

  type UpdateCurrentUser = Omit<
    CurrentUser,
    'username' | 'userId' | 'createdDate' | 'access' | 'notifyCount' | 'unreadCount'
  >

  type LoginResult = {
    status?: string
    type?: string
    currentAuthority?: string
  }

  type RuleListItem = {
    key?: number
    disabled?: boolean
    href?: string
    avatar?: string
    name?: string
    owner?: string
    desc?: string
    callNo?: number
    status?: number
    updatedAt?: string
    createdAt?: string
    progress?: number
  }

  type RuleList = {
    data?: RuleListItem[]
    /** 列表的内容总数 */
    total?: number
    success?: boolean
  }

  type FakeCaptcha = {
    code?: number
    status?: string
  }

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string
    /** 业务上的错误信息 */
    errorMessage?: string
    /** 业务上的请求是否成功 */
    success?: boolean
  }

  type NoticeIconList = {
    data?: NoticeIconItem[]
    /** 列表的内容总数 */
    total?: number
    success?: boolean
  }

  type NoticeIconItemType = 'notification' | 'message' | 'event'

  type NoticeIconItem = {
    id?: string
    extra?: string
    key?: string
    read?: boolean
    avatar?: string
    title?: string
    status?: string
    datetime?: string
    description?: string
    type?: NoticeIconItemType
  }
}
