/*
 * @Author: dingyun
 * @Date: 2022-01-02 10:38:24
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2022-01-02 10:38:26
 * @Description:
 */
import React, { useState } from 'react'
import { Button, Form, message } from 'antd'
import { FormattedMessage, useIntl } from 'umi'
import { ModalForm, ProFormText } from '@ant-design/pro-form'
import { aesEncrypt } from '@/utils/encryption'
import styles from './ModifyPasswordView.less'
import { UpdatePasswordApi } from '../service'

interface PasswordParams {
  password: string
  confirm: string
}

const ModifyPassword: React.FC = () => {
  const intl = useIntl()
  const [form] = Form.useForm()
  const [btnLoading, setBtnLoading] = useState(false)
  // 这个值是用来刷新页面的，为了让hint立刻更新
  const [checkNow, setCheckNow]: [boolean, any] = useState(true)

  const passwordHint = () => {
    const value = form.getFieldValue('password')

    if (!value) {
      return undefined
    }

    if (value.length > 16) {
      return (
        <div className={styles.error}>
          {intl.formatMessage({
            id: 'pages.register.password.tooLong',
            defaultMessage: '密码不能超过16个字符'
          })}
        </div>
      )
    }

    if (value.length > 9) {
      return (
        <div className={styles.success}>
          {intl.formatMessage({
            id: 'pages.register.password.strongSafetyFactor',
            defaultMessage: '安全系数：强'
          })}
        </div>
      )
    }

    if (value.length > 5) {
      return (
        <div className={styles.warning}>
          {intl.formatMessage({
            id: 'pages.register.password.mediumSafetyFactor',
            defaultMessage: '安全系数：中'
          })}
        </div>
      )
    }

    return (
      <div className={styles.error}>
        {intl.formatMessage({
          id: 'pages.register.password.weakSafetyFactor',
          defaultMessage: '安全系数：弱'
        })}
      </div>
    )
  }

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise
    const password = form.getFieldValue('password')
    if (value && value !== password) {
      return promise.reject(
        <FormattedMessage
          id='pages.register.confirmPassword.mismatch'
          defaultMessage='两次输入的密码不匹配'
        />
      )
    }
    return promise.resolve()
  }

  // 校验密码
  const checkPassword = (_: any, value: string) => {
    setCheckNow(!checkNow)

    if (value && form.getFieldValue('confirm')) {
      // 这里必须异步，因为提交表单的时候会走一边校验，两个一直执行会有冲突
      setTimeout(() => {
        form.validateFields(['confirm'])
      })
    }

    const promise = Promise

    // 没有值的情况
    if (!value) {
      return promise.reject(
        <FormattedMessage id='pages.register.password.noValue' defaultMessage='请输入密码！' />
      )
    }

    if (value.length < 6) {
      return promise.reject(
        <FormattedMessage id='pages.register.password.tooShort' defaultMessage='密码太短' />
      )
    }

    if (value.length > 16) {
      return promise.reject(
        <FormattedMessage
          id='pages.register.password.tooLong'
          defaultMessage='密码不能超过16个字符'
        />
      )
    }

    return promise.resolve()
  }

  const handleModify = async (formData: PasswordParams) => {
    setBtnLoading(true)

    try {
      await UpdatePasswordApi(aesEncrypt(formData.password))
      message.success(
        intl.formatMessage({
          id: 'pages.form.modify.success',
          defaultMessage: '修改成功'
        })
      )
    } catch (error) {
      message.success(
        intl.formatMessage({
          id: 'pages.form.modify.error',
          defaultMessage: '修改失败，请重试'
        })
      )
    }

    setBtnLoading(false)
    return true
  }

  const submitBox = (props: any) => {
    return [
      <Button key='reset' disabled={btnLoading} onClick={() => props.form?.resetFields?.()}>
        {intl.formatMessage({
          id: 'pages.form.cancel',
          defaultMessage: '取消'
        })}
      </Button>,
      <Button key='submit' type='primary' htmlType='submit' loading={btnLoading}>
        {intl.formatMessage({
          id: 'pages.form.ok',
          defaultMessage: '确定'
        })}
      </Button>
    ]
  }

  return (
    <ModalForm<PasswordParams>
      title={intl.formatMessage({
        id: 'pages.account.security.modifyPassword',
        defaultMessage: '修改密码'
      })}
      form={form}
      modalProps={{
        destroyOnClose: true,
        confirmLoading: btnLoading
      }}
      submitter={{
        render: submitBox
      }}
      trigger={
        <a>
          {intl.formatMessage({
            id: 'pages.account.security.modify',
            defaultMessage: '修改'
          })}
        </a>
      }
      onVisibleChange={visible => visible && form.resetFields()}
      onFinish={handleModify}
    >
      <ProFormText.Password
        name='password'
        label={intl.formatMessage({
          id: 'pages.register.password.label',
          defaultMessage: '密码'
        })}
        disabled={btnLoading}
        help={passwordHint()}
        fieldProps={{ size: 'large' }}
        placeholder={intl.formatMessage({
          id: 'pages.register.password',
          defaultMessage: '密码（6~16位字符，区分大小写）'
        })}
        rules={[{ validator: checkPassword }]}
      />

      <ProFormText.Password
        name='confirm'
        label={intl.formatMessage({
          id: 'pages.register.confirmPassword',
          defaultMessage: '确认密码'
        })}
        disabled={btnLoading}
        fieldProps={{ size: 'large' }}
        placeholder={intl.formatMessage({
          id: 'pages.form.inputMsg',
          defaultMessage: '请输入'
        })}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id='pages.register.confirmPassword.noValue'
                defaultMessage='请输入确认密码！'
              />
            )
          },
          { validator: checkConfirm }
        ]}
      />
    </ModalForm>
  )
}

export default ModifyPassword
