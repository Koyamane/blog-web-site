/*
 * @Author: dingyun
 * @Date: 2021-12-09 17:13:09
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2021-12-12 14:14:04
 * @Description:
 */
import React, { useEffect } from 'react'
import { Alert } from 'antd'
import { TextLoop } from 'react-text-loop-next'
import { SoundOutlined } from '@ant-design/icons'
import MainContainer from '@/components/MainContainer'
import { testApi } from '@/services/global'
import HomeList from './components/HomeList'
import './index.less'

export default (): React.ReactNode => {
  const init = async () => {
    try {
      await testApi()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <MainContainer>
      <Alert
        banner
        showIcon
        icon={<SoundOutlined />}
        message={
          <TextLoop mask>
            <div>开新荒了，兄弟们</div>
            <div>这个通知有用的嘛</div>
          </TextLoop>
        }
      />

      <HomeList />
    </MainContainer>
  )
}
