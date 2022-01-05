/*
 * @Author: dingyun
 * @Date: 2021-12-22 11:12:27
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2022-01-01 14:02:12
 * @Description:
 */
import React, { useMemo } from 'react'
import { Link, useLocation, useRequest } from 'umi'
import { Divider, Space, Spin, Tag } from 'antd'
import moment from 'moment'
import {
  ClockCircleOutlined,
  EyeOutlined,
  LikeOutlined,
  StarOutlined,
  UserOutlined
} from '@ant-design/icons'
import IconText from '@/components/IconText'
import MarkdownReader from './components/MarkdownReader'
import RichTextReader from './components/RichTextReader'
import { BlogInfoApi } from './services'
import { BlogInfoType } from '../BlogEdit/data'
import styles from './index.less'

const Reader = ({ editor, value }: { editor: BlogInfoType['editor']; value: string }) =>
  editor === 'MARKDOWN' ? <MarkdownReader mdValue={value} /> : <RichTextReader value={value} />

export default (): React.ReactNode => {
  const { pathname } = useLocation()

  const id = useMemo(() => {
    return pathname.replace(/.*\//g, '')
  }, [pathname])

  const { data: blogInfo, loading } = useRequest<BlogInfoType>(() => {
    return BlogInfoApi(id)
  })

  const articleDetail = useMemo(() => {
    return blogInfo && (blogInfo.mdData || blogInfo.content)
  }, [blogInfo])

  return (
    <Spin className={styles.spin} spinning={loading}>
      {blogInfo && (
        <div className={styles.articleDetail}>
          <div className={styles.articleDetailTitle}>{blogInfo.title}</div>
          {blogInfo.tags && blogInfo.tags.length > 0 && (
            <div className={styles.articleDetailTags}>
              {blogInfo.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
          <Space className={styles.articleDetailInfo}>
            <IconText
              icon={ClockCircleOutlined}
              text={moment(blogInfo.createdDate).format('YYYY-MM-DD HH:mm:ss')}
            />
            <Divider type='vertical' />
            <IconText
              icon={UserOutlined}
              text={
                <Link to={`/account/center/${blogInfo.createdId}`}>{blogInfo.createdName}</Link>
              }
            />
            <Divider type='vertical' />
            <IconText icon={StarOutlined} text={blogInfo.collections} />
            <Divider type='vertical' />
            <IconText icon={LikeOutlined} text={blogInfo.likes} />
            <Divider type='vertical' />
            <IconText icon={EyeOutlined} text={blogInfo.reads} />
          </Space>

          {articleDetail && (
            <>
              <Divider className={styles.splitLine} />
              <Reader editor={blogInfo.editor} value={articleDetail} />
            </>
          )}
        </div>
      )}
    </Spin>
  )
}
