import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const Login: FC = () => {
  const nav = useNavigate()
  return (
    <div>
      <p>Login</p>
      <div>
        <Button onClick={() => nav(-1)}>返回</Button>
      </div>
    </div>
  )
}

export default Login
