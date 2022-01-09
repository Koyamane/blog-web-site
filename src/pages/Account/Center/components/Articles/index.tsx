import React, { useCallback, useEffect, useState } from 'react'
import { connect, Dispatch, Link, NavLink, useIntl } from 'umi'
import { List, message, Modal, Tag } from 'antd'
import moment from 'moment'
import {
  EyeOutlined,
  ClockCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import IconText from '@/components/IconText'
import { DeleteBlogApi, SomebodyBlogPage } from '../../service'
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

  const getBlogList = async (current: number = blogData.pagination.current) => {
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

  const deleteBlog = async (id: API.BlogInfo['id']) => {
    setBistLoading(true)
    try {
      await DeleteBlogApi(id)
      message.success(
        intl.formatMessage({
          id: 'pages.form.delete.success',
          defaultMessage: '删除成功！'
        })
      )
      getBlogList()
    } catch (error) {
      message.success(
        intl.formatMessage({
          id: 'pages.form.delete.error',
          defaultMessage: '删除失败，请重试！'
        })
      )
    }
    setBistLoading(false)
  }

  const handleDeleteBlog = async (title: API.BlogInfo['title'], id: API.BlogInfo['id']) => {
    Modal.confirm({
      title: intl.formatMessage({
        id: 'pages.form.delete.title',
        defaultMessage: '确定要删除吗？'
      }),
      icon: <ExclamationCircleOutlined />,
      content: title,
      okType: 'danger',
      onOk() {
        deleteBlog(id)
      }
    })
  }

  useEffect(() => {
    // 每次id不一样，都要发请求
    getBlogList()
  }, [userId])

  return (
    <List
      size='large'
      loading={listLoading}
      itemLayout='vertical'
      pagination={{
        ...blogData.pagination,
        itemRender,
        onChange: getBlogList
      }}
      className={styles.blogList}
      dataSource={blogData?.list}
      renderItem={item => (
        <List.Item
          key={item.id}
          actions={[
            <IconText
              icon={ClockCircleOutlined}
              text={moment(item.createdDate).format('YYYY-MM-DD HH:mm:ss')}
              key='list-vertical-date'
            />,
            // <IconText icon={StarOutlined} text={item.collections} key='list-vertical-star-o' />,
            // <IconText icon={LikeOutlined} text={item.likes} key='list-vertical-like-o' />,
            <IconText icon={EyeOutlined} text={item.reads} key='list-vertical-message' />,
            <IconText
              key='list-vertical-edit'
              icon={EditOutlined}
              text={
                <Link to={`/blog/edit/${item.id}`}>
                  {intl.formatMessage({ id: 'pages.form.edit', defaultMessage: '编辑' })}
                </Link>
              }
            />,
            <IconText
              key='list-vertical-delete'
              icon={DeleteOutlined}
              text={
                <a onClick={() => handleDeleteBlog(item.title, item.id)}>
                  {intl.formatMessage({ id: 'pages.form.delete', defaultMessage: '删除' })}
                </a>
              }
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
