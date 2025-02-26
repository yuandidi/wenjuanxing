import { useEffect } from 'react'
import useGetUserInfo from './useGetUserInfo'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  isLoginOrRegister,
  isNoNeedUserInfo,
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
} from '@/router'

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo()
  const nav = useNavigate()
  const { pathname } = useLocation()
  useEffect(() => {
    if (waitingUserData) {
      return
    }
    //已经登陆了
    if (username) {
      //当前界面是否是登陆，注册界面，是就跳转主页
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME)
      }
      return
    } else {
      //未登录
      //当前界面是否需要登录信息，不需要就继续访问
      if (isNoNeedUserInfo(pathname)) {
        return
      } else {
        //需要就跳转到登陆页
        nav(LOGIN_PATHNAME)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitingUserData, username, pathname])
}

export default useNavPage
