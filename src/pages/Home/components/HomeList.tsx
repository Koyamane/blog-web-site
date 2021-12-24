/*
 * @Author: dingyun
 * @Date: 2021-12-12 14:08:47
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2021-12-24 23:41:59
 * @Description:
 */

import React, { FunctionComponent, useEffect, useState } from 'react'
import { Avatar, List, Space, Tag } from 'antd'
import moment from 'moment'
import {
  ClockCircleOutlined,
  EyeOutlined,
  LikeOutlined,
  StarOutlined,
  UserOutlined
} from '@ant-design/icons'
import { BlogPageApi } from '../services'

const IconText = ({ icon, text }: { icon: FunctionComponent<any>; text: string | number }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

interface BlogInfo {
  id: number | string
  createdName: string
  createdId: string
  createdAvatar: string
  createdDate: string
  title: string
  content: string
  previewImg: string
  tags: string[]
  reads: number
  likes: number
  collections: number
}

const HomeList: React.FC = () => {
  const [blogList, setBlogList] = useState<BlogInfo[]>([])

  const getBlogList = async () => {
    try {
      const res = await BlogPageApi()
      res && res.list && setBlogList(res.list)
    } catch (error) {
      setBlogList([])
      console.log('获取首页博客报错了', error)
    }
  }

  useEffect(() => {
    getBlogList()
  }, [])

  return (
    <List
      className='home-list'
      size='large'
      itemLayout='vertical'
      pagination={{
        pageSize: 10
      }}
      dataSource={blogList}
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
            avatar={<Avatar src={item.createdAvatar} icon={<UserOutlined />} />}
            title={<a>{item.title}</a>}
            description={item.tags.length > 0 && item.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
          />
          {item.content}
        </List.Item>
      )}
    />
  )
}

export default HomeList
