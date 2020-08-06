import React, { useState, useCallback, useEffect } from 'react'
import { Modal, Select, message, Input } from 'antd'

const Label = ({ name, width }) => (
  <span style={{ width, display: 'inline-block' }}>{name}</span>
)

const initial = {
  name: undefined,
  url: undefined,
}

export default function ({ visible, onOk, onCancel, defaultData }) {
  const [args, setArgs] = useState(initial)

  const onConfirm = useCallback(() => {
    if (!args.name) {
      message.error('name error')
      return
    }
    if (!args.url) {
      message.error('url error')
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
      title="Edit Dependencies"
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
       <Input
        addonBefore={<Label width={54} name="URL" />}
        value={args.url}
        onChange={(e) => onChange('url', e.target.value)}
      />
    </Modal>
  )
}
