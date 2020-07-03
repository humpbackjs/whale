import React, { useState, useCallback } from 'react'
import { Table, Button, Badge, Popconfirm } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import JSONPretty from 'react-json-pretty'
import { useStore, dispatch } from 'nycticorax'
import 'react-json-pretty/themes/acai.css'
import Editor from './editor'
import classes from './index.module.less'

export default function () {
  const { components } = useStore('components')
  const [index, setIndex] = useState(-2)

  const onEdit = useCallback((v) => {
    if (index === -1) {
      components.push(v)
    } else {
      components[index] = v
    }
    dispatch({ components })
    setIndex(-2)
  }, [components, index])
  const onDelete = useCallback((i) => {
    components.splice(i, 1)
    dispatch({ components })
  }, [components])

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
      title: 'URL',
      dataIndex: 'url',
      width: 300,
      render(url, { version }) {
        return <div style={{ wordBreak: 'break-all' }}>{url.replace(/\${version}/g, version)}</div>
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
      render(props = {}) {
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
        dataSource={components}
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
        defaultData={components[index]}
        onCancel={() => setIndex(-2)}
        onOk={onEdit}
      />
    </>
  )
}
