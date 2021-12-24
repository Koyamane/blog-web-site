/*
 * @Author: dingyun
 * @Date: 2021-12-10 20:54:10
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2021-12-23 13:47:47
 * @Description:
 */

// 使用hide或不写name，都会导致菜单在页面上不显示

export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login'
          }
        ]
      },
      {
        component: './404'
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    // icon: 'home',
    component: './Home'
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Home'
      },
      {
        component: './404'
      }
    ]
  },
  {
    path: '/newBlog',
    name: 'newBlog',
    icon: 'plus',
    component: './Blog/NewBlog'
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    component: './404'
  }
]
