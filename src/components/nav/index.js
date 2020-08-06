import React from 'react'
import { Link } from 'react-router-dom'
import * as icons from '@ant-design/icons'
import routes from '../../routes'
import classes from './index.module.less'

export default function () {
  return (
    <div className={classes.nav}>
      {
        routes.map(({ name, icon, path }) => {
          const Icon = icons[icon]
          return (
            <Link key={path} to={path}>
              <Icon style={{ fontSize: 40 }} />
              <div>{name}</div>
            </Link>
          )
        })
      }
    </div>
  )
}
