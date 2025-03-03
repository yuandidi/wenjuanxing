import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionCheckBoxDefaultProps } from './interface'

export * from './interface'

export default {
  title: '多选',
  type: 'questionCheckBox',
  Component,
  PropComponent,
  defaultProps: QuestionCheckBoxDefaultProps,
}
