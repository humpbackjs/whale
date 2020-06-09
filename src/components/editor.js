import React from 'react'
import { Modal, Input, Select } from 'antd'
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons'
import classes from './index.module.less'

const Label = ({ name, width }) => (
  <span style={{ width, display: 'inline-block' }}>{name}</span>
)

export default function ({ visible, onOk, onCancel }) {
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
      />
      <Input
        addonBefore={<Label width={54} name="Version" />}
        style={{ marginBottom: 10 }}
      />
      <div className={classes.props}>
        Props
        <PlusSquareOutlined />
      </div>
      <Input.Group compact>
        <Input
          placeholder="key"
          style={{ width: '37%' }}
        />
        <Select
          placeholder="type"
          style={{ width: '26%' }}
        >
          <Option value="boolean">Boolean</Option>
          <Option value="number">Number</Option>
          <Option value="string">String</Option>
        </Select>
        <Input
          placeholder="value"
          style={{ width: '37%' }}
        />
        {/* <Select
          placeholder="value"
          style={{ width: '30%' }}
        >
          <Option value="true">True</Option>
          <Option value="false">False</Option>
        </Select> */}
        <MinusSquareOutlined />
      </Input.Group>
    </Modal>
  )
}
