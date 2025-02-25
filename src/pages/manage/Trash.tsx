import { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import ListSearch from '@/components/ListSearch'
import { Typography, Empty, Table, Tag, Button, Space, Modal, Spin } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'
import styles from './common.module.scss'
import ListPage from '@/components/ListPage'

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  useTitle('小迪问卷-回收站')
  const { data = {}, loading } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  function del() {
    confirm({
      title: '确认彻底删除该问卷?',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      onOk: () => alert(`删除 `),
    })
  }
  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]
  const TableElement = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rowKey={(q: any) => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      />
    </>
  )
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 && TableElement}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Trash
