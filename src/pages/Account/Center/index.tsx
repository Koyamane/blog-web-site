import React, { useMemo, useState } from 'react'
import { connect, FormattedMessage, useModel } from 'umi'
import { Card, Col, Divider, Row, Tag } from 'antd'
import { HomeOutlined, ContactsOutlined, SmileOutlined } from '@ant-design/icons'
import { GridContent } from '@ant-design/pro-layout'
import IconText from '@/components/IconText'
import Articles from './components/Articles'
import type { AccountCenterState, tabKeyType } from './data'
import styles from './index.less'

const Center: React.FC<AccountCenterState> = ({ articlesNum }) => {
  const [tabKey, setTabKey] = useState<tabKeyType>('articles')
  const { initialState } = useModel('@@initialState')
  const currentUser = initialState?.currentUser

  const operationTabList = useMemo(() => {
    return [
      {
        key: 'articles',
        tab: (
          <>
            <FormattedMessage id='pages.account.menuMap.articles' defaultMessage='文章' />
            <span style={{ fontSize: 14 }}>({articlesNum})</span>
          </>
        )
      }
    ]
  }, [articlesNum])

  //  渲染用户信息
  const renderUserInfo = ({ post, country, area, address }: Partial<API.CurrentUser>) => {
    return (
      <Row className={styles.detail} justify='center' gutter={[0, 10]}>
        <Col span={24}>
          <IconText icon={ContactsOutlined} text={post} />
        </Col>
        <Col span={24}>
          <IconText icon={SmileOutlined} text={country?.label} />
        </Col>
        <Col span={24}>
          <IconText
            icon={HomeOutlined}
            text={
              <span>
                {area && area.join('')}
                {address}
              </span>
            }
          />
        </Col>
      </Row>
    )
  }

  // 渲染tab切换
  const renderChildrenByTabKey = (tabValue: tabKeyType) => {
    if (tabValue === 'articles') {
      return currentUser?.userId && <Articles userId={currentUser?.userId} />
    }
    return null
  }

  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24} sm={24} xs={24}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
            {currentUser && (
              <div>
                <div className={styles.avatarHolder}>
                  <img src={currentUser.avatar} alt='avatar' />
                  <div className={styles.name}>{currentUser.nickname}</div>
                  <div>{currentUser?.signature}</div>
                </div>
                {renderUserInfo(currentUser)}
                <Divider dashed />

                <div className={styles.tags}>
                  <div className={styles.tagsTitle}>
                    <FormattedMessage id='pages.account.basic.tags' defaultMessage='标签' />
                  </div>
                  {currentUser.tags && currentUser.tags.map(item => <Tag key={item}>{item}</Tag>)}
                </div>

                {/* <Divider style={{ marginTop: 16 }} dashed />
                <div className={styles.team}>
                  <div className={styles.teamTitle}>团队</div>
                  <Row gutter={36}>
                    {currentUser.notice &&
                      currentUser.notice.map((item) => (
                        <Col key={item.id} lg={24} xl={12}>
                          <Link to={item.href}>
                            <Avatar size="small" src={item.logo} />
                            {item.member}
                          </Link>
                        </Col>
                      ))}
                  </Row>
                </div> */}
              </div>
            )}
          </Card>
        </Col>
        <Col lg={17} md={24} sm={24} xs={24}>
          <Card
            className={styles.tabsCard}
            bordered={false}
            bodyStyle={{ padding: 0 }}
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={(_tabKey: string) => {
              setTabKey(_tabKey as tabKeyType)
            }}
          >
            {renderChildrenByTabKey(tabKey)}
          </Card>
        </Col>
      </Row>
    </GridContent>
  )
}

export default connect(({ AccountCenter }: { AccountCenter: AccountCenterState }) => ({
  articlesNum: AccountCenter.articlesNum
}))(Center)
