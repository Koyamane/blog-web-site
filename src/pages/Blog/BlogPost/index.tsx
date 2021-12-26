/*
 * @Author: dingyun
 * @Date: 2021-12-22 11:12:27
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2021-12-26 23:45:48
 * @Description:
 */
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'umi'
import { Divider, message, Space, Tag } from 'antd'
import moment from 'moment'
import {
  ClockCircleOutlined,
  EyeOutlined,
  LikeOutlined,
  StarOutlined,
  UserOutlined
} from '@ant-design/icons'
import MainContainer from '@/components/MainContainer'
import { BlogInfoApi } from './services'
import { BlogInfoType } from '../BlogEdit/data'
import styles from './index.less'

const IconText = ({ icon, text }: { icon: FunctionComponent<any>; text: string | number }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

export default (): React.ReactNode => {
  const { pathname } = useLocation()
  const [blogInfo, setBlogInfo] = useState<BlogInfoType>({})

  const id = useMemo(() => {
    return pathname.replace(/.*\//g, '')
  }, [pathname])

  const getBlogInfo = async () => {
    if (!id) {
      message.error('缺少id')
      return
    }

    try {
      const res = await BlogInfoApi(id)
      res && setBlogInfo(res)
    } catch (error) {
      console.log('获取博文报错了', error)
    }
  }

  useEffect(() => {
    getBlogInfo()
  }, [])

  return (
    <MainContainer>
      <div className={styles.articleDetail}>
        <div className={styles.articleDetailTitle}>{blogInfo.title}</div>
        <div className={styles.articleDetailTags}>
          {blogInfo.tags &&
            blogInfo.tags.length > 0 &&
            blogInfo.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </div>
        <Space className={styles.articleDetailInfo}>
          <IconText
            icon={ClockCircleOutlined}
            text={moment(blogInfo.createdDate).format('YYYY-MM-DD HH:mm:ss')}
          />
          <Divider type='vertical' />
          <IconText icon={UserOutlined} text={blogInfo.createdName} />
          <Divider type='vertical' />
          <IconText icon={StarOutlined} text={blogInfo.collections} />
          <Divider type='vertical' />
          <IconText icon={LikeOutlined} text={blogInfo.likes} />
          <Divider type='vertical' />
          <IconText icon={EyeOutlined} text={blogInfo.reads} />
        </Space>

        {/* 这里要区分是不是markdown的，markdown用另一种显示 */}
        {blogInfo.content && (
          <>
            <Divider className={styles.splitLine} />
            <div
              className={styles.articleDetailContent}
              dangerouslySetInnerHTML={{ __html: blogInfo.content }}
            />
          </>
        )}
      </div>
    </MainContainer>
  )
}
