import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { createStore } from 'nycticorax'
import STORE from './store'
import Nav from './components/nav'
import Container from './components/container'

createStore(STORE)

export default function () {
  return (
    <Router>
      <Nav />
      <Container />
    </Router>
  )
}
