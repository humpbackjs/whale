import React from 'react'
import { createStore } from 'nycticorax'
import Components from './components'
import Layout from './layout'

createStore({
  components: [{
    name: 'test-component',
    version: '0.1.0',
    silent: true,
    props: {
      switch: false,
      number: 5,
      text: '$090',
    },
  }]
})

export default function () {
  return (
    <>
      <Components />
      <Layout />
    </>
  )
}
