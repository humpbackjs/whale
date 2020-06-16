import React, { useState, useCallback } from 'react'
import { Table, Space, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Editor from './editor'

export default function () {
  const [data, setData] = useState([])
  const [visible, setVisible] = useState(false)
  const onEdit = useCallback((v) => {
    data.push(v)
    setData(data.slice(0))
    setVisible(false)
  }, [data])
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
            <a>Delete</a>
          </Space>
        )
      },
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        onClick={() => setVisible(true)}
      />
      <Editor
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={onEdit}
      />
    </>
  )
}
