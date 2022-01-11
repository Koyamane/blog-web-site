/*
 * @Author: dingyun
 * @Date: 2021-12-09 17:13:09
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2022-01-11 15:16:14
 * @Description:
 */
import { Settings as LayoutSettings } from '@ant-design/pro-layout'

const Settings: LayoutSettings & {
  pwa?: boolean
  logo?: string
} = {
  // 设置标题的 title
  title: '山音溪',
  logo: '/logo.svg',
  navTheme: 'light',
  primaryColor: '#FAAD14', // document.ejs 文件里也要改
  layout: 'top',
  contentWidth: 'Fixed',
  fixedHeader: true,
  fixSiderbar: true,
  splitMenus: false
}

export default Settings
