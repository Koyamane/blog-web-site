/*
 * @Author: dingyun
 * @Date: 2022-01-03 13:24:02
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2022-01-04 16:47:04
 * @Description:
 */
import React, { useMemo, useState } from 'react'
import { Button, message, Upload } from 'antd'
import { useIntl, useModel } from 'umi'
import ImgCrop from 'antd-img-crop'
import 'antd/es/slider/style'
import 'antd/es/modal/style'
import { UploadOutlined } from '@ant-design/icons'
import styles from './BaseView.less'
import { UpdateAvatarApi } from '../service'

const AvatarCrop: React.FC = () => {
  const intl = useIntl()
  const [btnLoading, setBtnLoading] = useState(false)
  const { initialState, setInitialState } = useModel('@@initialState')
  const avatarStr = useMemo(() => {
    return initialState?.currentUser?.avatar
  }, [initialState?.currentUser?.avatar])

  const handleOk = (file: File) => {
    setBtnLoading(true)
    // 这里改成异步，让对话框先关闭
    setTimeout(async () => {
      try {
        const formData = new FormData()
        formData.append('file', file)
        const avatarPath = await UpdateAvatarApi(formData)
        message.success(
          intl.formatMessage({
            id: 'pages.account.basic.avatar.success',
            defaultMessage: '更换头像成功！'
          })
        )

        setInitialState(s => ({
          ...s,
          currentUser: {
            ...s?.currentUser,
            avatar: avatarPath
          }
        }))
      } catch (error) {
        message.error(
          intl.formatMessage({
            id: 'pages.account.basic.avatar.error',
            defaultMessage: '更换失败，请重试！'
          })
        )
      }
      setBtnLoading(false)
    })

    return true
  }

  // 这个 ImgCrop 外面不能直接套div，否则样式就没了
  return (
    <>
      <div className={styles.avatar_title}>
        {intl.formatMessage({
          id: 'pages.account.basic.avatar',
          defaultMessage: '头像'
        })}
      </div>
      <div className={styles.avatar}>
        <img src={avatarStr} alt='avatar' />

        <ImgCrop
          rotate
          shape='round'
          onModalOk={handleOk}
          modalTitle={intl.formatMessage({
            id: 'pages.form.editImage',
            defaultMessage: '编辑图片'
          })}
        >
          <Upload disabled={btnLoading} showUploadList={false}>
            <Button loading={btnLoading} icon={<UploadOutlined />}>
              {intl.formatMessage({
                id: 'pages.account.basic.change-avatar',
                defaultMessage: '更换头像'
              })}
            </Button>
          </Upload>
        </ImgCrop>
      </div>
    </>
  )
}

export default AvatarCrop
