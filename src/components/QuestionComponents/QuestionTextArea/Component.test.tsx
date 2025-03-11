import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import '@testing-library/jest-dom'
import Component from './Component'

test('默认属性', () => {
  render(<Component />)
  const p = screen.getByText('输入框标题')
  expect(p).toBeInTheDocument() // 断言
  const input = screen.getByPlaceholderText('请输入...')
  expect(input).toBeInTheDocument() // 断言
})

test('传入属性', () => {
  render(<Component title="hello" placeholder="world" />)
  const p = screen.getByText('hello')
  expect(p).toBeInTheDocument() // 断言
  const input = screen.getByPlaceholderText('world')
  expect(input).toBeInTheDocument() // 断言
})
