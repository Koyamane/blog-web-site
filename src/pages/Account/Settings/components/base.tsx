import React, { useState } from 'react'
import { Button, message } from 'antd'
import { FormattedMessage, useIntl, useModel } from 'umi'
import ProForm, {
  ProFormCascader,
  ProFormSelect,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-form'
import { UpdateCurrentUser } from '@/services/global'
import AvatarCrop from './AvatarCrop'
import ChinaCityTree from '../geographic/china.json'
import styles from './BaseView.less'

const BaseView: React.FC = () => {
  const intl = useIntl()
  const [btnLoading, setBtnLoading] = useState(false)
  const { initialState, setInitialState } = useModel('@@initialState')
  const currentUser = initialState?.currentUser

  const checkNickname = (_: any, value: string) => {
    if (value && /^\s*$/.test(value)) {
      return Promise.reject(
        <FormattedMessage id='pages.form.space.error' defaultMessage='不能全是空格' />
      )
    }

    if (value && value.length > 30) {
      return Promise.reject(
        <FormattedMessage id='pages.form.tooLong30' defaultMessage='不能超过30个字符' />
      )
    }

    return Promise.resolve()
  }

  const checkTags = (_: any, valArr: string[]) => {
    if (valArr.some(item => item.length > 20)) {
      return Promise.reject(
        <FormattedMessage id='pages.form.tag.error' defaultMessage='单个标签长度不能大于20' />
      )
    }

    return Promise.resolve()
  }

  const handleFinish = async (formData: API.UpdateCurrentUser) => {
    setBtnLoading(true)
    try {
      await UpdateCurrentUser({ ...formData })
      message.success(
        intl.formatMessage({
          id: 'pages.account.update.success',
          defaultMessage: '更新基本信息成功！'
        })
      )

      setInitialState(s => ({
        ...s,
        currentUser: {
          ...currentUser,
          ...formData
        }
      }))
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'pages.account.update.error',
          defaultMessage: '更新失败，请重试！'
        })
      )
    }
    setBtnLoading(false)
  }

  const submitBox = (props: any) => {
    return [
      <Button key='reset' disabled={btnLoading} onClick={() => props.form?.resetFields?.()}>
        {intl.formatMessage({
          id: 'pages.form.reset',
          defaultMessage: '重置'
        })}
      </Button>,
      <Button key='submit' type='primary' htmlType='submit' loading={btnLoading}>
        {intl.formatMessage({
          id: 'pages.account.basic.update',
          defaultMessage: '更新基本信息'
        })}
      </Button>
    ]
  }

  return (
    <div className={styles.baseView}>
      <div className={styles.left}>
        <ProForm<API.CurrentUser>
          layout='vertical'
          hideRequiredMark
          onFinish={handleFinish}
          initialValues={{ ...currentUser }}
          submitter={{
            render: submitBox
          }}
        >
          <ProFormText
            width='md'
            name='nickname'
            label={intl.formatMessage({
              id: 'pages.account.basic.nickname',
              defaultMessage: '昵称'
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id='pages.account.basic.nickname-message'
                    defaultMessage='请输入您的昵称！'
                  />
                )
              },
              { validator: checkNickname }
            ]}
          />

          <ProFormText
            width='md'
            name='post'
            label={intl.formatMessage({
              id: 'pages.account.basic.post',
              defaultMessage: '职位'
            })}
          />

          <ProFormTextArea
            name='signature'
            label={intl.formatMessage({
              id: 'pages.account.basic.signature',
              defaultMessage: '个性签名'
            })}
            placeholder='请填写'
          />

          <ProFormSelect
            name='tags'
            label={intl.formatMessage({
              id: 'pages.account.basic.tags',
              defaultMessage: '标签'
            })}
            rules={[{ validator: checkTags }]}
            placeholder={intl.formatMessage({ id: 'pages.form.inputMsg' })}
            mode='tags'
            options={[]}
          />

          <ProFormSelect
            width='sm'
            name='country'
            label={intl.formatMessage({
              id: 'pages.account.basic.country',
              defaultMessage: '国家/地区'
            })}
            allowClear={false}
            options={[
              {
                label: '中国',
                value: 'China'
              }
            ]}
          />

          <ProFormCascader
            name='area'
            label={intl.formatMessage({
              id: 'pages.account.basic.geographic',
              defaultMessage: '省市区'
            })}
            fieldProps={{
              changeOnSelect: true,
              options: ChinaCityTree
            }}
          />

          <ProFormText
            width='md'
            name='address'
            label={intl.formatMessage({
              id: 'pages.account.basic.address',
              defaultMessage: '街道地址'
            })}
          />
        </ProForm>
      </div>

      <div className={styles.right}>
        <AvatarCrop />
      </div>
    </div>
  )
}

export default BaseView
