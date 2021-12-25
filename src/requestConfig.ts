/*
 * @Author: dingyun
 * @Date: 2021-12-14 15:22:37
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2021-12-21 21:27:23
 * @Description:
 */
import { notification } from 'antd'
import { RequestConfig } from 'umi'
import { RequestOptionsInit, ResponseError } from 'umi-request'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户登录已过期， 需要重新登录。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

/**
 * 异常处理程序
 */
const errorHandler = async (error: ResponseError) => {
  const { response } = error

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText
    const { status } = response

    notification.error({
      message: `请求错误 ${status}`,
      description: errorText
    })
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常'
    })
  }
  throw error
}

const baseUrl = process.env.NODE_ENV === 'development' ? '' : 'http://127.0.0.1:7001'
const prefix = process.env.NODE_ENV === 'development' ? '/services' : ''

const requestConfig: RequestConfig = {
  prefix,
  timeout: 60000,
  errorHandler,
  requestInterceptors: [
    (url: string, options: RequestInit) => {
      const Authorization = localStorage.getItem('token')
      let headers = { ...options.headers }
      if (Authorization) {
        headers = { ...headers, Authorization: `Bearer ${Authorization}` }
      }

      return {
        url: baseUrl + url,
        options: { ...options, headers }
      }
    }
  ],
  responseInterceptors: [
    async (res: Response, options: RequestOptionsInit) => {
      if (res.status === 200) {
        try {
          const data = await res.clone().json()
          // data，params都是请求的参数
          if (
            (options.data && options.data.allResponse) ||
            (options.params && options.params.allResponse)
          ) {
            return data
          }
          return data.data ? data.data : data
        } catch (err) {
          return res
        }
      }
      return res
    }
  ]
}

export default requestConfig
