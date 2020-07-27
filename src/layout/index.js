import React from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import { useStore } from 'nycticorax'
import classes from './index.module.less'
import './base.less'

const RGL = WidthProvider(GridLayout)

export default function () {
  const { components } = useStore('components')

  const layout = components.map(({ name }, i) => ({
    i: name,
    x: i * 4 % 12,
    y: Infinity,
    w: 4,
    h: 4,
  }))

  return (
    <RGL
      onLayoutChange={(layout) => {
        console.log(layout)
      }}
      layout={layout}
      cols={12}
      rowHeight={30}
      width={1200}
    >
      {
        layout.map(({ i }) => (
          <div key={i}>{i}</div>
        ))
      }
    </RGL>
  )
}
