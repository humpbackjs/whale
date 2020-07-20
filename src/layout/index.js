import React, { useState, useCallback } from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import { useStore } from 'nycticorax'
import classes from './index.module.less'
import './base.less'

const RGL = WidthProvider(GridLayout)

export default function () {
  const { components } = useStore('components')
  const [selects, setSelects] = useState([])

  const layout = selects.map((name, i) => ({
    i: name,
    x: i * 2,
    y: 0,
    w: 2,
    h: 2,
  }))

  const onSelect = useCallback((name) => {
    if (!selects.includes(name)) {
      selects.push(name)
      setSelects(selects.slice())
    }
  }, [selects])

  const onDelete = useCallback((name) => {
    const current = selects.filter((item) => item !== name)
    setSelects(current)
  }, [selects])

  return (
    <>
      <div className={classes.box}>
        {
          components.map(({ name }) => (
            <div key={name} onClick={() => onSelect(name)}>{name}</div>
          ))
        }
      </div>
      <RGL layout={layout} cols={12} rowHeight={30} width={1200}>
        {
          selects.map((name) => (
            <div key={name}>
              <div onClick={() => onDelete(name)}>x</div>
              {name}
            </div>
          ))
        }
      </RGL>
    </>
  )
}
