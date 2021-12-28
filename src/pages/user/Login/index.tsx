import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Row } from 'antd'
import React from 'react'
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form'
import { useIntl, history, FormattedMessage } from 'umi'

import styles from './index.less'
import { UserFormInfo } from './data'

// const loginApi: any = new Promise(r => r({}))

const Login: React.FC = () => {
  const intl = useIntl()
  // const [userLoginState, setUserLoginState] = useState<API.LoginResult>({})
  // const [type, setType] = useState<string>('account')
  // const { initialState, setInitialState } = useModel('@@initialState')

  // const fetchUserInfo = async () => {
  //   const userInfo = await initialState?.fetchUserInfo?.()
  //   if (userInfo) {
  //     await setInitialState(s => ({
  //       ...s,
  //       currentUser: userInfo
  //     }))
  //   }
  // }

  // const handleSubmit = async (values: API.LoginParams) => {
  //   try {
  //     // 登录
  //     const msg = await loginApi({ ...values, type })
  //     if (msg.status === 'ok') {
  //       const defaultLoginSuccessMessage = intl.formatMessage({
  //         id: 'pages.login.success',
  //         defaultMessage: '登录成功！'
  //       })
  //       message.success(defaultLoginSuccessMessage)
  //       await fetchUserInfo()
  //       /** 此方法会跳转到 redirect 参数所在的位置 */
  //       if (!history) return
  //       const { query } = history.location
  //       const { redirect } = query as { redirect: string }
  //       history.push(redirect || '/')
  //       return
  //     }
  //     console.log(msg)
  //     // 如果失败去设置用户错误信息
  //     setUserLoginState(msg)
  //   } catch (error) {
  //     const defaultLoginFailureMessage = intl.formatMessage({
  //       id: 'pages.login.failure',
  //       defaultMessage: '登录失败，请重试！'
  //     })
  //     message.error(defaultLoginFailureMessage)
  //   }
  // }

  // const { status, type: loginType } = userLoginState

  const submitBox = (props: any) => {
    return [
      <Button
        key='submit'
        type='primary'
        className={styles.submitButton}
        onClick={() => props.form?.submit?.()}
      >
        登录
      </Button>,
      <Button
        key='register'
        className={styles.submitButton}
        onClick={() => history.push('/user/register')}
      >
        注册
      </Button>
    ]
  }

  return (
    <div className='ant-pro-form-login-container'>
      <div className='ant-pro-form-login-top'>
        <div className='ant-pro-form-login-header'>
          <span className='ant-pro-form-login-logo'>
            <img alt='logo' src='/logo.svg' />
          </span>
          <span className='ant-pro-form-login-title'>山音曦</span>
        </div>
        <div className='ant-pro-form-login-desc'>一个极其小众的博客网站</div>
      </div>

      <div className='ant-pro-form-login-main'>
        <ProForm<UserFormInfo>
          className={styles.form}
          layout='vertical'
          submitter={{
            render: submitBox
          }}
        >
          <ProFormText
            name='username'
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.username.placeholder',
              defaultMessage: '用户名: admin or user'
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id='pages.login.username.required'
                    defaultMessage='请输入用户名!'
                  />
                )
              }
            ]}
          />

          <ProFormText.Password
            name='password'
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.password.placeholder',
              defaultMessage: '密码: ant.design'
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id='pages.login.password.required'
                    defaultMessage='请输入密码！'
                  />
                )
              }
            ]}
          />

          <Row justify='space-between'>
            <ProFormCheckbox name='autoLogin'>
              <FormattedMessage id='pages.login.rememberMe' defaultMessage='自动登录' />
            </ProFormCheckbox>
            <a>
              <FormattedMessage id='pages.login.forgotPassword' defaultMessage='忘记密码' />
            </a>
          </Row>
        </ProForm>
      </div>
    </div>
  )
}

export default Login
