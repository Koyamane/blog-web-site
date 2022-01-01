import React from 'react'
import { message } from 'antd'
import { FormattedMessage, useIntl, useModel } from 'umi'
import ProForm, {
  ProFormCascader,
  ProFormSelect,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-form'
import { UpdateCurrentUser } from '@/services/global'
import ChinaCityTree from '../geographic/china.json'

import styles from './BaseView.less'

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar?: string }) => (
  <>
    <div className={styles.avatar_title}>
      <FormattedMessage id='page.account.basic.avatar' defaultMessage='头像' />
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt='avatar' />
    </div>
    {/* <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          <FormattedMessage id='page.account.basic.change-avatar' defaultMessage='更换头像' />
        </Button>
      </div>
    </Upload> */}
  </>
)

const BaseView: React.FC = () => {
  const intl = useIntl()
  const { initialState, setInitialState } = useModel('@@initialState')
  const currentUser = initialState?.currentUser

  const handleFinish = async (formData: API.UpdateCurrentUser) => {
    try {
      await UpdateCurrentUser({ ...formData })
      message.error(
        intl.formatMessage({
          id: 'page.account.update.success',
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
          id: 'page.account.update.error',
          defaultMessage: '更新失败，请重试！'
        })
      )
    }
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
            // 为了让提交跟重置换个位置
            render: (props, doms) => doms
          }}
        >
          <ProFormText
            width='md'
            name='nickname'
            label={intl.formatMessage({
              id: 'page.account.basic.nickname',
              defaultMessage: '昵称'
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id='page.account.basic.nickname-message'
                    defaultMessage='请输入您的昵称！'
                  />
                )
              }
            ]}
          />

          <ProFormTextArea
            name='signature'
            label={intl.formatMessage({
              id: 'page.account.basic.signature',
              defaultMessage: '个性签名'
            })}
            placeholder='请填写'
          />

          <ProFormSelect
            name='tags'
            label={intl.formatMessage({
              id: 'page.account.basic.tags',
              defaultMessage: '标签'
            })}
            mode='tags'
            options={[]}
          />

          <ProFormSelect
            width='sm'
            name='country'
            label={intl.formatMessage({
              id: 'page.account.basic.country',
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
              id: 'page.account.basic.geographic',
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
              id: 'page.account.basic.address',
              defaultMessage: '街道地址'
            })}
          />
        </ProForm>
      </div>

      <div className={styles.right}>
        <AvatarView avatar={currentUser?.avatar} />
      </div>
    </div>
  )
}

export default BaseView
