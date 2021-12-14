/*
 * @Author: dingyun
 * @Date: 2021-12-14 11:20:25
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2021-12-14 11:30:27
 * @Description:
 */

import { request } from 'umi'

export const testApi = () => {
  return request('/news')
}
