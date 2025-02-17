import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionService } from '@/services/question'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  // const [loading, setLoading] = useState(true)
  // const [questionData, setQuestionData] = useState({})

  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await getQuestionService(id)
  //     setQuestionData(data)
  //     setLoading(false)
  //   }
  //   fetchData()
  // }, [])
  async function getQuestionData() {
    const data = await getQuestionService(id)
    return data
  }
  const { loading, data, error } = useRequest(getQuestionData)

  return { loading, data, error }
}

export default useLoadQuestionData
