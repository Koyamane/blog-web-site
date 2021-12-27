import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { RichTextEditorProps } from '../data'

const RichTextEditor: React.FC<RichTextEditorProps> = props => {
  const { value, onChange } = props

  // toolbar = false 即可关掉工具栏
  const options = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }, { script: 'sub' }, { script: 'super' }],
        ['blockquote', 'code-block', { list: 'ordered' }, { list: 'bullet' }],
        [{ direction: 'rtl' }, { align: [] }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        ['clean']
      ]
    }
  }

  return <ReactQuill theme='snow' value={value} onChange={onChange} modules={options} />
}

export default RichTextEditor
