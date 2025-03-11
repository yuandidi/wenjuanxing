import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Component from './Component'

test('默认属性', () => {
  render(<Component />)
  const h = screen.getByText('问卷标题')
  expect(h).toBeInTheDocument() // 断言
})

test('传入属性', () => {
  render(<Component title="测试标题" desc="world" />)

  const h = screen.getByText('测试标题')
  expect(h).toBeInTheDocument() // 断言

  const p = screen.getByText('world')
  expect(p).toBeInTheDocument() // 断言
})

test('多行文字', () => {
  render(<Component desc={'a\nb\nc'} />)

  const span = screen.getByText('a')
  expect(span).toBeInTheDocument() // 断言

  expect(span).toHaveTextContent('a') // 断言
  expect(span).not.toHaveTextContent('b') // 断言
})
