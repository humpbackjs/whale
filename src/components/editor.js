import React, { useState, useCallback, useEffect } from 'react'
import { Modal, Input, Select, InputNumber, message, Switch } from 'antd'
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons'
import classes from './index.module.less'

const Label = ({ name, width }) => (
  <span style={{ width, display: 'inline-block' }}>{name}</span>
)

const initial = {
  name: undefined,
  version: undefined,
  url: undefined,
  silent: false,
  props: [],
}

export default function ({ visible, onOk, onCancel, defaultData }) {
  const [args, setArgs] = useState(initial)

  useEffect(() => {
    if (!defaultData) {
      setArgs(initial)
      return
    }
    setArgs({
      ...defaultData,
      props: Object.entries(defaultData.props || {}).map(([key, value]) => ({
        key,
        type: typeof value,
        value,
      }))
    })
  }, [defaultData])

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

  const props = {}

  args.props.forEach((item) => {
    if (item.key && typeof item.value === item.type) {
      props[item.key] = item.value
    }
  })

  const result = { ...args, props }

  const onConfirm = useCallback(() => {
    if (!result.name || !/^[a-z@\/][a-z0-9\/\-]*$/.test(result.name)) {
      message.error('name error')
      return
    }
    if (!/^\d.\d.\d$/.test(result.version)) {
      message.error('version error')
      return
    }
    if (!(result.url || '').includes('${version}')) {
      message.error('url error')
      return
    }
    for (let i = 0; i < args.props.length; i += 1) {
      if (!isNaN(args.props[i].key[0])) {
        message.error('props error')
        return
      }
    }
    onOk(result)
  }, [result])

  return (
    <Modal
      title="Edit Component"
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
        addonBefore={<Label width={54} name="Version" />}
        style={{ marginBottom: 10 }}
        value={args.version}
        onChange={(e) => onChange('version', e.target.value)}
      />
      <Input
        addonBefore={<Label width={54} name="URL" />}
        style={{ marginBottom: 10 }}
        value={args.url}
        placeholder="${version} for component version"
        onChange={(e) => onChange('url', e.target.value)}
      />
      <div className={classes.props}>
        Silent
        <Switch onChange={(v) => onChange('silent', v)} checked={args.silent} className={classes.switch} />
      </div>
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
          item.type === 'string' || !item.type ? <Input
            placeholder="value"
            style={{ width: '37%' }}
            value={item.value}
            onChange={(e) => onProps(i, 'value', e.target.value)}
          /> : null
        }
        {
          item.type === 'number' ? <InputNumber
            placeholder="value"
            style={{ width: '37%' }}
            value={item.value}
            onChange={(v) => onProps(i, 'value', v)}
          /> : null
        }
        {
          item.type === 'boolean' ? <Select
            placeholder="value"
            style={{ width: '37%' }}
            value={item.value}
            onChange={(v) => onProps(i, 'value', v)}
          >
            <Option value={true}>True</Option>
            <Option value={false}>False</Option>
          </Select> : null
        }
        <MinusSquareOutlined onClick={() => onRemove(i)} className={classes.remove} />
      </Input.Group>))
      }
    </Modal>
  )
}
