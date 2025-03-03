import { ComponentInfoType, ComponentsStateType } from '.'

export function getNextSelectedId(fe_id: string, componentList: Array<ComponentInfoType>) {
  const visibleComponentList = componentList.filter(c => !c.isHidden)
  const index = visibleComponentList.findIndex(c => c.fe_id === fe_id)
  if (index < 0) return ''

  // 重新计算 slectedId
  let newSelectedId = ''
  const length = visibleComponentList.length
  if (length <= 1) {
    newSelectedId = ''
  } else {
    // 组件长度
    if (index + 1 === length) {
      newSelectedId = visibleComponentList[index - 1].fe_id
    } else {
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
  }

  return newSelectedId
}

/**
 *
 * @export 插入新组件
 * @param {ComponentsStateType} draft
 * @param {ComponentInfoType} newComponent 新组件
 */
export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = draft
  const index = componentList.findIndex(c => c.fe_id === selectedId)

  if (index < 0) {
    //未选中任何组件直接把新增组件
    draft.componentList.push(newComponent)
  } else {
    // 选中了组件，插入到index后面
    draft.componentList.splice(index + 1, 0, newComponent)
  }

  draft.selectedId = newComponent.fe_id
}
