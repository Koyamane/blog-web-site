/*
 * @Author: dingyun
 * @Date: 2022-01-01 13:46:26
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2022-01-01 13:53:21
 * @Description:
 */

import React, { FunctionComponent } from 'react'
import { Space } from 'antd'

export interface IconTextInterface {
  style?: React.CSSProperties
  className?: string
  icon?: FunctionComponent<any>
  text?: React.ReactNode
}

const IconText = ({ icon, text, style, className }: IconTextInterface) => (
  <Space className={className} style={style}>
    {icon && React.createElement(icon)}
    {text}
  </Space>
)

export default IconText
