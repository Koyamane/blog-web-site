/*
 * @Author: dingyun
 * @Date: 2021-12-10 20:54:10
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2021-12-10 21:59:45
 * @Description:
 */
import { Space } from 'antd'
import React from 'react'
import { useModel, SelectLang } from 'umi'
import NoticeIconView from '../NoticeIcon'
import Avatar from './AvatarDropdown'
import styles from './index.less'

export type SiderTheme = 'light' | 'dark'

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState')

  if (!initialState || !initialState.settings) {
    return null
  }

  const { navTheme, layout } = initialState.settings
  let className = styles.right

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`
  }
  return (
    <Space className={className}>
      <NoticeIconView />
      <Avatar />
      <SelectLang className={styles.action} reload={false} />
    </Space>
  )
}
export default GlobalHeaderRight
