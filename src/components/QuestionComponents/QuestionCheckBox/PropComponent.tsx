import { FC } from 'react'
import { OptionType, QuestionCheckBoxPropsType } from './interface'
import { Form, Input, Checkbox, Button, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from '@reduxjs/toolkit'

const PropComponent: FC<QuestionCheckBoxPropsType> = (props: QuestionCheckBoxPropsType) => {
  const { title, isVertical, list = [], onChange, disabled } = props
  const [form] = Form.useForm()

  function handleValuesChange() {
    if (onChange) {
      const newValues = form.getFieldsValue() as QuestionCheckBoxPropsType

      const { list = [] } = newValues
      list.forEach(opt => {
        if (opt.value) return
        opt.value = nanoid(5)
      })
      onChange(newValues)
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, isVertical, list }}
      disabled={disabled}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有选项，可删除 */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key}>
                    {/*当前选项输入框*/}
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
                    {/*当前选项是否选中*/}
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator: (_, text) => {
                            const { list = [] } = form.getFieldsValue()

                            let num = 0
                            list?.forEach((opt: OptionType) => {
                              if (opt.text === text)
                                //记录text 相同的个数，预期只有自己一个
                                num++
                            })
                            if (num === 1) return Promise.resolve()
                            return Promise.reject('和其他选项重复了')
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入选项文字..." />
                    </Form.Item>
                    {/*当前选项删除按钮*/}
                    {index > 0 && (
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(name)
                        }}
                      />
                    )}
                  </Space>
                )
              })}
              <Form.Item>
                {/* 添加选项 */}
                <Button
                  type="link"
                  onClick={() => add({ text: '', value: '', checked: false })}
                  icon={<PlusOutlined />}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
