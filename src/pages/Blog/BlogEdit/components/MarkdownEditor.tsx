import React, { useCallback } from 'react'
import Editor from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'
import sanitizeHtml from 'sanitize-html'
import { MarkdownEditorProps } from '../data'

// 多语言
const languageUserDefined = {
  'ja-JP': {
    toolbarTips: {
      bold: '太字',
      underline: '下線',
      italic: '斜体',
      strikeThrough: '取り消し線',
      title: 'タイトル',
      sub: '上付き',
      sup: '下付き',
      quote: '引用',
      unorderedList: '順序なしリスト',
      orderedList: '順序付きリスト',
      codeRow: 'インラインコード',
      code: 'コードブロック',
      link: 'ハイパーリンク',
      image: '画像',
      table: '表',
      revoke: '元に戻す',
      next: 'やり直し',
      save: '保存',
      prettier: 'prettier',
      pageFullscreen: 'ページフルスクリーン',
      fullscreen: 'フルスクリーン',
      catalog: 'カタログ',
      preview: 'プレビュー',
      htmlPreview: 'HTML プレビュー',
      github: 'ソースコード'
    },
    titleItem: {
      h1: '見出し1',
      h2: '見出し2',
      h3: '見出し3',
      h4: '見出し4',
      h5: '見出し5',
      h6: '見出し6'
    },
    imgTitleItem: {
      link: '画像リンク',
      upload: '画像をアップロード',
      clip2upload: '切り取ってアップロード'
    },
    linkModalTips: {
      title: '追加',
      descLable: '説明：',
      descLablePlaceHolder: '説明を入力してください...',
      urlLable: 'リンク',
      UrlLablePlaceHolder: 'リンクを入力してください...',
      buttonOK: 'OK'
    },
    clipModalTips: {
      title: '画像を切り取ってアップロード',
      buttonUpload: 'アップロード'
    },
    copyCode: {
      text: 'コピー',
      tips: 'コピー済み'
    },
    mermaid: {
      // 流程图
      flow: 'フロー',
      // 时序图
      sequence: 'シーケンス',
      // 甘特图
      gantt: 'ガント',
      // 类图
      class: 'クラス',
      // 状态图
      state: '状態',
      // 饼图
      pie: '円グラフ',
      // 关系图
      relationship: 'ダイヤグラム',
      // 旅程图
      journey: 'ジャーニー'
    }
  }
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = props => {
  const { mdValue, htmlChange, locale, mdChange } = props

  const filterXss = useCallback((xssHtml: string) => {
    const htmlValue = sanitizeHtml(xssHtml)
    htmlChange(htmlValue)
    return htmlValue
  }, [])

  return (
    <Editor
      modelValue={mdValue}
      onChange={mdChange}
      language={locale}
      sanitize={filterXss}
      languageUserDefined={languageUserDefined}
      toolbarsExclude={['github', 'save', 'image']}
    />
  )
}

export default MarkdownEditor
