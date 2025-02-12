import { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Empty } from 'antd'
import QuestionCard from '@/components/QuestionCard'
import styles from './common.module.scss'

const { Title } = Typography

const rawQuestionList = [
  {
    _id: 1,
    title: 'title1',
    isPublished: true,
    isStarred: true,
    answerCount: 5,
    createdAt: '3月10日',
  },
  {
    _id: 2,
    title: 'title2',
    isPublished: true,
    isStarred: true,
    answerCount: 5,
    createdAt: '3月11日',
  },
  {
    _id: 3,
    title: 'title3',
    isPublished: true,
    isStarred: true,
    answerCount: 5,
    createdAt: '3月12日',
  },
]

const Star: FC = () => {
  useTitle('小迪问卷-星标问卷')
  const [questionList] = useState(rawQuestionList)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map(q => {
            const { _id } = q

            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Star
