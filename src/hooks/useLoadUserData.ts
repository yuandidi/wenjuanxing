import { useEffect, useState } from 'react'
import useGetUserInfo from './useGetUserInfo'
import { getUserInfoService } from '@/services/user'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { loginReducer } from '@/store/userReducer'

function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true)
  const dispatch = useDispatch()

  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      //存储到redux store中
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })

  //判断redux store是否已经存在用户信息
  const { username } = useGetUserInfo()
  useEffect(() => {
    if (username) {
      // 如果有就不用加载了
      setWaitingUserData(false)
      return
    }

    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username])

  return { waitingUserData }
}

export default useLoadUserData
