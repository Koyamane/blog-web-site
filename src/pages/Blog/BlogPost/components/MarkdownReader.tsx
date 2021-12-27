import React from 'react'
import Editor from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'

interface SelfProps {
  mdValue?: string
}

const MarkdownEditor: React.FC<SelfProps> = props => {
  const { mdValue } = props

  return <Editor previewOnly modelValue={mdValue} />
}

export default MarkdownEditor
