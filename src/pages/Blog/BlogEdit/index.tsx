/*
 * @Author: dingyun
 * @Date: 2021-12-22 11:12:27
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2021-12-27 15:27:49
 * @Description:
 */
import React, { useState } from 'react'
import { FormattedMessage, history, useIntl } from 'umi'
import { Alert, Button, Form, Input, message, Select, Space } from 'antd'
import useFormItemFillHint from '@/hooks/FormItemFillHint'
import RichTextEditor from './components/RichTextEditor'
import MarkdownEditor from './components/MarkdownEditor'
import { BlogAddApi } from './services'
import { AddBlogType } from './data'
import styles from './index.less'

// html数据，这个数据不需要及时刷新组件
let htmlValue = ''

export default (): React.ReactNode => {
  // 这个是markdown格式的
  const [articleValue, setArticleValue] = useState('')
  const [btnLoading, setBtnLoading] = useState(false)
  const [editor, setEditor] = useState<AddBlogType['editor']>('RICH_TEXT')
  const intl = useIntl()
  const [form] = Form.useForm()
  const formItemFillHint = useFormItemFillHint()

  const resetForm = () => form.resetFields()

  const htmlChange = (htmlVal: string) => (htmlValue = htmlVal)

  const editorChange = (editorValue: AddBlogType['editor']) => setEditor(editorValue)

  const checkSpace = (_: any, value: string) => {
    if (value && /^\s*$/.test(value)) {
      return Promise.reject(
        <FormattedMessage id='pages.form.space.error' defaultMessage='不能全是空格' />
      )
    }

    return Promise.resolve()
  }

  const checkTags = (_: any, valArr: string[]) => {
    if (valArr.some(item => item.length > 20)) {
      return Promise.reject(
        <FormattedMessage id='pages.form.tag.error' defaultMessage='单个标签长度不能大于20' />
      )
    }

    return Promise.resolve()
  }

  const releaseBlog = () => {
    form.validateFields().then(async (formValues: AddBlogType) => {
      setBtnLoading(true)
      const params: AddBlogType = {
        ...formValues,
        mdData: articleValue,
        content: formValues.editor === 'RICH_TEXT' ? articleValue : htmlValue
      }

      try {
        await BlogAddApi(params)
        message.success('发布成功')
        // 这里要跳转到博文详情页面，目前还没写，先跳到首页吧
        history.replace('/')
      } catch (error) {
        setBtnLoading(false)
        console.log('发布博文报错了', error)
      }
    })
  }

  return (
    <>
      <Alert
        banner
        showIcon={false}
        message={intl.formatMessage({
          id: 'pages.blog.blog-edit.topNotice',
          defaultMessage: '在这里发布您的博客。'
        })}
      />

      <Form form={form} className={styles.form} labelAlign='left'>
        <Form.Item
          name='title'
          label={intl.formatMessage({ id: 'pages.form.itemTitle' })}
          rules={[
            { required: true, message: formItemFillHint('form.itemTitle') },
            { validator: checkSpace }
          ]}
        >
          <Input placeholder={intl.formatMessage({ id: 'pages.form.inputMsg' })} />
        </Form.Item>

        <Form.Item
          name='tags'
          label={intl.formatMessage({ id: 'pages.form.itemTag' })}
          rules={[{ validator: checkTags }]}
        >
          <Select
            mode='tags'
            allowClear
            notFoundContent=''
            tokenSeparators={[',', ' ', '\t', '\n', '\r']}
            placeholder={intl.formatMessage({ id: 'pages.form.inputMsg' })}
          />
        </Form.Item>

        <Form.Item
          name='editor'
          initialValue='RICH_TEXT'
          label={intl.formatMessage({ id: 'pages.form.itemEditor' })}
        >
          <Select onChange={editorChange}>
            <Select.Option value='RICH_TEXT'>Rich text</Select.Option>
            <Select.Option value='MARKDOWN'>Markdown</Select.Option>
          </Select>
        </Form.Item>
      </Form>

      <div className={styles.shadowBox}>
        {editor === 'MARKDOWN' ? (
          <MarkdownEditor
            locale={intl.locale}
            mdValue={articleValue}
            htmlChange={htmlChange}
            mdChange={setArticleValue}
          />
        ) : (
          <RichTextEditor value={articleValue} onChange={setArticleValue} />
        )}
      </div>

      <Space size='middle' className={styles.footerBar}>
        <Button loading={btnLoading} onClick={resetForm}>
          {intl.formatMessage({
            id: 'pages.form.reset',
            defaultMessage: '重置'
          })}
        </Button>
        <Button type='primary' loading={btnLoading} onClick={releaseBlog}>
          {intl.formatMessage({
            id: 'pages.form.blog',
            defaultMessage: '发布'
          })}
        </Button>
      </Space>
    </>
  )
}
