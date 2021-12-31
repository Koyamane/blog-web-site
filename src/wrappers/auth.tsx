import { FC } from 'react'
import { message } from 'antd'
import { Redirect, useIntl, useModel } from 'umi'

const Auth: FC = props => {
  const { initialState } = useModel('@@initialState')
  const intl = useIntl()

  if (initialState?.currentUser?.userId) {
    return <div>{props.children}</div>
  }

  message.info(
    intl.formatMessage({
      id: 'pages.auth.needLogin',
      defaultMessage: '请先登录！'
    })
  )

  return <Redirect to='/user/login' />
}

export default Auth
