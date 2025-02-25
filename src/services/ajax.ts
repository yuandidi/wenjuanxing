import axios from 'axios'
import { message } from 'antd'
import { getToken } from '@/utils/user-token'

const instance = axios.create({
  timeout: 10 * 1000,
})

//request拦截 每次请求都带上 token
instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken()}` //JWT固定格式
    return config
  },
  error => Promise.reject(error)
)

//response 拦截
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResDataType
  const { errno, data, msg } = resData

  if (errno !== 0) {
    // 错误提示
    if (msg) {
      message.error(msg)
    }

    throw new Error(msg)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data as any
})

export default instance

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
