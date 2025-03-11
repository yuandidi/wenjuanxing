import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'

import '@testing-library/jest-dom'

import Component from './Component'

test('默认属性', () => {
  render(<Component />)
  const h = screen.getByText('一行段落')
  expect(h).toBeInTheDocument() // 断言
})

test('传入属性', () => {
  render(<Component text="hello" isCenter={true} />)
  const span = screen.getByText('hello')
  expect(span).toBeInTheDocument() // 断言

  const p = span.parentElement
  expect(p).not.toBeNull()

  const style = p?.style
  expect(style?.textAlign).toBe('center')
})

test('多行文字', () => {
  render(<Component text={'a\nb\nc'} />)

  const span = screen.getByText('a')
  expect(span).toBeInTheDocument() // 断言

  expect(span).toHaveTextContent('a') // 断言
  expect(span).not.toHaveTextContent('b') // 断言
})
