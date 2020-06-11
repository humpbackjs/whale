import React, { useState, useCallback } from 'react'
import { Modal, Input, Select } from 'antd'
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons'
import classes from './index.module.less'

const Label = ({ name, width }) => (
  <span style={{ width, display: 'inline-block' }}>{name}</span>
)

export default function ({ visible, onOk, onCancel }) {
  const [args, setArgs] = useState({
    name: undefined,
    version: undefined,
    props: [],
  })
  const onChange = useCallback((key, value) => {
    setArgs({ ...args, [key]: value })
  }, [args])
  const onAdd = useCallback(() => {
    const { props } = args
    props.push({})
    setArgs({ ...args, props })
  }, [args])
  const onRemove = useCallback((index) => {
    const { props } = args
    props.splice(index, 1)
    setArgs({ ...args, props })
  }, [args])
  const onProps = useCallback((index, type, value) => {
    const { props } = args
    props[index][type] = value

    if (type === 'type') {
      props[index].value = undefined
    }

    setArgs({ ...args, props })
  }, [args])

  return (
    <Modal
      title="Edit Component"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Input
        addonBefore={<Label width={54} name="Name" />}
        style={{ marginBottom: 10 }}
        value={args.name}
        onChange={(e) => onChange('name', e.target.value)}
      />
      <Input
        addonBefore={<Label width={54} name="Version" />}
        style={{ marginBottom: 10 }}
        value={args.version}
        onChange={(e) => onChange('version', e.target.value)}
      />
      <div className={classes.props}>
        Props
        <PlusSquareOutlined onClick={onAdd} className={classes.add} />
      </div>
      {
       args.props.map((item, i) => (
       <Input.Group key={i} className={classes.group} compact>
        <Input
          placeholder="key"
          style={{ width: '37%' }}
          value={item.key}
          onChange={(e) => onProps(i, 'key', e.target.value)}
        />
        <Select
          placeholder="type"
          style={{ width: '22%' }}
          value={item.type}
          onChange={(v) => onProps(i, 'type', v)}
        >
          <Option value="boolean">Boolean</Option>
          <Option value="number">Number</Option>
          <Option value="string">String</Option>
        </Select>
        {
          item.type !== 'boolean' ? <Input
            placeholder="value"
            style={{ width: '37%' }}
            value={item.value}
            onChange={(e) => onProps(i, 'value', e.target.value)}
          /> : <Select
          placeholder="value"
          style={{ width: '37%' }}
          value={item.value}
          onChange={(v) => onProps(i, 'value', v)}
        >
          <Option value={true}>True</Option>
          <Option value={false}>False</Option>
        </Select>
        }
        <MinusSquareOutlined onClick={() => onRemove(i)} className={classes.remove} />
      </Input.Group>))
      }
    </Modal>
  )
}
