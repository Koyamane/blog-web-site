import React from 'react'
import { Button, Result } from 'antd'
import { FormattedMessage, Link, useModel } from 'umi'

import styles from './style.less'

const actions = (
  <div className={styles.actions}>
    <Link to='/'>
      <Button size='large'>
        <FormattedMessage id='pages.home.backHome' defaultMessage='回首页' />
      </Button>
    </Link>
    <Link to='/account/settings'>
      <Button size='large' type='primary'>
        <FormattedMessage
          id='pages.register.result.improvePersonalInformation'
          defaultMessage='完善个人信息'
        />
      </Button>
    </Link>
  </div>
)

const RegisterResult: React.FC = () => {
  const { initialState } = useModel('@@initialState')

  return (
    <Result
      className={styles.registerResult}
      status='success'
      title={
        <div className={styles.title}>
          <span>
            <FormattedMessage
              id='pages.register.result.success.prefix'
              defaultMessage='你的账号：'
            />
            {initialState?.currentUser?.username}
            <FormattedMessage
              id='pages.register.result.success.suffix'
              defaultMessage=' 注册成功'
            />
          </span>
        </div>
      }
      subTitle={
        <FormattedMessage
          id='pages.register.result.success.hint'
          defaultMessage='可以尽情地发布内容啦'
        />
      }
      extra={actions}
    />
  )
}

export default RegisterResult
