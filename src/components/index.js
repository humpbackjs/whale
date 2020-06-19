import React, { useState, useCallback } from 'react'
import { Table, Button, Badge, Popconfirm } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import JSONPretty from 'react-json-pretty'
import 'react-json-pretty/themes/acai.css'
import Editor from './editor'
import classes from './index.module.less'

export default function () {
  const [data, setData] = useState([{
    name: 'test-component',
    version: '0.1.0',
    silent: true,
    props: {
      switch: false,
      number: 5,
      text: '$090',
    },
  }])
  const [index, setIndex] = useState(-2)

  const onEdit = useCallback((v) => {
    if (index === -1) {
      data.push(v)
    } else {
      data[index] = v
    }

    setData(data.slice(0))
    setIndex(-2)
  }, [data, index])
  const onDelete = useCallback((i) => {
    data.splice(i, 1)
    setData(data.slice(0))
  }, [data])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Version',
      dataIndex: 'version',
      render(version) {
        return <Badge count={version} />
      }
    },
    {
      title: 'Silent',
      dataIndex: 'silent',
      render(silent) {
        return silent ? <Badge status="processing" text="Silent" /> : null
      }
    },
    {
      title: 'Props',
      dataIndex: 'props',
      render(props) {
        return Object.keys(props).length ? <JSONPretty className={classes.code} data={props} /> : null
      }
    },
    {
      title: '•••',
      dataIndex: 'name',
      render(name, record, i) {
        return (
          <>
            <Button onClick={() => setIndex(i)} type="link">Edit</Button>
            <Popconfirm
              title="Delete this component?"
              onConfirm={onDelete}
            >
              <Button danger type="link">Delete</Button>
            </Popconfirm>
          </>
        )
      },
    },
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
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
        defaultData={data[index]}
        onCancel={() => setIndex(-2)}
        onOk={onEdit}
      />
    </>
  )
}
