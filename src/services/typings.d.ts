// @ts-ignore
/* eslint-disable */

declare namespace API {
  type PageParams = {
    /** 默认精确查找，模糊查找请使用正则，例如 name: /小/ */
    search?: Record<string>
    current?: number
    pageSize?: number
    /** 1是升序，-1是降序 */
    sort?: {
      [key: string]: 1 | -1
    }
    /** 过滤字段，为空不过滤，1显示，0不显示 */
    filter?: {
      [key: string]: 1 | 0
    }
  }

  type CurrentUser = {
    name?: string
    avatar?: string
    userid?: string
    email?: string
    signature?: string
    title?: string
    group?: string
    tags?: { key?: string; label?: string }[]
    notifyCount?: number
    unreadCount?: number
    country?: string
    access?: string
    geographic?: {
      province?: { label?: string; key?: string }
      city?: { label?: string; key?: string }
    }
    address?: string
    phone?: string
  }

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

  type LoginParams = {
    username?: string
    password?: string
    autoLogin?: boolean
    type?: string
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
