import globalHeader from './ja-JP/globalHeader'
import menu from './ja-JP/menu'
import settingDrawer from './ja-JP/settingDrawer'
import pwa from './ja-JP/pwa'
import component from './ja-JP/component'
import pages from './ja-JP/pages'
import form from './ja-JP/form'
import account from './ja-JP/account'

export default {
  'navBar.lang': '言語',
  'layout.user.link.help': 'ヘルプ',
  'layout.user.link.privacy': 'プライバシー',
  'layout.user.link.terms': '利用規約',
  'app.copyright.produced': '小山音出品',
  'app.preview.down.block': 'このページをローカルプロジェクトにダウンロードしてください',
  'app.home.link.fetch-blocks': '',
  'app.home.link.block-list': '',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...pwa,
  ...component,
  ...pages,
  ...form,
  ...account
}
