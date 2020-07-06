import React, { useState, useCallback } from 'react'
import { Table, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Editor from './editor'

export default function () {
  const [index, setIndex] = useState(-2)
  const [dependencies, setDependencies] = useState([])

  const onEdit = useCallback((v) => {
    if (index === -1) {
      dependencies.push(v)
    } else {
      dependencies[index] = v
    }
    setDependencies(dependencies.slice())
    setIndex(-2)
  }, [dependencies, index])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'URL',
      dataIndex: 'url',
    },
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={dependencies}
        pagination={false}
      />
      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        onClick={() => setIndex(-1)}
      />
      <Editor
        visible={index > -2}
        defaultData={dependencies[index]}
        onCancel={() => setIndex(-2)}
        onOk={onEdit}
      />
    </>
  )
}
