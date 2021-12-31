/*
 * @Author: dingyun
 * @Date: 2021-12-10 20:54:11
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2021-12-10 21:34:38
 * @Description:
 */
import React from 'react'
import { useIntl } from 'umi'
import { Typography, Alert } from 'antd'
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons'

export default (): React.ReactNode => {
  const intl = useIntl()
  return (
    <>
      <Alert
        banner
        showIcon
        type='success'
        message={intl.formatMessage({
          id: 'pages.welcome.alertMessage',
          defaultMessage: '更快更强的重型组件，已经发布。'
        })}
      />

      <Typography.Title level={2} style={{ textAlign: 'center' }}>
        <SmileTwoTone /> Ant Design Pro <HeartTwoTone twoToneColor='#eb2f96' /> You
      </Typography.Title>

      <p style={{ textAlign: 'center', marginTop: 24 }}>
        Want to add more pages? Please refer to{' '}
        <a href='https://pro.ant.design/docs/block-cn' target='_blank' rel='noopener noreferrer'>
          use block
        </a>
        。
      </p>
    </>
  )
}
