import React, { useCallback, useEffect, useState } from 'react'
import { connect, Dispatch, NavLink, useIntl } from 'umi'
import { List, Tag } from 'antd'
import moment from 'moment'
import { LikeOutlined, StarOutlined, EyeOutlined, ClockCircleOutlined } from '@ant-design/icons'
import IconText from '@/components/IconText'
import { SomebodyBlogPage } from '../../service'
import styles from './index.less'

interface SelfProps {
  dispatch: Dispatch
  userId?: API.CurrentUser['userId']
}

const Articles: React.FC<SelfProps> = ({ userId, dispatch }) => {
  const intl = useIntl()
  const [listLoading, setBistLoading] = useState(true)
  const [blogData, setBlogData] = useState<{
    list: API.BlogInfo[]
    pagination: { current: number; total: number }
  }>({
    list: [],
    pagination: { current: 1, total: 0 }
  })

  const itemRender = useCallback(
    (
      current: number,
      type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
      originalElement: React.ReactNode
    ) => {
      if (type === 'prev') {
        return (
          <a>
            {intl.formatMessage({ id: 'pages.searchTable.previousPage', defaultMessage: '上一页' })}
          </a>
        )
      }
      if (type === 'next') {
        return (
          <a>
            {intl.formatMessage({ id: 'pages.searchTable.nextPage', defaultMessage: '下一页' })}
          </a>
        )
      }
      return originalElement
    },
    []
  )

  const getBlogList = async (current: number = 1) => {
    setBistLoading(true)
    try {
      const res = await SomebodyBlogPage(userId, { current })
      if (res) {
        setBlogData({
          list: res.list,
          pagination: {
            current: res.current,
            total: res.total
          }
        })
        dispatch({
          type: 'AccountCenter/setArticlesNum',
          articlesNum: res.total
        })
      }
    } catch (error) {
      console.log('获取博客报错了', error)
    }
    setBistLoading(false)
  }

  useEffect(() => {
    // 每次id不一样，都要发请求
    getBlogList()
  }, [userId])

  return (
    <List
      className={styles.blogList}
      size='large'
      loading={listLoading}
      itemLayout='vertical'
      pagination={{
        ...blogData.pagination,
        itemRender,
        onChange: getBlogList
      }}
      dataSource={blogData?.list}
      renderItem={item => (
        <List.Item
          key={item.id}
          actions={[
            <IconText icon={StarOutlined} text={item.collections} key='list-vertical-star-o' />,
            <IconText icon={LikeOutlined} text={item.likes} key='list-vertical-like-o' />,
            <IconText icon={EyeOutlined} text={item.reads} key='list-vertical-message' />,
            <IconText
              icon={ClockCircleOutlined}
              text={moment(item.createdDate).format('YYYY-MM-DD HH:mm:ss')}
              key='list-vertical-date'
            />
          ]}
          extra={item.previewImg && <img width={272} alt='logo' src={item.previewImg} />}
        >
          <List.Item.Meta
            title={<NavLink to={`/blog/post/${item.id}`}>{item.title}</NavLink>}
            description={item.tags.length > 0 && item.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
          />
          <div className='blog-list-item-content'>
            {item.content && item.content.replace(/<[^>]+>/g, '')}
          </div>
        </List.Item>
      )}
    />
  )
}

export default connect()(Articles)
