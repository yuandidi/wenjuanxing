import Component from './Component'
import PropComponent from './PropComponent'
import StatComponent from './StatComponent'
import { QuestionCheckBoxDefaultProps } from './interface'

export * from './interface'

export default {
  title: '多选',
  type: 'questionCheckBox',
  Component,
  PropComponent,
  StatComponent,
  defaultProps: QuestionCheckBoxDefaultProps,
}
