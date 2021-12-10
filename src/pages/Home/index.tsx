/*
 * @Author: dingyun
 * @Date: 2021-12-09 17:13:09
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2021-12-10 20:59:18
 * @Description:
 */
import React, { FunctionComponent } from 'react'
import { Alert, Avatar, List, Space, Tag } from 'antd'
import { TextLoop } from 'react-text-loop-next'
import {
  ClockCircleOutlined,
  LikeOutlined,
  MessageOutlined,
  SoundOutlined,
  StarOutlined
} from '@ant-design/icons'
import MainContainer from '@/components/MainContainer'

const listData: any[] = []

for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
  })
}

const IconText = ({ icon, text }: { icon: FunctionComponent<any>; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

export default (): React.ReactNode => {
  return (
    <MainContainer>
      <Alert
        banner
        showIcon
        icon={<SoundOutlined />}
        message={
          <TextLoop mask>
            <div>开新荒了，兄弟们</div>
            <div>这个通知有用的嘛</div>
          </TextLoop>
        }
      />

      <List
        itemLayout='vertical'
        size='large'
        pagination={{
          pageSize: 10
        }}
        dataSource={listData}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <IconText icon={StarOutlined} text='156' key='list-vertical-star-o' />,
              <IconText icon={LikeOutlined} text='156' key='list-vertical-like-o' />,
              <IconText icon={MessageOutlined} text='2' key='list-vertical-message' />,
              <IconText
                icon={ClockCircleOutlined}
                text='2022-12-12 18:01'
                key='list-vertical-date'
              />
            ]}
            extra={
              <img
                width={272}
                alt='logo'
                src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={
                <>
                  <Tag>语雀专栏</Tag>
                  <Tag>设计语言</Tag>
                  <Tag>蚂蚁金服</Tag>
                </>
              }
            />
            {item.content}
          </List.Item>
        )}
      />
    </MainContainer>
  )
}
