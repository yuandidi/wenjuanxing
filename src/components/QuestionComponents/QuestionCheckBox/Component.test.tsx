import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import '@testing-library/jest-dom'
import Component from './Component'

test('默认属性', () => {
  render(<Component />)
  const p = screen.getByText('多选标题')
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
    { value: 'v1', text: 't1', checked: false },
    { value: 'v2', text: 't2', checked: true },
    { value: 'v3', text: 't3', checked: true },
  ]

  render(<Component title="hello" list={options} />)
  const p = screen.getByText('hello')
  expect(p).toBeInTheDocument() // 断言

  for (let i = 1; i <= 3; i++) {
    const curVal = `v${i}`
    const checkbox = screen.getByDisplayValue(curVal)
    expect(checkbox).toBeInTheDocument() // 断言
    const label = screen.getByText(`t${i}`)
    expect(label).toBeInTheDocument() // 断言
    if (i === 1) {
      expect(checkbox).not.toBeChecked() // 断言
    } else {
      expect(checkbox).toBeChecked() // 断言
    }
  }
})
