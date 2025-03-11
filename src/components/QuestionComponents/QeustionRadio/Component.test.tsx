import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import '@testing-library/jest-dom'
import Component from './Component'

test('默认属性', () => {
  render(<Component />)
  const p = screen.getByText('单选标题')
  expect(p).toBeInTheDocument() // 断言

  for (let i = 1; i <= 3; i++) {
    const radio = screen.getByDisplayValue(`item${i}`)
    expect(radio).toBeInTheDocument() // 断言

    const label = screen.getByText(`选项${i}`)
    expect(label).toBeInTheDocument() // 断言
  }
})

test('传入属性', () => {
  const options = [
    { value: 'v1', text: 't1' },
    { value: 'v2', text: 't2' },
    { value: 'v3', text: 't3' },
  ]

  const value = 'v1'
  render(<Component title="hello" options={options} value={value} />)
  const p = screen.getByText('hello')
  expect(p).toBeInTheDocument() // 断言

  for (let i = 1; i <= 3; i++) {
    const curVal = `v${i}`
    const radio = screen.getByDisplayValue(curVal)
    expect(radio).toBeInTheDocument() // 断言

    const label = screen.getByText(`t${i}`)
    expect(label).toBeInTheDocument() // 断言

    if (curVal === value) {
      expect(radio).toBeChecked() // 断言
    }
  }
})
