import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styles from '../index.less'

interface SelfProps {
  value?: string
}

const RichTextEditor: React.FC<SelfProps> = props => {
  const { value } = props

  const options = {
    toolbar: false
  }

  return (
    <ReactQuill
      className={styles.richTextReader}
      readOnly
      theme='snow'
      value={value}
      modules={options}
    />
  )
}

export default RichTextEditor
