import React, { useState } from 'react'
import { Button, message, Row } from 'antd'
import { useIntl, history, FormattedMessage, useModel } from 'umi'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form'
import useFormItemFillHint from '@/hooks/FormItemFillHint'
import { aesEncrypt } from '@/utils/encryption'
import { LoginApi } from './services'
import { LoginParams } from './data'
import styles from './index.less'

const Login: React.FC = () => {
  const intl = useIntl()
  const [btnLoading, setBtnLoading] = useState(false)
  const { setInitialState } = useModel('@@initialState')
  const formItemFillHint = useFormItemFillHint()

  const handleLogin = async (formData: LoginParams) => {
    try {
      setBtnLoading(true)
      // 登录
      const res = await LoginApi({
        ...formData,
        password: aesEncrypt(formData.password)
      })

      localStorage.setItem('token', res.token)
      await setInitialState(s => ({
        ...s,
        currentUser: res.userInfo
      }))

      message.success(
        intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！'
        })
      )

      /** 此方法会跳转到 redirect 参数所在的位置 */
      const { query } = history.location
      const { redirect } = query as { redirect: string }
      history.replace(redirect || '/')
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'pages.login.failure',
          defaultMessage: '登录失败，请重试！'
        })
      )
      setBtnLoading(false)
    }
  }

  const submitBox = (props: any) => {
    return [
      <Button
        key='submit'
        type='primary'
        loading={btnLoading}
        className={styles.submitButton}
        onClick={() => props.form?.submit?.()}
      >
        {intl.formatMessage({
          id: 'pages.login.submit',
          defaultMessage: '登录'
        })}
      </Button>,
      <Button
        key='register'
        disabled={btnLoading}
        className={styles.submitButton}
        onClick={() => history.push('/user/register')}
      >
        {intl.formatMessage({
          id: 'pages.login.register',
          defaultMessage: '注册'
        })}
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
          <span className='ant-pro-form-login-title'>
            {intl.formatMessage({
              id: 'pages.layouts.title',
              defaultMessage: '山音曦'
            })}
          </span>
        </div>
        <div className='ant-pro-form-login-desc'>
          {intl.formatMessage({
            id: 'pages.layouts.description',
            defaultMessage: '一个极其小众的博客网站'
          })}
        </div>
      </div>

      <div className='ant-pro-form-login-main'>
        <ProForm<LoginParams>
          className={styles.form}
          layout='vertical'
          submitter={{
            render: submitBox
          }}
          onFinish={handleLogin}
        >
          <ProFormText
            name='username'
            disabled={btnLoading}
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.username',
              defaultMessage: '用户名'
            })}
            rules={[
              {
                required: true,
                message: formItemFillHint('login.username')
              }
            ]}
          />

          <ProFormText.Password
            name='password'
            disabled={btnLoading}
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.password',
              defaultMessage: '密码'
            })}
            rules={[
              {
                required: true,
                message: formItemFillHint('login.password')
              }
            ]}
          />

          <Row className={styles.marginLg} justify='space-between'>
            <ProFormCheckbox noStyle name='rememberMe' disabled={btnLoading}>
              <FormattedMessage id='pages.login.rememberMe' defaultMessage='记住我' />
            </ProFormCheckbox>

            {/* 不用管这个提示，她是有 disabled 的 */}
            <a disabled={btnLoading}>
              <FormattedMessage id='pages.login.forgotPassword' defaultMessage='忘记密码' />
            </a>
          </Row>
        </ProForm>
      </div>
    </div>
  )
}

export default Login
