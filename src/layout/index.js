import React from 'react'
import GridLayout, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'

const RGL = WidthProvider(GridLayout)

export default function () {
  const layout = [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 1, y: 0, w: 3, h: 2 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
  ];
  return (
    <RGL className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
      <div key="a">a</div>
      <div key="b">b</div>
      <div key="c">c</div>
    </RGL>
  )
}
