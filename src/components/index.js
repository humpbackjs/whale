import React, { useState } from 'react'
import { Table, Space, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Editor from './editor'

export default function () {
  const [data, setData] = useState([])
  const [visible, setVisible] = useState(false)
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Version',
      dataIndex: 'version',
    },
    {
      title: 'Props',
      dataIndex: 'props',
    },
    {
      title: '•••',
      dataIndex: 'name',
      render() {
        return (
          <Space size="middle">
            <a>Invite {record.name}</a>
            <a>Delete</a>
          </Space>
        )
      },
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={data} />
      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        onClick={() => setVisible(true)}
      />
      <Editor visible={visible} />
    </>
  )
}
