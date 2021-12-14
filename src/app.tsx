/*
 * @Author: dingyun
 * @Date: 2021-12-10 20:54:10
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2021-12-12 13:20:50
 * @Description:
 */
import type { RequestConfig, RunTimeLayoutConfig } from 'umi'
import { history } from 'umi'
import type { Settings as LayoutSettings } from '@ant-design/pro-layout'
import { PageLoading } from '@ant-design/pro-layout'
import RightContent from '@/components/RightContent'
import Footer from '@/components/Footer'
import requestConfig from './requestConfig'

const queryCurrentUser: any = new Promise(r => r({}))
const loginPath = '/user/login'

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />
}

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>
  currentUser?: API.CurrentUser
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser()
      return msg.data
    } catch (error) {
      // history.push(loginPath)
    }
    return undefined
  }

  // 不是登录页面，就获取用户信息
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo()
    return {
      fetchUserInfo,
      currentUser,
      settings: {}
    }
  }

  return {
    fetchUserInfo,
    settings: {}
  }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name
    // },
    footerRender: () => <Footer />,
    onPageChange: () => {
      // const { location } = history
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath)
      // }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings
  }
}

export const request: RequestConfig = requestConfig

// export function rootContainer(container: ReactNode) {
//   return (
//     <>
//       <SiteBackground />
//       {container}
//     </>
//   )
// }
