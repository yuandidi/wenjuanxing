import { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import { Typography } from 'antd'
import ListSearch from '@/components/ListSearch'
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
    isPublished: false,
    isStarred: false,
    answerCount: 5,
    createdAt: '3月11日',
  },
  {
    _id: 3,
    title: 'title3',
    isPublished: false,
    isStarred: false,
    answerCount: 5,
    createdAt: '3月12日',
  },
]
const List: FC = () => {
  useTitle('小迪问卷-我的问卷')
  const [questionList] = useState(rawQuestionList)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length > 0 &&
          questionList.map(q => {
            const { _id } = q

            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>loadMore 上划加载更多...</div>
    </>
  )
}

export default List
