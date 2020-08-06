import React, { useState, useCallback, useEffect } from 'react'
import { Modal, Select, message, Input } from 'antd'
import { useStore } from 'nycticorax'

const Label = ({ name, width }) => (
  <span style={{ width, display: 'inline-block' }}>{name}</span>
)

const initial = {
  name: undefined,
  path: [],
  components: [],
}

export default function ({ visible, onOk, onCancel, defaultData }) {
  const { components } = useStore('components')
  const [args, setArgs] = useState(initial)

  const onConfirm = useCallback(() => {
    if (!args.name) {
      message.error('name error')
      return
    }
    if (!args.path.length || args.path.some((item) => item[0] !== '/')) {
      message.error('path error')
      return
    }
    if (!args.components.length) {
      message.error('components error')
      return
    }
    onOk(args)
  }, [args])

  const onChange = useCallback((key, value) => {
    setArgs({ ...args, [key]: value })
  }, [args])

  useEffect(() => {
    if (!visible) {
      return
    }
    if (!defaultData) {
      setArgs(initial)
      return
    }
    setArgs(defaultData)
  }, [defaultData, visible])

  return (
    <Modal
      title="Edit Page"
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
    >
       <Input
        addonBefore={<Label width={54} name="Name" />}
        style={{ marginBottom: 10 }}
        value={args.name}
        onChange={(e) => onChange('name', e.target.value)}
      />
      <Select
        mode="tags"
        style={{ width: '100%', marginBottom: 10 }}
        placeholder="Input path"
        value={args.path}
        onChange={(v) => onChange('path', v)}
      />
      <Select
        placeholder="Select components"
        mode="multiple"
        style={{ width: '100%' }}
        value={args.components}
        onChange={(v) => onChange('components', v)}
      >
        {
          components.map(({ name }) => (
            <Select.Option value={name} key={name}>
              {name}
            </Select.Option>
          ))
        }
      </Select>
    </Modal>
  )
}
