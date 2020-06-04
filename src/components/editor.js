import React from 'react'
import { Modal, Input, Select } from 'antd'

export default function ({ visible, onOk, onCancel }) {
  return (
    <Modal
      title="Edit Component"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <div>
        <div>Name:</div>
        <Input placeholder="Component Name" />
      </div>
      <div>
        <div>Version:</div>
        <Input placeholder="Component Version" />
      </div>
      <div>
        <div>Props</div>
        <div>
          <div>
            <Input.Group compact>
              <Input addonBefore="Key" style={{ width: '30%' }} />
              <Select placeholder="type">
                <Option value="boolean">Boolean</Option>
                <Option value="number">Number</Option>
                <Option value="string">String</Option>
              </Select>
              <Input addonBefore="Value" style={{ width: '30%' }} />
            </Input.Group>
          </div>
        </div>
      </div>
    </Modal>
  )
}
