import React from 'react'
import { Route, useLocation, useHistory } from 'react-router-dom'
import { Modal } from 'antd'
import routes from '../../routes'

export default function () {
  const { pathname } = useLocation()
  const history = useHistory()
  const { name } = routes.find((item) => item.path === pathname) || {}

  return (
    <Modal
      title={name}
      visible={!!name}
      footer={null}
      centered
      width="78%"
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
