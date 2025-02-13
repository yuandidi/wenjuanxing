import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Input } from 'antd'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '@/constant'

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  const [value, setValue] = useState('')
  const [searchParams] = useSearchParams()
  useEffect(() => {
    setValue(searchParams.get(LIST_SEARCH_PARAM_KEY) || '')
  }, [searchParams])
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }
  function handleSearch(value: string) {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }
  return (
    <Search
      placeholder="输入关键字"
      allowClear
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ width: '200px' }}
    />
  )
}

export default ListSearch
