import { ConfigProvider } from 'antd'
import { IRouteComponentProps } from 'umi'
import { PageContainer } from '@ant-design/pro-layout'
import './index.less'

export default (props: IRouteComponentProps) => {
  const {
    children,
    location: { pathname }
  } = props

  if (/^\/user\//.test(pathname)) {
    return children
  }

  return (
    <ConfigProvider>
      <PageContainer title={false} breadcrumb={{}} className='layout-container'>
        {children}
      </PageContainer>
    </ConfigProvider>
  )
}
