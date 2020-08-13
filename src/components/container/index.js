import React, { useState, useRef, useEffect } from 'react'
import { Route, useLocation, useHistory } from 'react-router-dom'
import { Modal } from 'antd'
import { ArrowsAltOutlined, CloseCircleOutlined, ShrinkOutlined } from '@ant-design/icons'
import routes from '../../routes'
import classes from './index.module.less'

export default function () {
  const { pathname } = useLocation()
  const history = useHistory()
  const { name } = routes.find((item) => item.path === pathname) || {}
  const [fr, setFr] = useState(false)
  const frEe = useRef(null)

  useEffect(() => {
    if (!frEe.current) {
      console.log('666')
      return
    }

    console.log('?')

    frEe.current.addEventListener('fullscreenchange', (e) => {
      console.log(e)
    })

    // eslint-disable-next-line consistent-return
    return () => frEe.current.removeEventListener('fullscreenchange')
  }, [frEe.current])

  return (
    <Modal
      title={name}
      maskClosable={false}
      visible={!!name}
      footer={null}
      centered
      width="78%"
      style={{
        height: fr ? '100%' : 'auto',
        paddingBottom: fr ? 0 : 24,
      }}
      closeIcon={(
        <>
          {
            fr ? (
              <ShrinkOutlined
                onClick={(e) => {
                  e.stopPropagation()
                  document.exitFullscreen()
                  setFr(false)
                }}
              />
            ) : (
              <ArrowsAltOutlined
                onClick={(e) => {
                  e.stopPropagation()
                  if (!frEe.current) {
                    frEe.current = document.querySelector('.ant-modal')
                  }
                  frEe.current.requestFullscreen()
                  setFr(true)
                }}
              />
            )
          }
          {
            fr ? null : <CloseCircleOutlined />
          }
        </>
      )}
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
