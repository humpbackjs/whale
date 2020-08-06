import React from 'react'
import { Route } from 'react-router-dom'
import routes from '../../routes'

export default function () {
  return (
    <div>
      {
        routes
          .map(({ path, component }) => (
            <Route key={path} exact path={path} component={component} />
          ))
      }
    </div>
  )
}
