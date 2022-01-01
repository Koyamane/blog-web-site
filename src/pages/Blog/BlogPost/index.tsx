/*
 * @Author: dingyun
 * @Date: 2021-12-22 11:12:27
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2022-01-01 14:02:12
 * @Description:
 */
import React, { useEffect, useMemo, useState } from 'react'
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
  const [blogInfo, setBlogInfo] = useState<BlogInfoType>({})

  const id = useMemo(() => {
    return pathname.replace(/.*\//g, '')
  }, [pathname])

  const articleDetail = useMemo(() => {
    return blogInfo.mdData || blogInfo.content
  }, [blogInfo])

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
        <IconText icon={UserOutlined} text={blogInfo.createdName} />
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
  )
}
