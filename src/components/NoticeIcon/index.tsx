import { useState } from 'react'
import { Tag, message } from 'antd'
import { groupBy } from 'lodash'
import moment from 'moment'
import { useModel } from 'umi'

import NoticeIcon from './NoticeIcon'
import styles from './index.less'

export type GlobalHeaderRightProps = {
  fetchingNotices?: boolean
  onNoticeVisibleChange?: (visible: boolean) => void
  onNoticeClear?: (tabName?: string) => void
}

const getNoticeData = (notices: API.NoticeIconItem[]): Record<string, API.NoticeIconItem[]> => {
  if (!notices || notices.length === 0 || !Array.isArray(notices)) {
    return {}
  }

  const newNotices = notices.map(notice => {
    const newNotice = { ...notice }

    if (newNotice.datetime) {
      newNotice.datetime = moment(notice.datetime as string).fromNow()
    }

    if (newNotice.id) {
      newNotice.key = newNotice.id
    }

    if (newNotice.extra && newNotice.status) {
      const color = {
        todo: '',
        processing: 'blue',
        urgent: 'red',
        doing: 'gold'
      }[newNotice.status]
      newNotice.extra = (
        <Tag
          color={color}
          style={{
            marginRight: 0
          }}
        >
          {newNotice.extra}
        </Tag>
      ) as any
    }

    return newNotice
  })
  return groupBy(newNotices, 'type')
}

const getUnreadData = (noticeData: Record<string, API.NoticeIconItem[]>) => {
  const unreadMsg: Record<string, number> = {}
  Object.keys(noticeData).forEach(key => {
    const value = noticeData[key]

    if (!unreadMsg[key]) {
      unreadMsg[key] = 0
    }

    if (Array.isArray(value)) {
      unreadMsg[key] = value.filter(item => !item.read).length
    }
  })
  return unreadMsg
}

const NoticeIconView: React.FC = () => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  const [notices, setNotices] = useState<API.NoticeIconItem[]>([
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你收到了 14 份新周报',
      datetime: '2017-08-09',
      type: 'notification'
    },
    {
      id: '000000002',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: '你推荐的 曲妮妮 已通过第三轮面试',
      datetime: '2017-08-08',
      type: 'notification'
    },
    {
      id: '000000003',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
      title: '这种模板可以区分多种通知类型',
      datetime: '2017-08-07',
      read: true,
      type: 'notification'
    },
    {
      id: '000000004',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
      title: '左侧图标用于区分不同的类型',
      datetime: '2017-08-07',
      type: 'notification'
    },
    {
      id: '000000005',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '内容不要超过两行字，超出时自动截断',
      datetime: '2017-08-07',
      type: 'notification'
    },
    {
      id: '000000006',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '曲丽丽 评论了你',
      description: '描述信息描述信息描述信息',
      datetime: '2017-08-07',
      type: 'message',
      clickClose: true
    },
    {
      id: '000000007',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '朱偏右 回复了你',
      description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
      datetime: '2017-08-07',
      type: 'message',
      clickClose: true
    },
    {
      id: '000000008',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '标题',
      description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
      datetime: '2017-08-07',
      type: 'message',
      clickClose: true
    },
    {
      id: '000000009',
      title: '任务名称',
      description: '任务需要在 2017-01-12 20:00 前启动',
      extra: '未开始',
      status: 'todo',
      type: 'event'
    },
    {
      id: '000000010',
      title: '第三方紧急代码变更',
      description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
      extra: '马上到期',
      status: 'urgent',
      type: 'event'
    },
    {
      id: '000000011',
      title: '信息安全考试',
      description: '指派竹尔于 2017-01-09 前完成更新并发布',
      extra: '已耗时 8 天',
      status: 'doing',
      type: 'event'
    },
    {
      id: '000000012',
      title: 'ABCD 版本发布',
      description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
      extra: '进行中',
      status: 'processing',
      type: 'event'
    }
  ])

  const noticeData = getNoticeData(notices)
  const unreadMsg = getUnreadData(noticeData || {})

  const changeReadState = (id: string) => {
    setNotices(
      notices.map(item => {
        const notice = { ...item }
        if (notice.id === id) {
          notice.read = true
        }
        return notice
      })
    )
  }

  const clearReadState = (title: string, key: string) => {
    setNotices(
      notices.map(item => {
        const notice = { ...item }
        if (notice.type === key) {
          notice.read = true
        }
        return notice
      })
    )
    message.success(`${'清空了'} ${title}`)
  }

  return (
    <NoticeIcon
      className={styles.action}
      count={currentUser && currentUser.unreadCount}
      onItemClick={item => {
        changeReadState(item.id!)
      }}
      onClear={(title: string, key: string) => clearReadState(title, key)}
      loading={false}
      clearText='清空'
      viewMoreText='查看更多'
      onViewMore={() => message.info('Click on view more')}
      clearClose
    >
      <NoticeIcon.Tab
        tabKey='notification'
        count={unreadMsg.notification}
        list={noticeData.notification}
        title='通知'
        emptyText='你已查看所有通知'
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey='message'
        count={unreadMsg.message}
        list={noticeData.message}
        title='消息'
        emptyText='您已读完所有消息'
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey='event'
        title='待办'
        emptyText='你已完成所有待办'
        count={unreadMsg.event}
        list={noticeData.event}
        showViewMore
      />
    </NoticeIcon>
  )
}

export default NoticeIconView
