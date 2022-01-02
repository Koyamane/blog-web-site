/*
 * @Author: dingyun
 * @Date: 2021-12-25 23:14:57
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2022-01-01 12:53:53
 * @Description:
 */
// 使用hide或不写name，都会导致菜单在页面上不显示

// path: '/welcome',
// component: 'IndexPage',
// name: '欢迎', // 兼容此写法
// icon: 'testicon',
// // 更多功能查看
// // https://beta-pro.ant.design/docs/advanced-menu
// // ---
// // 新页面打开
// target: '_blank',
// // 不展示顶栏
// headerRender: false,
// // 不展示页脚
// footerRender: false,
// // 不展示菜单
// menuRender: false,
// // 不展示菜单顶栏
// menuHeaderRender: false,
// // 权限配置，需要与 plugin-access 插件配合使用
// access: 'canRead',
// // 隐藏子菜单
// hideChildrenInMenu: true,
// // 隐藏自己和子菜单
// hideInMenu: true,
// // 在面包屑中隐藏
// hideInBreadcrumb: true,
// // 子项往上提，仍旧展示,
// flatMenu: true,

export default [
  {
    path: '/',
    component: '../layout',
    routes: [
      {
        path: '/user',
        layout: false,
        component: './User',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/Login'
          },
          {
            name: 'register',
            path: '/user/register',
            component: './User/Register'
          },
          {
            name: 'register-result',
            path: '/user/register/result',
            component: './User/RegisterResult'
          },
          {
            component: './Exception/404'
          }
        ]
      },
      {
        path: '/home',
        name: 'home',
        icon: 'home',
        component: './Home'
      },
      {
        path: '/admin',
        name: 'admin',
        icon: 'crown',
        access: 'canAdmin',
        routes: [
          {
            path: '/admin/sub-page',
            name: 'sub-page',
            icon: 'smile',
            component: './Admin'
          },
          {
            component: './Exception/404'
          }
        ]
      },
      {
        path: '/blog',
        name: 'blog',
        icon: 'read',
        routes: [
          {
            path: '/blog/edit',
            name: 'edit',
            wrappers: ['@/wrappers/auth'],
            component: './Blog/BlogEdit'
          },
          {
            path: '/blog/post/:id',
            hideInMenu: true,
            name: 'post',
            component: './Blog/BlogPost'
          },
          {
            component: './Exception/404'
          }
        ]
      },
      {
        path: '/account',
        name: 'account',
        hideInMenu: true,
        routes: [
          {
            path: '/account/center',
            name: 'center',
            wrappers: ['@/wrappers/auth'],
            component: './Account/Center'
          },
          {
            path: '/account/settings',
            name: 'settings',
            wrappers: ['@/wrappers/auth'],
            component: './Account/Settings'
          },
          {
            component: './Exception/404'
          }
        ]
      },
      {
        path: '/',
        redirect: '/home'
      },
      {
        component: './Exception/404'
      }
    ]
  }
]
