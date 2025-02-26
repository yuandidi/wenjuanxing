import { FC } from 'react'
import { Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { LOGIN_PATHNAME } from '@/router'
import { UserOutlined } from '@ant-design/icons'
import { getUserInfoService } from '@/services/user'
import { removeToken } from '@/utils/user-token'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '@/store/userReducer'

const UserInfo: FC = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()

  const { data } = useRequest(getUserInfoService)
  const { username, nickname } = data || {}

  function logout() {
    dispatch(logoutReducer()) //清空redux的 user数据
    removeToken() //清除token的存储
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )

  const Login = (
    <>
      <Link to={LOGIN_PATHNAME}>登录</Link>
    </>
  )

  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
