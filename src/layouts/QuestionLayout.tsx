import useLoadUserData from '@/hooks/useLoadUserData'
import useNavPage from '@/hooks/useNavPage'
import { Spin } from 'antd'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)
  return (
    <>
      <p>Question layout</p>
      <div>
        {waitingUserData ? (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  )
}

export default QuestionLayout
