import Components from './pages/components'
import Config from './pages/config'
import Layout from './pages/layout'
import Pages from './pages/pages'

export default [
  {
    name: 'Config',
    icon: 'ControlTwoTone',
    path: '/config',
    component: Config,
  },
  {
    name: 'Components',
    icon: 'AppstoreTwoTone',
    path: '/components',
    component: Components,
  },
  {
    name: 'Pages',
    icon: 'CompassTwoTone',
    path: '/pages',
    component: Pages,
  },
  {
    name: 'Layout',
    icon: 'LayoutTwoTone',
    path: '/layout',
    component: Layout,
  },
]
