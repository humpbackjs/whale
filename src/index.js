import React from 'react'
import { createStore } from 'nycticorax'
import Components from './components'
import Routes from './routes'
import Dependencies from './dependencies'
import Layout from './layout'
import defaultComponents from './default-components'

createStore({ components: defaultComponents })

export default function () {
  return (
    <>
      <Layout />
      <Components />
      <Routes />
      <Dependencies />
    </>
  )
}
