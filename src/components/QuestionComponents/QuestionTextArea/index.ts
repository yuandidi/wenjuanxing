import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionTextAreaDefaultProps } from './interface'

export * from './interface'

export default {
  title: '多行输入',
  type: 'questionTextArea',
  Component, //画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionTextAreaDefaultProps,
}
