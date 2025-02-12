import { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import QuestionCard from '@/components/QuestionCard'
import styles from './List.module.scss'
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
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.map(q => {
          const { _id } = q

          return <QuestionCard key={_id} {...q} />
        })}
      </div>
      <div className={styles.footer}></div>
    </>
  )
}

export default List
