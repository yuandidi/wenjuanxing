import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from '@/store/componentsReducer'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'

/**
 *判断 activeElement 是否合法
 *
 * @return {*}
 */
function isActiveElementValid() {
  const activeElem = document.activeElement

  if (activeElem === document.body) return true // 光标没有 focus 到Input上
  if (activeElem?.matches('div[role]')) return true

  return false
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch()

  //删除组件
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })

  //复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })

  //粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })

  // 选中上一个
  useKeyPress('uparrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })

  // 选中下一个
  useKeyPress('downarrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })

  //撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      dispatch(UndoActionCreators.undo())
    },
    {
      exactMatch: true,
    }
  )

  //重做
  useKeyPress(
    ['ctrl.shift.z', 'meta.shift.z'],
    () => {
      dispatch(UndoActionCreators.redo())
    },
    {
      exactMatch: true,
    }
  )
}

export default useBindCanvasKeyPress
