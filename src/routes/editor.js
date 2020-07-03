import React, { useState, useCallback, useEffect } from 'react'
import { Modal, Select, message, Input } from 'antd'
import { useStore } from 'nycticorax'

const Label = ({ name, width }) => (
  <span style={{ width, display: 'inline-block' }}>{name}</span>
)

const initial = {
  name: undefined,
  path: undefined,
  components: [],
}

export default function ({ visible, onOk, onCancel, defaultData }) {
  const [args, setArgs] = useState(initial)

  const onConfirm = useCallback(() => {
    onOk()
  })

  const onChange = useCallback((key, value) => {
    setArgs({ ...args, [key]: value })
  }, [args])

  useEffect(() => {
    if (!defaultData) {
      setArgs(initial)
      return
    }
    setArgs(defaultData)
  }, [defaultData])

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
      <Input
        addonBefore={<Label width={54} name="Path" />}
        style={{ marginBottom: 10 }}
        value={args.path}
        onChange={(e) => onChange('path', e.target.value)}
      />
    </Modal>
  )
}
