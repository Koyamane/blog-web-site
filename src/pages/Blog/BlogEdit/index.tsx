/*
 * @Author: dingyun
 * @Date: 2021-12-22 11:12:27
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2022-01-11 11:58:24
 * @Description:
 */
import React, { useEffect, useMemo, useState } from 'react'
import { FormattedMessage, history, useIntl, useLocation } from 'umi'
import { Alert, Button, Form, Input, message, Select, Space, Spin } from 'antd'
import useFormItemFillHint from '@/hooks/FormItemFillHint'
import InputFileItem from '@/components/InputFileItem'
import RichTextEditor from './components/RichTextEditor'
import MarkdownEditor from './components/MarkdownEditor'
import { BlogAddApi, BlogInfoApi, BlogUpdateApi } from './services'
import { AddBlogType, BlogInfoType } from './data'
import styles from './index.less'

// html数据，这个数据不需要及时刷新组件
let htmlValue = ''

export default (): React.ReactNode => {
  const intl = useIntl()
  const [form] = Form.useForm()
  const formItemFillHint = useFormItemFillHint()
  const [mdData, setMdData] = useState('')
  const [btnLoading, setBtnLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)
  const [editor, setEditor] = useState<AddBlogType['editor']>()

  const resetForm = () => form.resetFields()
  const htmlChange = (htmlVal: string) => (htmlValue = htmlVal)

  const { pathname } = useLocation()

  const id = useMemo(() => {
    return pathname.split('/')[3]
  }, [pathname])

  const checkSpace = (_: any, value: string) => {
    if (value && /^\s*$/.test(value)) {
      return Promise.reject(
        <FormattedMessage id='pages.form.space.error' defaultMessage='不能全是空格' />
      )
    }

    return Promise.resolve()
  }

  const checkTags = (_: any, valArr: string[]) => {
    if (Array.isArray(valArr) && valArr.some(item => item.length > 20)) {
      return Promise.reject(
        <FormattedMessage id='pages.form.tag.error' defaultMessage='单个标签长度不能大于20' />
      )
    }

    return Promise.resolve()
  }

  const addBlog = async (params: FormData) => {
    const res = await BlogAddApi(params)
    history.replace(`/blog/post/${res.id}`)
    message.success('发布成功')
  }

  const editBlog = async (params: FormData) => {
    await BlogUpdateApi(params)
    history.replace('/account/center')
    message.success('编辑成功')
  }

  const releaseBlog = () => {
    form.validateFields().then(async (formValues: AddBlogType) => {
      setBtnLoading(true)
      const formData = new FormData()

      const params: AddBlogType = {
        ...formValues,
        mdData: mdData,
        content: formValues.editor === 'RICH_TEXT' ? mdData : htmlValue,
        cover: formValues.cover
      }

      if (id) {
        params.id = id
      }

      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          const element = params[key]
          formData.append(key, element)
        }
      }

      try {
        if (id) {
          await editBlog(formData)
        } else {
          await addBlog(formData)
        }
      } catch (error) {
        setBtnLoading(false)
        console.log('发布博文报错了', error)
      }
    })
  }

  const getBlogInfo = async () => {
    if (!id) {
      setEditor('RICH_TEXT')
      return
    }

    setPageLoading(true)
    try {
      const data: BlogInfoType = await BlogInfoApi(id)
      setMdData(data.mdData)
      setEditor(data.editor)
      form.setFieldsValue({
        ...data,
        tags: data.tags || []
      })
    } catch (error) {
      console.log(error)
    }
    setPageLoading(false)
  }

  useEffect(() => {
    getBlogInfo()
  }, [id])

  return (
    <Spin spinning={pageLoading}>
      <Alert
        banner
        showIcon={false}
        message={intl.formatMessage({
          id: 'pages.blog.blog-edit.topNotice',
          defaultMessage: '在这里发布您的博客。'
        })}
      />

      <Form form={form} className={styles.form} labelAlign='left' encType='multipart/form-data'>
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
            tokenSeparators={[',', '\t', '\n', '\r']}
            placeholder={intl.formatMessage({ id: 'pages.form.inputMsg' })}
          />
        </Form.Item>

        <Form.Item name='cover' label={intl.formatMessage({ id: 'pages.form.cover' })}>
          <InputFileItem fileType='IMAGE' />
        </Form.Item>

        <Form.Item
          name='editor'
          initialValue='RICH_TEXT'
          label={intl.formatMessage({ id: 'pages.form.itemEditor' })}
        >
          <Select onChange={setEditor}>
            <Select.Option value='RICH_TEXT'>Rich text</Select.Option>
            <Select.Option value='MARKDOWN'>Markdown</Select.Option>
          </Select>
        </Form.Item>
      </Form>

      <div className={styles.shadowBox}>
        {/* 不要换成三元运算符，会有bug */}
        {editor === 'RICH_TEXT' && <RichTextEditor value={mdData} onChange={setMdData} />}
        {editor === 'MARKDOWN' && (
          <MarkdownEditor
            locale={intl.locale}
            mdValue={mdData}
            htmlChange={htmlChange}
            mdChange={setMdData}
          />
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
    </Spin>
  )
}
