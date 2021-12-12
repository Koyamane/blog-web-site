import React, { useCallback } from 'react'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Menu } from 'antd'
import { history, useModel } from 'umi'
import { stringify } from 'querystring'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.less'
import { outLogin } from '@/services/ant-design-pro/api'
import type { MenuInfo } from 'rc-menu/lib/interface'

export type GlobalHeaderRightProps = {
  menu?: boolean
}

const goLogin = () => {
  const { query = {}, search, pathname } = history.location
  const { redirect } = query
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname + search
      })
    })
  }
}

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await outLogin()
  goLogin()
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState')

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event
      if (key === 'logout') {
        setInitialState(s => ({ ...s, currentUser: undefined }))
        loginOut()
        return
      }
      history.push(`/account/${key}`)
    },
    [setInitialState]
  )

  const notLogin = (
    <span className={`${styles.action} ${styles.account}`} onClick={goLogin}>
      <Avatar size='small' className={styles.avatar} icon={<UserOutlined />} alt='avatar' />
      <span className={`${styles.name} anticon`}>未登录</span>
    </span>
  )

  if (!initialState) {
    return notLogin
  }

  const { currentUser } = initialState

  if (!currentUser || !currentUser.name) {
    return notLogin
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key='center'>
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key='settings'>
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key='logout'>
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  )

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size='small' className={styles.avatar} src={currentUser.avatar} alt='avatar' />
        <span className={`${styles.name} anticon`}>{currentUser.name}</span>
      </span>
    </HeaderDropdown>
  )
}

export default AvatarDropdown
