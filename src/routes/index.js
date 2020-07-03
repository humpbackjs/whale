import React, { useState, useCallback } from 'react'
import { Table, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Editor from './editor'

export default function () {
  const [index, setIndex] = useState(-2)
  const [pages, setPages] = useState([])

  const onEdit = useCallback((v) => {
    if (index === -1) {
      pages.push(v)
    } else {
      pages[index] = v
    }
    setPages(pages)
    setIndex(-2)
  }, [pages, index])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Path',
      dataIndex: 'path',
    },
    {
      title: 'Components',
      dataIndex: 'components',
    },
    {
      title: 'Layout',
      dataIndex: 'name',
    }
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={[]}
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
        defaultData={pages[index]}
        onCancel={() => setIndex(-2)}
        onOk={onEdit}
      />
    </>
  )
}
