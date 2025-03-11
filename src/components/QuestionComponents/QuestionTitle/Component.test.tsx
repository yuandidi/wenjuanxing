import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import '@testing-library/jest-dom'
import Component from './Component'

test('默认属性', () => {
  render(<Component />)
  const h = screen.getByText('一行标题')
  expect(h).toBeInTheDocument()
})

test('传入属性', () => {
  render(<Component text="hello" level={2} isCenter={true} />)

  const h = screen.getByText('hello')
  expect(h).toBeInTheDocument()

  expect(h.tagName.toLowerCase()).toBe('h2')

  const style = h.style
  expect(style.textAlign).toBe('center')
})
