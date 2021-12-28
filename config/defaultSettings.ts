/*
 * @Author: dingyun
 * @Date: 2021-12-09 17:13:09
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2021-12-09 19:50:24
 * @Description:
 */
import { Settings as LayoutSettings } from '@ant-design/pro-layout'

const Settings: LayoutSettings & {
  pwa?: boolean
  logo?: string
} = {
  // 设置标题的 title
  title: '山音曦',
  navTheme: 'light',
  primaryColor: '#FAAD14',
  layout: 'top',
  contentWidth: 'Fixed',
  fixedHeader: true,
  fixSiderbar: true,
  splitMenus: false
}

export default Settings
