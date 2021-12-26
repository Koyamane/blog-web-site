import React from 'react'
import classNames from 'classnames'
import { PageContainer, PageContainerProps } from '@ant-design/pro-layout'
import './index.less'

const MainContainer: React.FC<PageContainerProps> = props => {
  const { children, className, ...containerProps } = props

  return (
    <PageContainer
      title={false}
      breadcrumb={{}}
      className={classNames(className, 'main-container')}
      {...containerProps}
    >
      {children}
    </PageContainer>
  )
}

export default MainContainer
