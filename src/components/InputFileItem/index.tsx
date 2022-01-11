import React, { useState } from 'react'
import { Input, Button, Upload, message } from 'antd'
import classNames from 'classnames'
import styles from './index.less'
import { useIntl } from 'umi'

interface InputUploadProps {
  // onChange 是自定义组件必须的
  onChange?: (value: any) => void
  value?: any

  afterText?: string
  placeholder?: string

  className?: string // class 类名
  fileType?: 'IMAGE' | 'EXCEL' // 文件类型
  typeArr?: string[] // 自定义校验类型 例如：['.xls', '.xlsx']
  fileSize?: number // 文件大小 默认 20
  keyName?: string // 文件key值

  formData?: boolean // 是否返回 formData 形式
  base64?: boolean // 是否返回 base64 的值

  [key: string]: any
}

const InputUpload: React.FC<InputUploadProps> = props => {
  const {
    className,
    value,
    onChange,
    base64,
    fileType,
    typeArr,
    formData,
    fileSize,
    children,
    keyName
  } = props

  const intl = useIntl()

  const placeholder = props.placeholder || intl.formatMessage({ id: 'pages.form.clickToUpload' })
  const afterText = props.afterText || intl.formatMessage({ id: 'pages.form.upload' })

  const [fileName, setFileName] = useState()

  // useState 不能在函数中实时变化数值所以不用
  let isCan = true

  function beforeUpload(file: any) {
    isCan = true
    let isType = true
    let isNoThanSize = true
    let curTypeArr: string[] = []
    let fileKeyName = '文件'
    switch (fileType) {
      case 'IMAGE':
        fileKeyName = '图片'
        curTypeArr = ['.jpg', '.jpeg', '.png', '.gif']
        break
      default:
        fileKeyName = '文件'
        curTypeArr = []
        break
    }

    curTypeArr = typeArr || curTypeArr

    if (curTypeArr.length > 0) {
      const str = curTypeArr.reduce((total, current, index, arr) => {
        return `${total}(${current})${index === arr.length - 1 ? '$' : '|'}`
      }, '')

      isType = new RegExp(str).test(file.name)

      if (!isType) {
        message.error(`请上传 ${curTypeArr.join(' ')} 格式的${fileKeyName}!`)
      }
    }

    if (fileSize) {
      isNoThanSize = file.size / 1024 / 1024 < fileSize
      if (!isNoThanSize) {
        message.error(`${fileKeyName}大小不能超过 ${fileSize}M！`)
      }
    }

    isCan = isType && isNoThanSize
    // 不发请求
    return false
  }

  function handleUploadChange({ file }: { file: any }) {
    if (isCan) {
      // 展示文件名称
      setFileName(file.name)

      if (base64) {
        const reader: any = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          onChange && onChange(reader.result.substring(reader.result.indexOf(',') + 1))
        }
      } else if (formData) {
        const fData = new FormData()
        fData.append(keyName!, file)
        // 在这里修改要返回给 form 的数据。目前返回给 form 的是文件的地址
        onChange && onChange(fData)
      } else {
        onChange && onChange(file)
      }
    }
  }

  return (
    <div className={classNames(className, styles.inputFileItem)}>
      <Upload showUploadList={false} beforeUpload={beforeUpload} onChange={handleUploadChange}>
        <Input.Search
          value={fileName || value}
          placeholder={placeholder}
          enterButton={children || <Button>{afterText}</Button>}
        />
      </Upload>
    </div>
  )
}

InputUpload.defaultProps = {
  fileSize: 20,
  keyName: 'file'
}

export default InputUpload
