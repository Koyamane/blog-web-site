import React, { useCallback } from 'react'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Menu, message } from 'antd'
import { FormattedMessage, history, useIntl, useModel } from 'umi'
import { stringify } from 'querystring'
import type { MenuInfo } from 'rc-menu/lib/interface'
import { LogOutApi } from '@/services/global'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.less'

export type GlobalHeaderRightProps = {
  menu?: boolean
}

const goLogin = () => {
  const { search, pathname } = history.location
  if (window.location.pathname !== '/user/login') {
    history.push({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname + search
      })
    })
  }
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState')
  const intl = useIntl()

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    try {
      await LogOutApi()
      message.success(
        intl.formatMessage({
          id: 'pages.account.logOut.success',
          defaultMessage: '退出登录成功！'
        })
      )
      goLogin()
      // 如果当前页是仅登录可查的话，会有闪烁，加异步1s也没用
      localStorage.clear()
    } catch (error) {
      console.log(error)
      message.error(
        intl.formatMessage({
          id: 'pages.account.logOut.error',
          defaultMessage: '退出登录失败，请重试！'
        })
      )
    }
  }

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
    [intl.locale, setInitialState]
  )

  const notLogin = (
    <span className={`${styles.action} ${styles.account}`} onClick={goLogin}>
      <Avatar size='small' className={styles.avatar} icon={<UserOutlined />} alt='avatar' />
      <span className={`${styles.name} anticon`}>
        {intl.formatMessage({
          id: 'pages.account.notLoggedIn',
          defaultMessage: '未登录'
        })}
      </span>
    </span>
  )

  if (!initialState) {
    return notLogin
  }

  const { currentUser } = initialState

  if (!currentUser || !currentUser.username) {
    return notLogin
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key='center'>
          <UserOutlined />
          <FormattedMessage id='pages.account.center' defaultMessage='个人中心' />
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key='settings'>
          <SettingOutlined />
          <FormattedMessage id='pages.account.settings' defaultMessage='个人设置' />
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key='logout'>
        <LogoutOutlined />
        <FormattedMessage id='pages.account.logOut' defaultMessage='退出登录' />
      </Menu.Item>
    </Menu>
  )

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size='small'
          className={styles.avatar}
          icon={<UserOutlined />}
          src={currentUser.avatar}
          alt='avatar'
        />
        <span className={`${styles.name} anticon`}>{currentUser.nickname}</span>
      </span>
    </HeaderDropdown>
  )
}

export default AvatarDropdown
