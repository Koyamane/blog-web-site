/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {}
  return {
    // canAdmin: currentUser && currentUser.access === 'admin', // 这里是undefined，表达式时只能接收 true 跟 false，函数可随意
    canAdmin: () => currentUser && currentUser.access === 'admin'
  }
}
