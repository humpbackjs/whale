import React, { useState, useRef, useEffect } from 'react'
import { Route, useLocation, useHistory } from 'react-router-dom'
import { Modal, Button } from 'antd'
import { dispatch, useStore } from 'nycticorax'
import {
  ArrowsAltOutlined, ShrinkOutlined, CloseCircleOutlined, PlusOutlined,
} from '@ant-design/icons'
import routes from '../../routes'
import classes from './index.module.less'

export default function () {
  const { pathname } = useLocation()
  const history = useHistory()
  const addType = useStore()
  const { name } = routes.find((item) => item.path === pathname) || {}
  const [fr, setFr] = useState(false)
  const frEe = useRef(null)

  console.log(addType)

  useEffect(() => {
    if (!frEe.current) {
      return
    }

    const listener = () => setFr(!!document.fullscreenElement)
    frEe.current.addEventListener('fullscreenchange', listener)
    // eslint-disable-next-line consistent-return
    return () => frEe.current.removeEventListener('fullscreenchange', listener)
  }, [frEe.current])

  return (
    <Modal
      title={(
        <div className={classes.header}>
          <div>
            {name}
            <Button
              size="small"
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={() => dispatch({ addType: 'config' })}
            />
          </div>
          <div className={classes.icon} style={{ marginRight: fr ? 0 : 24 }}>
            {
              fr ? (
                <ShrinkOutlined onClick={() => document.exitFullscreen()} />
              ) : (
                <ArrowsAltOutlined
                  onClick={() => {
                    if (!frEe.current) {
                      frEe.current = document.querySelector('.ant-modal')
                      setFr(true)
                    }
                    frEe.current.requestFullscreen()
                  }}
                />
              )
            }
          </div>
        </div>
      )}
      maskClosable={false}
      visible={!!name}
      footer={null}
      centered
      width="78%"
      style={{
        height: fr ? '100%' : 'auto',
        paddingBottom: fr ? 0 : 24,
      }}
      closable={!fr}
      closeIcon={<CloseCircleOutlined />}
      onCancel={history.goBack}
    >
      {
        routes
          .map(({ path, component }) => (
            <Route key={path} exact path={path} component={component} />
          ))
      }
    </Modal>
  )
}
