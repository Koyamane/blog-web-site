/*
 * @Author: dingyun
 * @Date: 2021-12-12 14:08:47
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2022-01-11 11:09:56
 * @Description:
 */

import React, { useEffect, useState } from 'react'
import { NavLink, useIntl } from 'umi'
import moment from 'moment'
import { Avatar, List, Tag } from 'antd'
import IconText from '@/components/IconText'
import { ClockCircleOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons'
import { BlogPageApi } from '../services'

const HomeList: React.FC = () => {
  const intl = useIntl()
  const [listLoading, setBistLoading] = useState(true)
  const [blogData, setBlogData] = useState<{
    list: API.BlogInfo[]
    pagination: { current: number; total: number }
  }>({
    list: [],
    pagination: { current: 1, total: 0 }
  })

  const itemRender = (
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
        <a>{intl.formatMessage({ id: 'pages.searchTable.nextPage', defaultMessage: '下一页' })}</a>
      )
    }
    return originalElement
  }

  const getBlogList = async (current: number = 1) => {
    setBistLoading(true)
    try {
      const res = await BlogPageApi({ current })
      if (res) {
        setBlogData({
          list: res.list,
          pagination: {
            current: res.current,
            total: res.total
          }
        })
      }
    } catch (error) {
      console.log('获取首页博客报错了', error)
    }
    setBistLoading(false)
  }

  useEffect(() => {
    getBlogList()
  }, [])

  return (
    <List
      className='home-list'
      size='large'
      loading={listLoading}
      itemLayout='vertical'
      pagination={{
        ...blogData.pagination,
        itemRender,
        onChange: getBlogList
      }}
      dataSource={blogData.list}
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
            <IconText icon={EyeOutlined} text={item.reads} key='list-vertical-message' />
          ]}
          // extra={item.cover && <div className='home-list-item-cover' style={{ backgroundImage: `url(${item.cover})` }} />}
          extra={
            item.cover && (
              <div className='home-list-item-cover'>
                <img className='home-list-item-cover-img' alt='cover' src={item.cover} />
              </div>
            )
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.createdAvatar} icon={<UserOutlined />} />}
            title={<NavLink to={`/blog/post/${item.id}`}>{item.title}</NavLink>}
            description={item.tags.length > 0 && item.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
          />
          <div className='home-list-item-content'>
            {item.content && item.content.replace(/<[^>]+>/g, '')}
          </div>
        </List.Item>
      )}
    />
  )
}

export default HomeList
