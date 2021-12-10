/*
 * @Author: dingyun
 * @Date: 2021-12-10 13:50:48
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2021-12-10 20:51:30
 * @Description:
 */
import React from 'react'
import ReactCanvasNest from 'react-canvas-nest'

export interface SiteBackgroundProps {
  style?: React.CSSProperties
  className?: string

  count?: number
  pointR?: number
  pointColor?: string
  pointOpacity?: number
  dist?: number
  lineColor?: string
  lineWidth?: number
  follow?: boolean
  mouseDist?: number
}

const SiteBackground: React.FC<SiteBackgroundProps> = props => {
  const { className, style, ...otherProps } = props

  const styles: React.CSSProperties = {
    zIndex: 999,
    position: 'fixed',
    pointerEvents: 'none',
    ...style
  }

  return <ReactCanvasNest className={className} style={styles} {...otherProps} />
}

export default SiteBackground
