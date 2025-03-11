import { FC, useCallback } from 'react'
import { Typography } from 'antd'
import { componentConfGroup, ComponentConfType } from '@/components/QuestionComponents'
import styles from './Component.lib.module.scss'
import { addComponent } from '@/store/componentsReducer'
import { useDispatch } from 'react-redux'
import { Dispatch, nanoid, UnknownAction } from '@reduxjs/toolkit'

const { Title } = Typography

function genComponent(c: ComponentConfType, dispatch: Dispatch<UnknownAction>) {
  const { title, type, Component, defaultProps } = c

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleCallback = useCallback(() => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    )
  }, [])

  //function handleClick() {}

  return (
    <div className={styles.wrapper} onClick={handleCallback}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const Lib: FC = () => {
  const dispatch = useDispatch()
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group
        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            <div>{components.map(c => genComponent(c, dispatch))}</div>
          </div>
        )
      })}
    </>
  )
}

export default Lib
