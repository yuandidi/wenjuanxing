import { ChangeEvent, FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Input, message, Space, Typography } from 'antd'
import styles from './EditHeader.module.scss'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import EditToolBar from './EditToolBar'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '@/store/pageInfoReducer'
import useGetComponentInfo from '@/hooks/useGetComponentsInfo'
import { updateQuestionService } from '@/services/question'
import { useKeyPress, useRequest, useDebounceEffect } from 'ahooks'

const { Title } = Typography

//显示和修改标题
const TitleElem: FC = () => {
  const { title } = useGetPageInfo()
  const dispatch = useDispatch()

  const [editState, setEditState] = useState(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    dispatch(changePageTitle(newTitle))
  }

  if (editState) {
    return (
      <Input
        value={title}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
        onChange={handleChange}
      />
    )
  }

  return (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined />} type="text" onClick={() => setEditState(true)} />
    </Space>
  )
}

//保存按钮
const SaveButton: FC = () => {
  // pageInfo componentList
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { id = '' } = useParams()

  const { loading, run: save } = useRequest(
    async () => {
      await updateQuestionService(id, { ...pageInfo, componentList })
    },
    { manual: true }
  )

  //快捷键
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) save()
  })

  //自动保存
  useDebounceEffect(
    () => {
      save()
    },
    [componentList, pageInfo],
    { wait: 1000 }
  )

  return (
    <Button disabled={loading} onClick={save} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  )
}

//发布按钮
const PublishButton: FC = () => {
  const nav = useNavigate()
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { id = '' } = useParams()

  const { loading, run: pub } = useRequest(
    async () => {
      await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        nav('/question/stat/' + id)
      },
    }
  )

  return (
    <Button type="primary" onClick={pub} disabled={loading}>
      发布
    </Button>
  )
}

//编辑器头部
const EditHeader: FC = () => {
  const nav = useNavigate()

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolBar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
