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
import { Card, Typography, Alert } from 'antd'
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons'
import MainContainer from '@/components/MainContainer'

export default (): React.ReactNode => {
  const intl = useIntl()
  return (
    <MainContainer>
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage: 'Faster and stronger heavy-duty components have been released.'
          })}
          type='success'
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 48
          }}
        />
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          <SmileTwoTone /> Ant Design Pro <HeartTwoTone twoToneColor='#eb2f96' /> You
        </Typography.Title>
      </Card>
      <p style={{ textAlign: 'center', marginTop: 24 }}>
        Want to add more pages? Please refer to{' '}
        <a href='https://pro.ant.design/docs/block-cn' target='_blank' rel='noopener noreferrer'>
          use block
        </a>
        。
      </p>
    </MainContainer>
  )
}
