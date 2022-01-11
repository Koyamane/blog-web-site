/*
 * @Author: dingyun
 * @Date: 2021-12-10 20:54:10
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2022-01-11 11:26:59
 * @Description:
 */
import { RequestConfig, RunTimeLayoutConfig } from 'umi'
import { history } from 'umi'
import type { MenuDataItem, Settings as LayoutSettings } from '@ant-design/pro-layout'
import { PageLoading } from '@ant-design/pro-layout'
import RightContent from '@/components/RightContent'
import Footer from '@/components/Footer'
import requestConfig from './requestConfig'
import { GetCrsfKey, GetUserInfo } from './services/global'

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
  try {
    // 这个有可能过期的，所以每次都要拿
    const res = await GetCrsfKey()
    sessionStorage.setItem('csrfToken', res)
  } catch (error) {
    console.log(error)
  }

  const fetchUserInfo = async () => {
    try {
      const userInfo = await GetUserInfo()
      return userInfo
    } catch (error) {
      // history.push(loginPath)
      console.log(error)
    }
    return undefined
  }

  // 不是登录页面且有token时，就获取用户信息
  if (history.location.pathname !== loginPath && localStorage.getItem('token')) {
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
    menuDataRender: (menuList: MenuDataItem[]): MenuDataItem[] => {
      // 因为 routes.ts 中，最外层包了一层 {}，所以这里要去掉最外层，否则，菜单不会显示
      // 包那一层的原因是要做全局 layout

      return menuList[menuList.length - 1].routes || []
    },
    // menuHeaderRender: 左上角的
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings
  }
}

export const request: RequestConfig = requestConfig
