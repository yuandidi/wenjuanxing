import { FC, useEffect, useState } from 'react'
import { Typography } from 'antd'
import { useRequest } from 'ahooks'
import { getComponentStatService } from '@/services/stat'
import { useParams } from 'react-router-dom'
import { getComponentConfByType } from '@/components/QuestionComponents'

const { Title } = Typography

type PropType = {
  selectedComponentId: string
  selectedComponentType: string
}

const ChartStat: FC<PropType> = (props: PropType) => {
  const { selectedComponentId, selectedComponentType } = props
  const { id = '' } = useParams()

  const [stat, setStat] = useState([])
  const { run } = useRequest(
    async (questionId, componentId) => await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat)
      },
    }
  )

  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId)
  }, [selectedComponentId])

  function genStatElem() {
    if (!selectedComponentId) return <div>未选中组件</div>

    const { StatComponent } = getComponentConfByType(selectedComponentType) || {}

    return StatComponent ? <StatComponent stat={stat} /> : <div>该组件无统计图表</div>
  }

  return (
    <>
      <Title level={3}>图标统计</Title>
      <div>{genStatElem()}</div>
    </>
  )
}
export default ChartStat
