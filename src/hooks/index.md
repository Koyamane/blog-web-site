<!--
 * @Author: dingyun
 * @Date: 2021-12-25 13:31:56
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2021-12-25 13:33:48
 * @Description:
-->

# 自定义 Hook

这里列举了一些自定义 Hook 的使用方法

## useFormItemFillHint 表单项必填提示

只支持 form 的国际化字符，只需要传后面一串即可，例如`pages.form.itemTitle`只需要传`itemTitle`

详情看以下实例

```tsx
import React from 'react'
import { useIntl } from 'umi'
import { Form, Input } from 'antd'
import useFormItemFillHint from '@/hooks/FormItemFillHint'

export default (): React.ReactNode => {
  const intl = useIntl()
  // 先初始化
  const formItemFillHint = useFormItemFillHint()

  return (
    <Form>
      <Form.Item
        label={intl.formatMessage({ id: 'pages.form.itemTitle' })}
        name='title'
        rules={[{ required: true, message: formItemFillHint('itemTitle') }]} // 使用时传入字符
      >
        <Input placeholder={intl.formatMessage({ id: 'pages.form.inputMsg' })} />
      </Form.Item>
    </Form>
  )
}
```
